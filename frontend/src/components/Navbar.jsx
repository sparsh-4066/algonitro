import { useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (

    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px 60px",
        background: "#0f0f0f",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid #222",
        position: "sticky",
        top: 0,
        zIndex: 1000
      }}
    >

      {/* Logo */}

      <h2
        style={{
          cursor: "pointer",
          fontWeight: "bold",
          letterSpacing: "1px"
        }}
        onClick={() => navigate("/dashboard")}
      >
        AlgoNitro
      </h2>

      {/* Navigation Buttons */}

      <div
        style={{
          display: "flex",
          gap: "15px",
          fontSize: "15px"
        }}
      >

        {/* Dashboard Button */}

        <button
          onClick={() => navigate("/dashboard")}
          style={{
            padding: "8px 16px",
            borderRadius: "8px",
            border: "1px solid #00ff9c",
            background: "transparent",
            color: "#00ff9c",
            cursor: "pointer",
            fontWeight: "bold",
            transition: "0.2s"
          }}
        >
          Dashboard
        </button>


        {/* Logout Button */}

        <button
          onClick={handleLogout}
          style={{
            padding: "8px 16px",
            borderRadius: "8px",
            border: "1px solid #ff4d4d",
            background: "transparent",
            color: "#ff4d4d",
            cursor: "pointer",
            fontWeight: "bold",
            transition: "0.2s"
          }}
        >
          Logout
        </button>

      </div>

    </div>

  );

}

export default Navbar;