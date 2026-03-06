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

      {/* Navigation Links */}
      <div
        style={{
          display: "flex",
          gap: "30px",
          fontSize: "16px"
        }}
      >

        <p
          style={{
            cursor: "pointer",
            transition: "0.2s"
          }}
          onClick={() => navigate("/dashboard")}
        >
          Dashboard
        </p>

        <p
          style={{
            cursor: "pointer",
            transition: "0.2s"
          }}
          onClick={handleLogout}
        >
          Logout
        </p>

      </div>

    </div>

  );

}

export default Navbar;