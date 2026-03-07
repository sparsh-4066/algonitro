import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

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

  const fetchStats = async () => {

    try {

      const res = await axios.get(
        `http://localhost:5000/api/codechef/${username}`
      );

      const data = res.data;

      setStats(data);

      /* CONTEST HISTORY GRAPH */

      if (data.contestHistory) {

        const history = data.contestHistory.map((c) => ({
          contest: c.contest,
          rating: c.rating
        }));

        setContestHistory(history);
      }

      /* HEATMAP + PROGRESS GRAPH */

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

    }

  };

  return (

    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#0f0f0f,#1a1a1a)",
        color: "white"
      }}
    >

      <Navbar />

      <div style={{ padding: "60px 80px" }}>

        <h1 style={{ fontSize: "48px", fontWeight: "bold" }}>
          CodeChef Analytics
        </h1>

        {/* USERNAME INPUT */}

        <div style={{ marginTop: "30px", marginBottom: "40px" }}>

          <input
            placeholder="Enter CodeChef Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              padding: "12px",
              width: "260px",
              marginRight: "10px",
              borderRadius: "6px"
            }}
          />

          <button
            onClick={fetchStats}
            style={{
              padding: "12px 20px",
              background: "#FFA116",
              border: "none",
              borderRadius: "6px",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            Fetch Stats
          </button>

        </div>

        {stats && (

          <div>

            <h2 style={{ fontSize: "36px", fontWeight: "bold" }}>
              {username}
            </h2>

            {/* STAT CARDS */}

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4,1fr)",
                gap: "20px",
                marginTop: "30px",
                marginBottom: "50px"
              }}
            >

              <StatCard title="⭐ Stars" value={stats.stars} />
              <StatCard title="📈 Rating" value={stats.rating} />
              <StatCard title="🌍 Global Rank" value={stats.globalRank} />
              <StatCard title="🇮🇳 Country Rank" value={stats.countryRank} />

            </div>

            {/* CONTEST RATING HISTORY */}

            {contestHistory.length > 0 && (

              <div style={{ marginTop: "50px" }}>

                <h3>Contest Rating History</h3>

                <ResponsiveContainer width="100%" height={300}>

                  <LineChart data={contestHistory}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis
                      dataKey="contest"
                      tick={{ fill: "#ccc", fontSize: 11 }}
                      angle={-30}
                      textAnchor="end"
                      height={60}
                    />

                    <YAxis
                      tick={{ fill: "#ccc" }}
                      label={{
                        value: "Rating",
                        angle: -90,
                        position: "insideLeft"
                      }}
                    />

                    <Tooltip />

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

            {/* SUBMISSION PROGRESS */}

            {progress.length > 0 && (

              <div style={{ marginTop: "50px" }}>

                <h3>Submission Progress</h3>

                <ResponsiveContainer width="100%" height={300}>

                  <LineChart data={progress}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis
                      dataKey="date"
                      tick={{ fill: "#ccc", fontSize: 12 }}
                      angle={-30}
                      textAnchor="end"
                      height={60}
                    />

                    <YAxis
                      tick={{ fill: "#ccc" }}
                      label={{
                        value: "Submissions",
                        angle: -90,
                        position: "insideLeft"
                      }}
                    />

                    <Tooltip />

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

            {/* HEATMAP */}

            {heatmap.length > 0 && (

              <div style={{ marginTop: "50px" }}>

                <h3>Submission Heatmap</h3>

                <CalendarHeatmap
                  startDate={
                    new Date(
                      new Date().setFullYear(
                        new Date().getFullYear() - 1
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

/* STAT CARD */

function StatCard({ title, value }) {

  return (

    <div
      style={{
        background: "#1b1b1b",
        padding: "20px",
        borderRadius: "12px",
        textAlign: "center"
      }}
    >

      <h3>{title}</h3>

      <p style={{ fontSize: "24px", fontWeight: "bold" }}>
        {value}
      </p>

    </div>

  );

}

export default CodechefDashboard;