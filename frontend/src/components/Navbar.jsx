import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
function Navbar() {
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);

    const handleLogout = () => {

    localStorage.removeItem("token");

    navigate("/");

};
useEffect(() => {

    const fetchProfile = async () => {

        const token = localStorage.getItem("token");

        const response = await fetch(

            "http://localhost:5000/profile",

            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }

        );

        const data = await response.json();

        setProfile(data);

    };

    fetchProfile();

}, []);

    return (

        <div
            style={{
                backgroundColor: "#2563EB",
                padding: "15px 30px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }}
        >

            <h2
                style={{
                    color: "white",
                    margin: 0
                }}
            >
                IT Help Desk
            </h2>

            <div
                style={{
                    display: "flex",
                    gap: "20px"
                }}
            >

                <Link
                    to="/dashboard"
                    style={{
                        color: "white",
                        textDecoration: "none",
                        fontWeight: "600"
                    }}
                >
                    Dashboard
                </Link>

                <Link
                    to="/tickets"
                    style={{
                        color: "white",
                        textDecoration: "none",
                        fontWeight: "600"
                    }}
                >
                    Tickets
                </Link>

                <Link
                    to="/profile"
                    style={{
                        color: "white",
                        textDecoration: "none",
                        fontWeight: "600"
                    }}
                >
                    Profile
                </Link>

                {
    profile?.role === "admin" && (

        <Link
            to="/users"
            style={{
                color: "white",
                textDecoration: "none",
                fontWeight: "600"
            }}
        >
            Users
        </Link>

    )
}
                <button
    onClick={handleLogout}
    style={{
        backgroundColor: "#DC2626",
        color: "white",
        border: "none",
        padding: "8px 15px",
        borderRadius: "6px",
        cursor: "pointer",
        fontWeight: "600"
    }}
>
    Logout
</button>

            </div>

        </div>

    );

}

export default Navbar;