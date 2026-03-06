import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

import { SiLeetcode, SiCodeforces, SiCodechef } from "react-icons/si";

function Dashboard() {

  const navigate = useNavigate();

  const cards = [
    {
      name: "LeetCode",
      color: "#FFA116",
      route: "/leetcode",
      icon: <SiLeetcode size={40} color="#FFA116" />
    },
    {
      name: "Codeforces",
      color: "#1F8ACB",
      route: "/codeforces",
      icon: <SiCodeforces size={40} color="#1F8ACB" />
    },
    {
      name: "CodeChef",
      color: "#5B4638",
      route: "/codechef",
      icon: <SiCodechef size={40} color="#5B4638" />
    }
  ];

  return (

    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#0f0f0f,#1a1a1a)",
        color: "white"
      }}
    >

      <Navbar />

      <div
        style={{
          padding: "70px 80px"
        }}
      >

        <h1
          style={{
            fontSize: "54px",
            fontWeight: "bold",
            marginBottom: "10px"
          }}
        >
          AlgoNitro Dashboard
        </h1>

        <p
          style={{
            color: "#aaa",
            marginBottom: "70px",
            fontSize: "18px"
          }}
        >
          Track your competitive programming performance across platforms
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: "70px"
          }}
        >

          {cards.map((card, index) => (

            <motion.div
              key={index}

              whileHover={{
                scale: 1.05,
                y: -8
              }}

              onClick={() => navigate(card.route)}

              style={{
                height: "220px",
                borderRadius: "22px",
                background: "#1b1b1b",

                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",

                border: `2px solid ${card.color}`,
                boxShadow: `0 0 30px ${card.color}40`,

                cursor: "pointer",
                transition: "0.3s"
              }}
            >

              {card.icon}

              <h2
                style={{
                  fontSize: "26px",
                  marginTop: "18px"
                }}
              >
                {card.name}
              </h2>

            </motion.div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default Dashboard;