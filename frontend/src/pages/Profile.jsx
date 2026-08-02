import { useEffect, useState } from "react";

function Profile() {

    const [profile, setProfile] = useState(null);

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
                padding: "30px",
                backgroundColor: "#f3f4f6",
                minHeight: "100vh"
            }}
        >

            <h1
                style={{
                    color: "#111827",
                    marginBottom: "20px"
                }}
            >
                My Profile
            </h1>

            {
                profile && (

                    <div
    style={{
        backgroundColor: "white",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        maxWidth: "500px",
        margin: "0 auto"
    }}
>
<p
    style={{
        color: "#111827",
        fontSize: "18px",
        marginBottom: "18px"
    }}
>
    <strong>Name:</strong> {profile.name}
</p>

<p
    style={{
        color: "#111827",
        fontSize: "18px",
        marginBottom: "18px"
    }}
>
    <strong>Email:</strong> {profile.email}
</p>

<p
    style={{
        color: "#111827",
        fontSize: "18px",
        marginBottom: "0"
    }}
>
    <strong>Role:</strong> {profile.role}
</p>

                    </div>

                )
            }

        </div>

    );

}

export default Profile;