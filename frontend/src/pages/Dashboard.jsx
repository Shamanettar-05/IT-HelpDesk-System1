import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardCard from "../components/DashboardCard";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer
} from "recharts";
function Dashboard() {
    const navigate = useNavigate();
 
    const [dashboardData, setDashboardData] = useState(null);

    useEffect(() => {

        const fetchDashboard = async () => {

            const token = localStorage.getItem("token");

            const response = await fetch(
                "http://localhost:5000/dashboard",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            setDashboardData(data);

        };

        fetchDashboard();

    }, []);

    const cardStyle = {
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "10px",
        textAlign: "center",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
    };

    const titleStyle = {
        color: "#6B7280",
        fontWeight: "600",
        marginBottom: "10px"
    };

    const numberStyle = {
        color: "#111827",
        fontSize: "42px",
        fontWeight: "bold",
        margin: "10px 0"
    };

    const dashboardCards = [

        {
            title: "Total Tickets",
            value: dashboardData?.totalTickets
        },

        {
            title: "Open Tickets",
            value: dashboardData?.openTickets
        },

        {
            title: "In Progress",
            value: dashboardData?.inProgressTickets
        },

        {
            title: "Resolved",
            value: dashboardData?.resolvedTickets
        },

        {
            title: "Closed",
            value: dashboardData?.closedTickets
        },

        {
            title: "Created By Me",
            value: dashboardData?.ticketsCreatedByMe
        }

    ];
    const priorityData = [

    {
        name: "Low",
        value: dashboardData?.lowPriorityTickets || 0
    },

    {
        name: "Medium",
        value: dashboardData?.mediumPriorityTickets || 0
    },

    {
        name: "High",
        value: dashboardData?.highPriorityTickets || 0
    },

    {
        name: "Critical",
        value: dashboardData?.criticalPriorityTickets || 0
    }

];
const statusData = [

    {
        status: "Open",
        tickets: dashboardData?.openTickets || 0
    },

    {
        status: "In Progress",
        tickets: dashboardData?.inProgressTickets || 0
    },

    {
        status: "Resolved",
        tickets: dashboardData?.resolvedTickets || 0
    },

    {
        status: "Closed",
        tickets: dashboardData?.closedTickets || 0
    }

];

const COLORS = [

    "#22C55E",
    "#F59E0B",
    "#EF4444",
    "#7C3AED"

];

    
    const handleLogout = () => {

    localStorage.removeItem("token");

    navigate("/");

};


    return (

        <div
            style={{
                padding: "30px",
                backgroundColor: "#f3f4f6",
                minHeight: "100vh"
            }}
        >

            <div
    style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "30px"
    }}
>

    <h1
        style={{
            color: "#111827",
            margin: 0
        }}
    >
        IT Help Desk Dashboard
    </h1>

    

</div>

            {dashboardData && (

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gap: "20px"
                    }}
                >

                    {
                        dashboardCards.map((card) => (

                            <DashboardCard
                                key={card.title}
                                title={card.title}
                                value={card.value}
                                cardStyle={cardStyle}
                                titleStyle={titleStyle}
                                numberStyle={numberStyle}
                            />

                        ))
                    }

                </div>

            )}
           <div
    style={{
        marginTop: "40px",
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
    }}
>

   <h2
    style={{
        textAlign: "center",
        marginBottom: "20px",
        color: "#1E3A8A",
        fontWeight: "700",
        borderBottom: "2px solid #2563EB",
        paddingBottom: "10px"
    }}
>
    Priority Distribution
</h2>

 <ResponsiveContainer
    width="100%"
    height={350}
>

    <PieChart>

        <Pie
            data={priorityData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={110}
            label
        >
            {
                priorityData.map((entry, index) => (

                    <Cell
                        key={index}
                        fill={COLORS[index]}
                    />

                ))
            }
        </Pie>

        <Tooltip />

        <Legend />

    </PieChart>

</ResponsiveContainer>
    <div
    style={{
        marginTop: "40px",
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
    }}
>

    <h2
        style={{
            textAlign: "center",
            marginBottom: "20px",
            color: "#1E3A8A",
            fontWeight: "700",
            borderBottom: "2px solid #2563EB",
            paddingBottom: "10px"
        }}
    >
        Status Distribution
    </h2>

    <ResponsiveContainer
    width="100%"
    height={350}
>

    <BarChart
        data={statusData}
    >

        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="status" />

        <YAxis />

        <Tooltip />

        <Legend />

        <Bar
            dataKey="tickets"
            fill="#2563EB"
            radius={[8, 8, 0, 0]}
        />

    </BarChart>

</ResponsiveContainer>

</div>

</div> 

        </div>

    );

}

export default Dashboard;