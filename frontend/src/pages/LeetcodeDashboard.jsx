import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

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

  const fetchStats = async () => {

    try {

      const res = await axios.get(
        `http://localhost:5000/api/leetcode/${username}`
      );

      const data = res.data;

      setStats(data.problemsSolved || []);
      setContest(data.contest || null);
      setTopics(data.topics || null);

      /* CONTEST HISTORY GRAPH */

      if (data.contestHistory) {

        const history = data.contestHistory.map((c) => ({
          name: c.contest.title,
          rating: c.rating
        }));

        setContestHistory(history);
      }

      /* HEATMAP + PROGRESS GRAPH */

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
        background: "linear-gradient(135deg,#0f0f0f,#1a1a1a)",
        color: "white"
      }}
    >

      <Navbar />

      <div style={{ padding: "60px 80px" }}>

        <h1 style={{ fontSize: "48px", fontWeight: "bold" }}>
          LeetCode Analytics
        </h1>

        {/* USERNAME INPUT */}

        <div style={{ marginTop: "30px", marginBottom: "40px" }}>

          <input
            placeholder="Enter LeetCode Username"
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

            {/* USERNAME */}

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

              <StatCard title="Total Solved" value={stats[0]?.count} />
              <StatCard title="Easy" value={stats[1]?.count} />
              <StatCard title="Medium" value={stats[2]?.count} />
              <StatCard title="Hard" value={stats[3]?.count} />

            </div>

            {/* DIFFICULTY PIE CHART */}

            <h3>Difficulty Distribution</h3>

            <ResponsiveContainer width="100%" height={300}>

              <PieChart>

                <Pie
                  data={pieData}
                  dataKey="value"
                  outerRadius={100}
                >

                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}

                </Pie>

                <Tooltip />

              </PieChart>

            </ResponsiveContainer>

            {/* CONTEST CARD */}

            {contest && (

              <div style={{ marginTop: "30px" }}>

                <h3>Contest Stats</h3>

                <p>Rating: {contest.rating}</p>
                <p>Global Rank: {contest.globalRanking}</p>
                <p>Contests Attended: {contest.attendedContestsCount}</p>

              </div>

            )}

            {/* CONTEST RATING HISTORY */}

            {contestHistory.length > 0 && (

              <div style={{ marginTop: "50px" }}>

                <h3>Contest Rating History</h3>

                <ResponsiveContainer width="100%" height={300}>

                  <LineChart data={contestHistory}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis
                      dataKey="name"
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

            {/* HEATMAP */}

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

            {/* TOPIC ANALYTICS */}

            {topics && (

              <div style={{ marginTop: "50px" }}>

                <h3>Topic Analytics</h3>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4,1fr)",
                    gap: "20px"
                  }}
                >

                  <StatCard title="Easy Problems" value={topics.easySolved} />
                  <StatCard title="Medium Problems" value={topics.mediumSolved} />
                  <StatCard title="Hard Problems" value={topics.hardSolved} />
                  <StatCard title="Acceptance Rate" value={topics.acceptanceRate} />

                </div>

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
        {value || 0}
      </p>

    </div>

  );

}

export default LeetcodeDashboard;