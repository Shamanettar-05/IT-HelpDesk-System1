import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
function Login(){
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const navigate = useNavigate();
   const handleLogin = async () => {
  const response = await fetch("http://localhost:5000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email,
      password
    })
  });

 const data = await response.json();
localStorage.setItem("token", data.token);
navigate("/dashboard");

};
  return (
    <div style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f4f6f8"
    }}>

      <div style={{
        background: "white",
        color: "#111827",
        padding: "50px",
        borderRadius: "12px",
        width: "450px",
        minHeight: "460px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.12)"
        
      }}>

        <h2
    style={{
        textAlign: "center",
        marginBottom: "35px",
        color: "#111827",
        fontSize: "34px",
        fontWeight: "700"
    }}
>
          IT Help Desk Login
        </h2>

        <input type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: "100%", padding: "14px", marginBottom: "22px",fontSize: "16px", borderRadius: "5px", border: "1px solid #ccc" }} />

        <input type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: "100%", padding: "14px", marginBottom: "28px", borderRadius: "5px", fontSize: "16px",border: "1px solid #ccc" }} />

        <button
        onClick={handleLogin}
          style={{
            width: "100%",
            padding: "14px",
            fontSize: "17px",
            fontWeight: "600",
            
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Login
        </button>
        <p
    style={{
        marginTop: "30px",
        fontSize: "17px",
        textAlign: "center",
        color: "#374151"
    }}
>
    Don't have an account?

    <Link
        to="/register"
        style={{
            marginLeft: "5px",
            color: "#2563EB",
            textDecoration: "none",
            fontWeight: "600"
        }}
    >
        Register
    </Link>

</p>

      </div>

    </div>
  );
}

export default Login;