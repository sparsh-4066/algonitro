import { useState } from "react";
import API from "../services/api.js";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { FaSpinner } from "react-icons/fa";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";

function CodechefDashboard() {

  const [username, setUsername] = useState("");
  const [stats, setStats] = useState(null);
  const [contestHistory, setContestHistory] = useState([]);
  const [heatmap, setHeatmap] = useState([]);
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchStats = async () => {

    setLoading(true);

    try {

      const res = await API.get(`/codechef/${username}`);

      const data = res.data;

      setStats(data);

      if (data.contestHistory) {

        const history = data.contestHistory.map((c) => ({
          contest: c.contest,
          rating: c.rating
        }));

        setContestHistory(history);
      }

      if (data.submissions) {

        const heatmapData = data.submissions.map((s) => ({
          date: new Date(s.date),
          count: s.count
        }));

        setHeatmap(heatmapData);

        const progressData = data.submissions.map((s) => ({
          date: new Date(s.date).toLocaleDateString(),
          submissions: s.count
        }));

        setProgress(progressData);
      }

    } catch (error) {

      console.error(error);
      alert("Failed to fetch CodeChef stats");

    } finally {

      setLoading(false);

    }

  };

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
        transition={{ duration:12, repeat:Infinity }}
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
        animate={{ x:[0,-250,0], y:[0,150,0] }}
        transition={{ duration:14, repeat:Infinity }}
        style={{
          position:"absolute",
          width:"800px",
          height:"800px",
          background:"#C9A27C22",
          filter:"blur(200px)",
          bottom:"-200px",
          right:"-200px"
        }}
      />

      <Navbar />

      <div style={{ padding:"60px 80px", position:"relative", zIndex:2 }}>

        <div style={{ textAlign:"center", marginBottom:"60px" }}>

          <h1 style={{ fontSize:"52px", fontWeight:"bold" }}>
            CodeChef Analytics
          </h1>

          <p style={{ color:"#aaa", marginTop:"10px" }}>
            Analyze CodeChef performance and contest history
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
              placeholder="Enter CodeChef Username"
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

            <h2 style={{ fontSize:"36px", textAlign:"center", marginBottom:"40px" }}>
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

              <StatCard title="⭐ Stars" value={stats.stars}/>
              <StatCard title="📈 Rating" value={stats.rating}/>
              <StatCard title="🌍 Global Rank" value={stats.globalRank}/>
              <StatCard title="🇮🇳 Country Rank" value={stats.countryRank}/>

            </div>

            {contestHistory.length > 0 && (

              <div style={{ marginTop:"40px" }}>

                <h3>Contest Rating History</h3>

                <ResponsiveContainer width="100%" height={300}>

                  <LineChart data={contestHistory}>

                    <CartesianGrid strokeDasharray="3 3"/>

                    <XAxis
                      dataKey="contest"
                      tick={{ fill:"#ccc", fontSize:11 }}
                      angle={-30}
                      textAnchor="end"
                      height={60}
                    />

                    <YAxis
                      tick={{ fill:"#ccc" }}
                      label={{
                        value:"Rating",
                        angle:-90,
                        position:"insideLeft"
                      }}
                    />

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

            {progress.length > 0 && (

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

                    <YAxis
                      tick={{ fill:"#ccc" }}
                      label={{
                        value:"Submissions",
                        angle:-90,
                        position:"insideLeft"
                      }}
                    />

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

            )}

            {heatmap.length > 0 && (

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

            )}

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
        {value}
      </p>

    </div>

  );

}

export default CodechefDashboard;