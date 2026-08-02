import { useEffect, useState } from "react";

function Users() {

    const [users, setUsers] = useState([]);

    useEffect(() => {

        const fetchUsers = async () => {

            const token = localStorage.getItem("token");

            const response = await fetch(
                "http://localhost:5000/users",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (!response.ok) {

                alert("Only Admin can access this page.");

                return;

            }

            const data = await response.json();

            setUsers(data);

        };

        fetchUsers();

    }, []);

   const tableStyle = {
    width: "80%",
    margin: "20px auto",
    borderCollapse: "collapse",
    backgroundColor: "white",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    borderRadius: "10px",
    overflow: "hidden"
};

   const headerStyle = {
    backgroundColor: "#2563EB",
    color: "white",
    padding: "16px",
    textAlign: "center",
    fontWeight: "700",
    fontSize: "16px"
};

   const cellStyle = {
    padding: "16px",
    borderBottom: "1px solid #E5E7EB",
    color: "#111827",
    fontWeight: "500",
    textAlign: "center",
    fontSize: "15px"
};

    return (

        <div
            style={{
                padding: "30px",
                backgroundColor: "#F3F4F6",
                minHeight: "100vh"
            }}
        >

            <h1
                style={{
                    color: "#111827",
                    marginBottom: "20px"
                }}
            >
                Users
            </h1>

            <table style={tableStyle}>

                <thead>

                    <tr>

                        <th style={headerStyle}>Name</th>

                        <th style={headerStyle}>Email</th>

                        <th style={headerStyle}>Role</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        users.map((user) => (

                            <tr key={user._id}>

                                <td style={cellStyle}>
                                    {user.name}
                                </td>

                                <td style={cellStyle}>
                                    {user.email}
                                </td>

                                <td style={cellStyle}>
    {user.role.charAt(0).toUpperCase() + user.role.slice(1).toLowerCase()}
</td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

}

export default Users;