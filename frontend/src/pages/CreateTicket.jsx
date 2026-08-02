import { useState } from "react";
import { useNavigate } from "react-router-dom";
function CreateTicket() {
    const [title, setTitle] = useState("");

    const [description, setDescription] = useState("");

    const [priority, setPriority] = useState("Low");
    const navigate = useNavigate();
    const handleCreateTicket = async () => {

    const token = localStorage.getItem("token");

    const response = await fetch(
        "http://localhost:5000/ticket",
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },

            body: JSON.stringify({
                title,
                description,
                priority
            })
        }
    );

    if (response.ok) {

        alert("Ticket created successfully.");

        navigate("/tickets");

    } else {

        const message = await response.text();

        alert(message);

    }

};
    return (

    <div
        style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            backgroundColor: "#f3f4f6"
        }}
    >

        <div
            style={{
                backgroundColor: "white",
                padding: "30px",
                width: "450px",
                borderRadius: "10px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
            }}
        >

            <h2
                style={{
                    textAlign: "center",
                    color: "#111827",
                    marginBottom: "25px"
                }}
            >
                Create New Ticket
            </h2>

            <label
                style={{
                    fontWeight: "600",
                    color: "#111827"
                }}
            >
                Title
            </label>

            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter ticket title"
                style={{
                    width: "100%",
                    padding: "10px",
                    marginTop: "8px",
                    marginBottom: "20px",
                    border: "1px solid #ccc",
                    borderRadius: "6px",
                    boxSizing: "border-box"
                }}
            />

            <label
                style={{
                    fontWeight: "600",
                    color: "#111827"
                }}
            >
                Description
            </label>

            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter ticket description"
                rows="5"
                style={{
                    width: "100%",
                    padding: "10px",
                    marginTop: "8px",
                    marginBottom: "20px",
                    border: "1px solid #ccc",
                    borderRadius: "6px",
                    resize: "none",
                    boxSizing: "border-box"
                }}
            />

            <label
                style={{
                    fontWeight: "600",
                    color: "#111827"
                }}
            >
                Priority
            </label>

            <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                style={{
                    width: "100%",
                    padding: "10px",
                    marginTop: "8px",
                    marginBottom: "25px",
                    border: "1px solid #ccc",
                    borderRadius: "6px",
                    boxSizing: "border-box"
                }}
            >

                <option>Low</option>

                <option>Medium</option>

                <option>High</option>

                <option>Critical</option>

            </select>

            <button
    onClick={handleCreateTicket}
    style={{
        width: "100%",
        padding: "12px",
        backgroundColor: "#2563EB",
        color: "white",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        fontWeight: "600",
        fontSize: "16px"
    }}
>
    Create Ticket
</button>

        </div>

    </div>

);

}

export default CreateTicket;