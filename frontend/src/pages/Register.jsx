import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

function Register() {

  const navigate = useNavigate();

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleRegister = async (e) => {

    e.preventDefault();

    try {

      await API.post("/auth/register",{
        name,
        email,
        password
      });

      alert("Registration successful. Please login.");

      navigate("/login");

    } catch(err) {

      alert("Registration failed");

    }

  };

  return (

    <div style={styles.page}>

      <div style={styles.glowBlue}></div>
      <div style={styles.glowOrange}></div>

      <div style={styles.card}>

        <h1 style={styles.title}>Create Account</h1>
        <p style={styles.subtitle}>Join AlgoNitro</p>

        <form onSubmit={handleRegister} style={styles.form}>

          <input
            type="text"
            placeholder="Username"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            style={styles.input}
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            style={styles.input}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            style={styles.input}
            required
          />

          <button type="submit" style={styles.button}>
            Register
          </button>

        </form>

        <p style={styles.bottomText}>
          Already have an account?{" "}
          <Link to="/login" style={styles.link}>
            Login
          </Link>
        </p>

      </div>

    </div>

  );

}

const styles = {

  page:{
    position:"relative",
    height:"100vh",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    background:"#000",
    overflow:"hidden"
  },

  glowBlue:{
    position:"absolute",
    width:"700px",
    height:"700px",
    background:"radial-gradient(circle,#1F8ACB,transparent 70%)",
    filter:"blur(180px)",
    top:"-100px",
    left:"-200px",
    opacity:0.7
  },

  glowOrange:{
    position:"absolute",
    width:"700px",
    height:"700px",
    background:"radial-gradient(circle,#FFA116,transparent 70%)",
    filter:"blur(180px)",
    bottom:"-200px",
    right:"-200px",
    opacity:0.7
  },

  card:{
    width:"520px",
    padding:"55px",
    borderRadius:"22px",
    background:"rgba(255,255,255,0.05)",
    backdropFilter:"blur(20px)",
    border:"1px solid rgba(255,255,255,0.08)",
    boxShadow:"0 0 60px rgba(0,0,0,0.9)",
    zIndex:2
  },

  title:{
  textAlign:"center",
  fontSize:"34px",
  marginBottom:"8px",
  color:"#ffffff"
},

subtitle:{
  textAlign:"center",
  color:"#cfcfcf",
  marginBottom:"35px"
},

  form:{
    display:"flex",
    flexDirection:"column",
    gap:"18px"
  },

  input:{
    padding:"15px",
    borderRadius:"12px",
    border:"1px solid #333",
    background:"#111",
    color:"white",
    fontSize:"15px"
  },

  button:{
    padding:"15px",
    borderRadius:"12px",
    border:"none",
    background:"linear-gradient(135deg,#1F8ACB,#4db6ff)",
    color:"white",
    fontWeight:"bold",
    cursor:"pointer",
    fontSize:"16px"
  },

  bottomText:{
    marginTop:"22px",
    textAlign:"center",
    color:"#aaa"
  },

  link:{
    color:"#1F8ACB",
    textDecoration:"none",
    fontWeight:"bold"
  }

};

export default Register;