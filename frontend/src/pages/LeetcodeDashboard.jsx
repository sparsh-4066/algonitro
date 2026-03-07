import { useState } from "react";
import API from "../services/api.js";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { FaSpinner } from "react-icons/fa";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts";

import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";

function LeetcodeDashboard() {

  const [username, setUsername] = useState("");
  const [stats, setStats] = useState(null);
  const [heatmap, setHeatmap] = useState([]);
  const [contest, setContest] = useState(null);
  const [contestHistory, setContestHistory] = useState([]);
  const [topics, setTopics] = useState(null);
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchStats = async () => {

    setLoading(true);

    try {

      const res = await API.get(`/leetcode/${username}`);

      const data = res.data;

      setStats(data.problemsSolved || []);
      setContest(data.contest || null);
      setTopics(data.topics || null);

      if (data.contestHistory) {

        const history = data.contestHistory.map((c) => ({
          name: c.contest.title,
          rating: c.rating
        }));

        setContestHistory(history);
      }

      if (data.submissionCalendar) {

        const calendar = JSON.parse(data.submissionCalendar);

        const heatmapData = Object.keys(calendar).map((time) => ({
          date: new Date(time * 1000),
          count: calendar[time]
        }));

        setHeatmap(heatmapData);

        const progressData = Object.keys(calendar).map((time) => ({
          date: new Date(time * 1000).toLocaleDateString(),
          submissions: calendar[time]
        }));

        setProgress(progressData);
      }

    } catch (error) {

      console.error(error);
      alert("Failed to fetch LeetCode stats");

    } finally {

      setLoading(false);

    }

  };

  const pieData = stats
    ? [
        { name: "Easy", value: stats[1]?.count || 0 },
        { name: "Medium", value: stats[2]?.count || 0 },
        { name: "Hard", value: stats[3]?.count || 0 }
      ]
    : [];

  const COLORS = ["#00C49F", "#FFBB28", "#FF4444"];

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

      <motion.div
        animate={{ x:[0,250,0], y:[0,200,0] }}
        transition={{ duration:10, repeat:Infinity }}
        style={{
          position:"absolute",
          width:"900px",
          height:"900px",
          background:"#FFA11622",
          filter:"blur(200px)",
          top:"-200px",
          left:"-300px"
        }}
      />

      <motion.div
        animate={{ x:[0,-200,0], y:[0,150,0] }}
        transition={{ duration:12, repeat:Infinity }}
        style={{
          position:"absolute",
          width:"700px",
          height:"700px",
          background:"#FFBB2820",
          filter:"blur(200px)",
          bottom:"-200px",
          right:"-200px"
        }}
      />

      <Navbar />

      <div style={{ padding:"60px 80px", position:"relative", zIndex:2 }}>

        <div style={{ textAlign:"center", marginBottom:"60px" }}>

          <h1 style={{ fontSize:"52px", fontWeight:"bold" }}>
            LeetCode Analytics
          </h1>

          <p style={{ color:"#aaa", marginTop:"10px" }}>
            Analyze your LeetCode performance with interactive insights
          </p>

        </div>

        <div
          style={{
            display:"flex",
            justifyContent:"center",
            marginBottom:"70px"
          }}
        >

          <div>

            <input
              placeholder="Enter LeetCode Username"
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
                background:"#FFA116",
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

        {stats && (

          <div>

            <h2 style={{ fontSize:"36px", textAlign:"center", marginBottom:"30px" }}>
              {username}
            </h2>

            <div
              style={{
                display:"grid",
                gridTemplateColumns:"repeat(4,1fr)",
                gap:"25px",
                marginBottom:"60px"
              }}
            >

              <StatCard title="Total Solved" value={stats[0]?.count}/>
              <StatCard title="Easy" value={stats[1]?.count}/>
              <StatCard title="Medium" value={stats[2]?.count}/>
              <StatCard title="Hard" value={stats[3]?.count}/>

            </div>

            <h3 style={{ marginBottom:"20px" }}>
              Difficulty Distribution
            </h3>

            <ResponsiveContainer width="100%" height={300}>

              <PieChart>

                <Pie data={pieData} dataKey="value" outerRadius={100}>

                  {pieData.map((entry,index)=>(
                    <Cell key={index} fill={COLORS[index]}/>
                  ))}

                </Pie>

                <Tooltip/>

              </PieChart>

            </ResponsiveContainer>

            {contest && (

              <div
                style={{
                  marginTop:"60px",
                  background:"rgba(255,255,255,0.04)",
                  border:"1px solid rgba(255,255,255,0.08)",
                  padding:"30px",
                  borderRadius:"14px",
                  backdropFilter:"blur(10px)"
                }}
              >

                <h3 style={{ marginBottom:"20px" }}>
                  Contest Stats
                </h3>

                <div
                  style={{
                    display:"grid",
                    gridTemplateColumns:"repeat(3,1fr)",
                    gap:"20px"
                  }}
                >

                  <StatCard title="Rating" value={contest.rating}/>
                  <StatCard title="Global Rank" value={contest.globalRanking}/>
                  <StatCard title="Contests Attended" value={contest.attendedContestsCount}/>

                </div>

              </div>

            )}

            {contestHistory.length>0 && (

              <div style={{ marginTop:"60px" }}>

                <h3>Contest Rating History</h3>

                <ResponsiveContainer width="100%" height={300}>

                  <LineChart data={contestHistory}>

                    <CartesianGrid strokeDasharray="3 3"/>

                    <XAxis
                      dataKey="name"
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
                      stroke="#FFA116"
                      strokeWidth={2}
                    />

                  </LineChart>

                </ResponsiveContainer>

              </div>

            )}

            <div style={{ marginTop:"60px" }}>

              <h3>Submission Progress</h3>

              <ResponsiveContainer width="100%" height={300}>

                <LineChart data={progress}>

                  <CartesianGrid strokeDasharray="3 3"/>

                  <XAxis
                    dataKey="date"
                    tick={{ fill:"#ccc", fontSize:12 }}
                    angle={-30}
                    textAnchor="end"
                    height={60}
                  />

                  <YAxis tick={{ fill:"#ccc" }}/>

                  <Tooltip/>

                  <Line
                    type="monotone"
                    dataKey="submissions"
                    stroke="#00C49F"
                    strokeWidth={2}
                  />

                </LineChart>

              </ResponsiveContainer>

            </div>

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
                values={heatmap}
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

export default LeetcodeDashboard;