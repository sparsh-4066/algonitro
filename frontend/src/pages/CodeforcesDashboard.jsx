import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { FaSpinner } from "react-icons/fa";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell
} from "recharts";

import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";

function CodeforcesDashboard() {

  const [username, setUsername] = useState("");
  const [data, setData] = useState(null);
  const [ratingHistory, setRatingHistory] = useState([]);
  const [heatmapData, setHeatmapData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchStats = async () => {

    setLoading(true);

    try {

      const res = await axios.get(
        `http://localhost:5000/api/codeforces/${username}`
      );

      const stats = res.data;

      setData(stats);

      const history = stats.ratingHistory.map((c) => ({
        contest: c.contestName,
        rating: c.newRating
      }));

      setRatingHistory(history);

      const heatmap = Object.keys(stats.heatmap).map((date) => ({
        date,
        count: stats.heatmap[date]
      }));

      setHeatmapData(heatmap);

    } catch {

      alert("Failed to fetch Codeforces stats");

    } finally {

      setLoading(false);

    }

  };

  const pieData = data
    ? [
        { name: "Div 1", value: data.divisionStats.div1 },
        { name: "Div 2", value: data.divisionStats.div2 },
        { name: "Div 3", value: data.divisionStats.div3 },
        { name: "Div 4", value: data.divisionStats.div4 }
      ]
    : [];

  const COLORS = ["#ff6384", "#36a2eb", "#ffce56", "#4bc0c0"];

  return (

    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#0b0b0b,#141414)",
        color: "white",
        position: "relative",
        overflow: "hidden"
      }}
    >

      {/* BACKGROUND GLOW */}

      <motion.div
        animate={{ x:[0,250,0], y:[0,200,0] }}
        transition={{ duration:12, repeat:Infinity }}
        style={{
          position:"absolute",
          width:"900px",
          height:"900px",
          background:"#1F8ACB22",
          filter:"blur(200px)",
          top:"-200px",
          left:"-300px"
        }}
      />

      <motion.div
        animate={{ x:[0,-250,0], y:[0,150,0] }}
        transition={{ duration:14, repeat:Infinity }}
        style={{
          position:"absolute",
          width:"800px",
          height:"800px",
          background:"#36a2eb22",
          filter:"blur(200px)",
          bottom:"-200px",
          right:"-200px"
        }}
      />

      <Navbar />

      <div style={{ padding:"60px 80px", position:"relative", zIndex:2 }}>

        {/* HEADER */}

        <div style={{ textAlign:"center", marginBottom:"60px" }}>

          <h1 style={{ fontSize:"52px", fontWeight:"bold" }}>
            Codeforces Analytics
          </h1>

          <p style={{ color:"#aaa", marginTop:"10px" }}>
            Analyze Codeforces performance with rating insights
          </p>

        </div>


        {/* SEARCH */}

        <div
          style={{
            display:"flex",
            justifyContent:"center",
            marginBottom:"70px"
          }}
        >

          <div>

            <input
              placeholder="Enter Codeforces Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                padding:"12px",
                width:"260px",
                marginRight:"10px",
                borderRadius:"6px",
                border:"none"
              }}
            />

            <button
              onClick={fetchStats}
              disabled={loading}
              style={{
                padding:"12px 22px",
                background:"#1F8ACB",
                border:"none",
                borderRadius:"6px",
                fontWeight:"bold",
                cursor:"pointer"
              }}
            >

              {loading ? (
                <FaSpinner style={{ animation:"spin 1s linear infinite" }} />
              ) : (
                "Fetch Stats"
              )}

            </button>

          </div>

        </div>


        {data && (

          <div>

            <h2 style={{ fontSize:"36px", textAlign:"center", marginBottom:"40px" }}>
              {data.username}
            </h2>


            {/* STAT CARDS */}

            <div
              style={{
                display:"grid",
                gridTemplateColumns:"repeat(4,1fr)",
                gap:"25px",
                marginBottom:"20px"
              }}
            >

              <StatCard title="Rating" value={data.rating}/>
              <StatCard title="Max Rating" value={data.maxRating}/>
              <StatCard title="Rank" value={data.rank}/>
              <StatCard title="Max Rank" value={data.maxRank}/>

            </div>

            <div
              style={{
                display:"grid",
                gridTemplateColumns:"repeat(3,1fr)",
                gap:"25px",
                marginBottom:"60px"
              }}
            >

              <StatCard title="Solved Problems" value={data.totalSolved}/>
              <StatCard title="Contribution" value={data.contribution}/>
              <StatCard title="Friends" value={data.friendOfCount}/>

            </div>


            {/* RATING HISTORY */}

            <div style={{ marginTop:"40px" }}>

              <h3>Rating History</h3>

              <ResponsiveContainer width="100%" height={300}>

                <LineChart data={ratingHistory}>

                  <CartesianGrid strokeDasharray="3 3"/>

                  <XAxis
                    dataKey="contest"
                    tick={{ fill:"#ccc", fontSize:11 }}
                    angle={-30}
                    textAnchor="end"
                    height={60}
                  />

                  <YAxis tick={{ fill:"#ccc" }}/>

                  <Tooltip/>

                  <Line
                    type="monotone"
                    dataKey="rating"
                    stroke="#1F8ACB"
                    strokeWidth={2}
                  />

                </LineChart>

              </ResponsiveContainer>

            </div>


            {/* DIVISION PIE CHART */}

            <div style={{ marginTop:"60px" }}>

              <h3>Problems Solved by Division</h3>

              <ResponsiveContainer width="100%" height={300}>

                <PieChart>

                  <Pie data={pieData} dataKey="value" outerRadius={120}>

                    {pieData.map((entry,index)=>(
                      <Cell key={index} fill={COLORS[index]}/>
                    ))}

                  </Pie>

                  <Tooltip/>

                </PieChart>

              </ResponsiveContainer>

            </div>


            {/* HEATMAP */}

            <div style={{ marginTop:"60px" }}>

              <h3>Submission Heatmap</h3>

              <CalendarHeatmap
                startDate={
                  new Date(
                    new Date().setFullYear(
                      new Date().getFullYear()-1
                    )
                  )
                }
                endDate={new Date()}
                values={heatmapData}
              />

            </div>

          </div>

        )}

      </div>

    </div>

  );

}


function StatCard({ title, value }) {

  return (

    <div
      style={{
        background:"rgba(255,255,255,0.04)",
        padding:"22px",
        borderRadius:"12px",
        textAlign:"center",
        border:"1px solid rgba(255,255,255,0.08)",
        backdropFilter:"blur(10px)"
      }}
    >

      <h3>{title}</h3>

      <p style={{ fontSize:"24px", fontWeight:"bold" }}>
        {value || 0}
      </p>

    </div>

  );

}

export default CodeforcesDashboard;