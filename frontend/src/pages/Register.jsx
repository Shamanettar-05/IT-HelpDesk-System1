import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {

    const [name, setName] = useState("");

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [role, setRole] = useState("user");

    const navigate = useNavigate();

    const handleRegister = async () => {

        const response = await fetch(
    "http://localhost:5000/user",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    name,
                    email,
                    password,
                    role

                })
            }
        );

        if (response.ok) {

            alert("Registration Successful.");

            navigate("/");

        } else {

            const message = await response.text();

            alert(message);

        }

    };

    return (

        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#F3F4F6"
            }}
        >

            <div
                style={{
                    width: "400px",
                    backgroundColor: "white",
                    padding: "30px",
                    borderRadius: "10px",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
                }}
            >

                <h2
                    style={{
                        textAlign: "center",
                        marginBottom: "25px",
                        color: "#111827"
                    }}
                >
                    Register
                </h2>

                <input
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={inputStyle}
                />

                <input
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={inputStyle}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={inputStyle}
                />

                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    style={inputStyle}
                >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>

                <button
                    onClick={handleRegister}
                    style={{
                        width: "100%",
                        padding: "12px",
                        backgroundColor: "#2563EB",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontWeight: "600"
                    }}
                >
                    Register
                </button>

                <p
                    style={{
                        marginTop: "20px",
                        textAlign: "center"
                    }}
                >
                    Already have an account?

                    <Link
                        to="/"
                        style={{
                            marginLeft: "5px"
                        }}
                    >
                        Login
                    </Link>

                </p>

            </div>

        </div>

    );

}

const inputStyle = {

    width: "100%",

    padding: "10px",

    marginBottom: "15px",

    border: "1px solid #D1D5DB",

    borderRadius: "8px",

    boxSizing: "border-box"

};

export default Register;