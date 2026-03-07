import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

import { SiLeetcode, SiCodeforces, SiCodechef } from "react-icons/si";
import { FaChartLine, FaFire, FaCode } from "react-icons/fa";

function Dashboard() {

  const navigate = useNavigate();

  const stats = [
    {
      title: "Platforms Supported",
      value: "3",
      icon: <FaChartLine size={22}/>
    },
    {
      title: "Analytics Features",
      value: "10+",
      icon: <FaCode size={22}/>
    },
    {
      title: "Live Data Tracking",
      value: "Enabled",
      icon: <FaFire size={22} color="#ff6b6b"/>
    }
  ];

  return (

    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#080808,#141414)",
        color: "white",
        overflow: "hidden",
        position: "relative"
      }}
    >

      {/* BIG AMBIENT LIGHT */}

      <motion.div
        animate={{ x:[0,300,0], y:[0,200,0] }}
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

      {/* BLUE LIGHT */}

      <motion.div
        animate={{ x:[0,-250,0], y:[0,150,0] }}
        transition={{ duration:14, repeat:Infinity }}
        style={{
          position:"absolute",
          width:"800px",
          height:"800px",
          background:"#1F8ACB22",
          filter:"blur(200px)",
          bottom:"-200px",
          right:"-200px"
        }}
      />

      {/* CODECHEF LIGHT */}

      <motion.div
        animate={{ x:[0,200,0] }}
        transition={{ duration:10, repeat:Infinity }}
        style={{
          position:"absolute",
          width:"700px",
          height:"700px",
          background:"#C9A27C22",
          filter:"blur(180px)",
          top:"30%",
          left:"40%"
        }}
      />

      {/* EXTRA VISUAL LAYER */}

      <motion.div
        animate={{ opacity:[0.2,0.5,0.2] }}
        transition={{ duration:6, repeat:Infinity }}
        style={{
          position:"absolute",
          width:"100%",
          height:"100%",
          background:
            "radial-gradient(circle at 30% 40%,rgba(255,161,22,0.08),transparent 60%)"
        }}
      />

      <Navbar/>

      <div style={{ padding:"70px 80px", position:"relative", zIndex:2 }}>

        {/* HEADER */}

        <h1
          style={{
            fontSize:"56px",
            fontWeight:"bold",
            marginBottom:"10px",
            letterSpacing:"1px"
          }}
        >
          AlgoNitro Dashboard
        </h1>

        <p
          style={{
            color:"#aaa",
            marginBottom:"70px",
            fontSize:"18px"
          }}
        >
          Analyze coding performance across LeetCode, Codeforces and CodeChef
        </p>

        {/* STATS */}

        <div
          style={{
            display:"grid",
            gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",
            gap:"30px",
            marginBottom:"100px"
          }}
        >

          {stats.map((stat,index)=>(
            <motion.div
              key={index}
              initial={{ opacity:0, y:30 }}
              animate={{ opacity:1, y:0 }}
              transition={{ delay:index*0.2 }}
              whileHover={{
                scale:1.05,
                boxShadow:"0 0 20px rgba(255,255,255,0.08)"
              }}

              style={{
                background:"rgba(255,255,255,0.04)",
                backdropFilter:"blur(12px)",
                padding:"26px",
                borderRadius:"16px",
                border:"1px solid rgba(255,255,255,0.08)",
                display:"flex",
                alignItems:"center",
                gap:"15px"
              }}
            >

              {stat.icon}

              <div>

                <div style={{ color:"#aaa", fontSize:"14px" }}>
                  {stat.title}
                </div>

                <div style={{ fontSize:"22px", fontWeight:"bold" }}>
                  {stat.value}
                </div>

              </div>

            </motion.div>
          ))}

        </div>


        {/* PLATFORM AREA */}

        <div
          style={{
            display:"flex",
            flexDirection:"column",
            alignItems:"center",
            gap:"80px"
          }}
        >

          {/* LEETCODE */}

          <motion.div
            animate={{ y:[0,130,0] }}
            transition={{ duration:3, repeat:Infinity, ease:"easeInOut" }}
            whileHover={{ scale:1.07 }}
            onClick={()=>navigate("/leetcode")}

            style={{
              width:"420px",
              height:"220px",
              borderRadius:"22px",
              background:"#1b1b1b",
              display:"flex",
              flexDirection:"column",
              alignItems:"center",
              justifyContent:"center",
              border:"2px solid #FFA116",
              boxShadow:"0 0 40px #FFA11690",
              cursor:"pointer"
            }}
          >

            <SiLeetcode size={44} color="#FFA116"/>

            <h2 style={{ fontSize:"28px", marginTop:"18px" }}>
              LeetCode
            </h2>

          </motion.div>


          {/* BOTTOM CARDS */}

          <div style={{ display:"flex", gap:"90px" }}>

            {/* CODEFORCES */}

            <motion.div
              animate={{ x:[0,-90,0] }}
              transition={{ duration:3, repeat:Infinity }}
              whileHover={{ scale:1.07 }}
              onClick={()=>navigate("/codeforces")}

              style={{
                width:"340px",
                height:"200px",
                borderRadius:"22px",
                background:"#1b1b1b",
                display:"flex",
                flexDirection:"column",
                alignItems:"center",
                justifyContent:"center",
                border:"2px solid #1F8ACB",
                boxShadow:"0 0 40px #1F8ACB90",
                cursor:"pointer"
              }}
            >

              <SiCodeforces size={44} color="#1F8ACB"/>

              <h2 style={{ fontSize:"26px", marginTop:"18px" }}>
                Codeforces
              </h2>

            </motion.div>


            {/* CODECHEF */}

            <motion.div
              animate={{ x:[0,90,0] }}
              transition={{ duration:3, repeat:Infinity }}
              whileHover={{ scale:1.07 }}
              onClick={()=>navigate("/codechef")}

              style={{
                width:"340px",
                height:"200px",
                borderRadius:"22px",
                background:"#1b1b1b",
                display:"flex",
                flexDirection:"column",
                alignItems:"center",
                justifyContent:"center",
                border:"2px solid #5B4638",
                boxShadow:"0 0 40px #C9A27C90",
                cursor:"pointer"
              }}
            >

              <SiCodechef size={44} color="#5B4638"/>

              <h2 style={{ fontSize:"26px", marginTop:"18px" }}>
                CodeChef
              </h2>

            </motion.div>

          </div>

        </div>


        {/* FOOTER */}

        <div
          style={{
            marginTop:"120px",
            textAlign:"center",
            fontSize:"14px",
            opacity:0.6
          }}
        >
          Built with ❤️ by Sparsh | AlgoNitro
        </div>

      </div>

    </div>
  );
}

export default Dashboard;