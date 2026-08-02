import { useEffect, useState } from "react";

function Tickets() {

    const [tickets, setTickets] = useState([]);
    const [selectedTicket, setSelectedTicket] = useState(null);

    const [editingTicket, setEditingTicket] = useState(null);

    const [editTitle, setEditTitle] = useState("");

    const [editDescription, setEditDescription] = useState("");

    const [editPriority, setEditPriority] = useState("");
    const [editStatus, setEditStatus] = useState("");
    const [editAssignedTo, setEditAssignedTo] = useState("");
    const [showCreateModal, setShowCreateModal] = useState(false);

    const [title, setTitle] = useState("");

    const [description, setDescription] = useState("");

    const [priority, setPriority] = useState("Low");
    const [searchTitle, setSearchTitle] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [priorityFilter, setPriorityFilter] = useState("All");
    const [sortBy, setSortBy] = useState("Newest");
    const [profile, setProfile] = useState(null);
    const [users, setUsers] = useState([]);
    const [commentText, setCommentText] = useState("");

    const [comments, setComments] = useState([]);
    const fetchTickets = async () => {

    const token = localStorage.getItem("token");

    const response = await fetch(
        "http://localhost:5000/tickets",
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    const data = await response.json();

    setTickets(data);

};
const fetchTicketDetails = async (ticketId) => {

    const token = localStorage.getItem("token");

    const response = await fetch(
        `http://localhost:5000/ticket/${ticketId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    const data = await response.json();

    setSelectedTicket(data);

    setComments(data.comments);
};
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
        return;
    }

    const data = await response.json();

    setUsers(data);

};
useEffect(() => {

    fetchTickets();

    fetchProfile();
    fetchUsers();

}, []);

    const tableStyle = {
        width: "100%",
        borderCollapse: "collapse",
        marginTop: "20px",
        backgroundColor: "white",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
    };

    const headerStyle = {
        backgroundColor: "#2563eb",
        color: "white",
        padding: "12px",
        textAlign: "left"
    };

    const cellStyle = {
        padding: "12px",
        borderBottom: "1px solid #ddd",
        color: "#111827",
        fontWeight: "500"
    };

    const buttonStyle = {
        backgroundColor: "#2563eb",
        color: "white",
        border: "none",
        padding: "8px 16px",
        borderRadius: "6px",
        cursor: "pointer",
        fontWeight: "600"
    };

    const getStatusStyle = (status) => {

        let styles = {
            color: "#6B7280",
            backgroundColor: "#F3F4F6",
            border: "1px solid #D1D5DB"
        };

        if (status === "Open") {
            styles = {
                color: "#2563EB",
                backgroundColor: "#DBEAFE",
                border: "1px solid #93C5FD"
            };
        }

        else if (status === "In Progress") {
            styles = {
                color: "#D97706",
                backgroundColor: "#FEF3C7",
                border: "1px solid #FCD34D"
            };
        }

        else if (status === "Resolved") {
            styles = {
                color: "#059669",
                backgroundColor: "#D1FAE5",
                border: "1px solid #6EE7B7"
            };
        }

        else if (status === "Closed") {
            styles = {
                color: "#4B5563",
                backgroundColor: "#E5E7EB",
                border: "1px solid #D1D5DB"
            };
        }

        return {
            ...styles,
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            padding: "6px 12px",
            borderRadius: "8px",
            fontWeight: "700",
            fontSize: "12px",
            textTransform: "uppercase"
        };

    };

    const getStatusIcon = (status) => {

        if (status === "Open") return "📂";

        if (status === "In Progress") return "⏳";

        if (status === "Resolved") return "✔️";

        if (status === "Closed") return "🔒";

        return "•";

    };

    const getPriorityStyle = (priority) => {

        if (priority === "Critical") {
            return {
                color: "#DC2626",
                fontWeight: "700"
            };
        }

        if (priority === "High") {
            return {
                color: "#EA580C",
                fontWeight: "700"
            };
        }

        if (priority === "Medium") {
            return {
                color: "#D97706",
                fontWeight: "700"
            };
        }

        return {
            color: "#16A34A",
            fontWeight: "700"
        };

    };

    const getPriorityIcon = (priority) => {

        if (priority === "Critical") return "🔴";

        if (priority === "High") return "🟠";

        if (priority === "Medium") return "🔶";

        return "🟢";

    };
    const handleSearch = async () => {

    const token = localStorage.getItem("token");


   const response = await fetch(

`http://localhost:5000/tickets/search?title=${searchTitle}&status=${statusFilter}&priority=${priorityFilter}&sort=${sortBy}`,

{
    headers:{
        Authorization:`Bearer ${token}`
    }
}

);

    const data = await response.json();

    setTickets(data);

};
    const handleUpdateTicket = async () => {

    const token = localStorage.getItem("token");

    const response = await fetch(

        `http://localhost:5000/ticket/${editingTicket._id}`,

        {
            method: "PUT",

            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },

           body: JSON.stringify({

    title: editTitle,

    description: editDescription,

    priority: editPriority,

    status: editStatus,

    assignedTo: editAssignedTo

})

        }

    );

    if (response.ok) {

        alert("Ticket updated successfully.");

        setEditingTicket(null);

        fetchTickets();

    }

    else {

        const message = await response.text();

        alert(message);

    }

};
const handleDeleteTicket = async (ticketId) => {

    const confirmDelete = window.confirm(
        "Are you sure you want to delete this ticket?"
    );

    if (!confirmDelete) {
        return;
    }

    const token = localStorage.getItem("token");

    const response = await fetch(

        `http://localhost:5000/ticket/${ticketId}`,

        {
            method: "DELETE",

            headers: {
                Authorization: `Bearer ${token}`
            }

        }

    );

    if (response.ok) {

        alert("Ticket deleted successfully.");

        fetchTickets();

    }

    else {

        const message = await response.text();

        alert(message);

    }

};

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

        setShowCreateModal(false);

        setTitle("");

        setDescription("");

        setPriority("Low");

        fetchTickets();

    }

    else {

        const message = await response.text();

        alert(message);

    }

};
const handleResolveTicket = async (ticketId) => {

    const token = localStorage.getItem("token");

    const response = await fetch(

        `http://localhost:5000/ticket/${ticketId}/resolve`,

        {

            method: "PUT",

            headers: {

                Authorization: `Bearer ${token}`

            }

        }

    );

    if (response.ok) {

        alert("Ticket resolved successfully.");

        fetchTickets();

    }

    else {

        const message = await response.text();

        alert(message);

    }

};
const handleCloseTicket = async (ticketId) => {

    const token = localStorage.getItem("token");

    const response = await fetch(

        `http://localhost:5000/ticket/${ticketId}/close`,

        {
            method: "PUT",

            headers: {
                Authorization: `Bearer ${token}`
            }
        }

    );

    if (response.ok) {

        alert("Ticket closed successfully.");

        fetchTickets();

    }

    else {

        const message = await response.text();

        alert(message);

    }

};
const handleAddComment = async () => {

    const token = localStorage.getItem("token");

    const response = await fetch(

        `http://localhost:5000/ticket/${selectedTicket._id}/comment`,

        {

            method: "POST",

            headers: {

                "Content-Type": "application/json",

                Authorization: `Bearer ${token}`

            },

            body: JSON.stringify({

                text: commentText

            })

        }

    );

    if (response.ok) {

        setCommentText("");

        fetchTicketDetails(selectedTicket._id);

    }

    else {

        const message = await response.text();

        alert(message);

    }

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
        gap: "10px",
        alignItems: "center",
        marginBottom: "20px"
    }}
>

    <input
        type="text"
        placeholder="Search by title..."
        value={searchTitle}
        onChange={(e) => setSearchTitle(e.target.value)}
        style={{
            flex: 1,
            padding: "10px",
            border: "1px solid #D1D5DB",
            borderRadius: "6px",
            fontSize: "16px"
        }}
    />
    <select
    value={statusFilter}
    onChange={(e) => setStatusFilter(e.target.value)}
    style={{
        padding: "10px",
        borderRadius: "6px",
        border: "1px solid #ccc",
        marginLeft: "10px"
    }}
>
    <option value="All">All Status</option>
    <option value="Open">Open</option>
    <option value="In Progress">In Progress</option>
    <option value="Resolved">Resolved</option>
    <option value="Closed">Closed</option>
</select>
<select
    value={sortBy}
    onChange={(e) => setSortBy(e.target.value)}
    style={{
        padding: "10px",
        border: "1px solid #D1D5DB",
        borderRadius: "6px",
        fontSize: "16px"
    }}
>
    <option value="Newest">Newest First</option>
    <option value="Oldest">Oldest First</option>
    <option value="HighPriority">Priority High → Low</option>
    <option value="LowPriority">Priority Low → High</option>
</select>
<select
    value={priorityFilter}
    onChange={(e) => setPriorityFilter(e.target.value)}
    style={{
        padding: "10px",
        border: "1px solid #D1D5DB",
        borderRadius: "6px",
        fontSize: "16px"
    }}
>
    <option value="All">All Priority</option>
    <option value="Low">Low</option>
    <option value="Medium">Medium</option>
    <option value="High">High</option>
    <option value="Critical">Critical</option>
</select>
    <button
    style={buttonStyle}
    onClick={handleSearch}
>
    Search
</button>
<button
    style={{
        ...buttonStyle,
        backgroundColor: "#6B7280"
    }}
    onClick={() => {

    setSearchTitle("");

    setStatusFilter("All");

    setPriorityFilter("All");

    setSortBy("Newest");

    fetchTickets();

}}
>
    Reset
</button>
</div><div
    style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px"
    }}
>

    <h1
        style={{
            color: "#111827",
            margin: 0
        }}
    >
        Tickets
    </h1>

    <button
        onClick={() => setShowCreateModal(true)}
        style={{
            backgroundColor: "#16A34A",
            color: "white",
            border: "none",
            padding: "10px 18px",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "600",
            fontSize: "15px"
        }}
    >
        + Create Ticket
    </button>

</div>


        {
    tickets.length === 0 ? (

        <div
            style={{
                textAlign: "center",
                marginTop: "40px",
                padding: "40px",
                backgroundColor: "white",
                borderRadius: "10px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
            }}
        >
            <h2 style={{ color: "#6B7280" }}>
                No Tickets Found
            </h2>

            <p style={{ color: "#9CA3AF" }}>
                No tickets match your search or filter.
            </p>

        </div>

    ) : (

        <table style={tableStyle}>

            <thead>

                <tr>

                    <th style={headerStyle}>Title</th>
                    <th style={headerStyle}>Status</th>
                    <th style={headerStyle}>Assigned To</th>
                    <th style={headerStyle}>Priority</th>
                    
                    <th style={headerStyle}>Action</th>

                </tr>

            </thead>

            <tbody>

                {
                    tickets.map((ticket) => (

                        <tr key={ticket._id}>

                            <td style={cellStyle}>
                                {ticket.title}
                            </td>

                            <td style={cellStyle}>

                                <span style={getStatusStyle(ticket.status)}>

                                    <span>{getStatusIcon(ticket.status)}</span>

                                    <span>{ticket.status}</span>

                                </span>

                            </td>
                            <td style={cellStyle}>

    {
        ticket.assignedTo
            ? ticket.assignedTo.name
            : "Unassigned"
    }

</td>

                            <td style={cellStyle}>

                                <span style={getPriorityStyle(ticket.priority)}>

                                    {getPriorityIcon(ticket.priority)} {ticket.priority}

                                </span>

                            </td>

                            <td style={cellStyle}>

                              <div
    style={{
        display: "flex",
        gap: "10px"
    }}
>

    <button
    style={buttonStyle}
    onClick={() => fetchTicketDetails(ticket._id)}
>
    View
</button>

    {
(
    profile?.role === "admin" ||

    (
        profile?._id === ticket.createdBy?._id &&
        ticket.status === "Open"
    )

) && (

<button
    style={{
        ...buttonStyle,
        backgroundColor: "#F59E0B"
    }}
    onClick={() => {

        setEditingTicket(ticket);

        setEditTitle(ticket.title);

        setEditDescription(ticket.description);

        setEditPriority(ticket.priority);

        setEditStatus(ticket.status);

        setEditAssignedTo(ticket.assignedTo ? ticket.assignedTo._id : "");

    }}
>
    Edit
</button>

)
}
    {
    profile &&
    profile._id === ticket.assignedTo?._id &&
    ticket.status === "In Progress" && (

        <button
            style={{
                ...buttonStyle,
                backgroundColor: "#16A34A"
            }}
            onClick={() => handleResolveTicket(ticket._id)}
        >
            Resolve
        </button>

    )
}
{
    profile &&
    profile._id === ticket.createdBy?._id &&
    ticket.status === "Resolved" && (

        <button
            style={{
                ...buttonStyle,
                backgroundColor: "#6B7280"
            }}
            onClick={() => handleCloseTicket(ticket._id)}
        >
            Close
        </button>

    )
}
   

    <button
    style={{
        ...buttonStyle,
        backgroundColor: "#DC2626"
    }}
    onClick={() => handleDeleteTicket(ticket._id)}
>
    Delete
</button>

</div>  

                            </td>

                        </tr>

                    ))
                }

            </tbody>

       </table>

    )

}
        

        {selectedTicket && (

    <div
        onClick={() => setSelectedTicket(null)}
        style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}
    >
                

                <div
    onClick={(event) => event.stopPropagation()}
    style={{
        backgroundColor: "white",
        width: "500px",
        padding: "30px",
        borderRadius: "10px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
    }}
>

                    <h2
                        style={{
                            color: "#111827",
                            marginBottom: "20px"
                        }}
                    >
                        Ticket Details
                    </h2>

                    <p>
                        <strong>Title:</strong> {selectedTicket.title}
                    </p>

                    <p>
                        <strong>Status:</strong>{" "}
                        <span style={getStatusStyle(selectedTicket.status)}>
                            <span>{getStatusIcon(selectedTicket.status)}</span>
                            <span>{selectedTicket.status}</span>
                        </span>
                    </p>

                    <p>
                        <strong>Priority:</strong>{" "}
                        <span style={getPriorityStyle(selectedTicket.priority)}>
                            {getPriorityIcon(selectedTicket.priority)} {selectedTicket.priority}
                        </span>
                    </p>

                    <p>
                        <strong>Description:</strong> {selectedTicket.description}
                    </p>
                    <hr style={{ margin: "20px 0" }} />

<h3
    style={{
        color: "#111827",
        marginBottom: "15px"
    }}
>
    Comments
</h3>

{
    comments.length === 0 ? (

        <p>No comments yet.</p>

    ) : (

        comments.map((comment) => (

            <div
                key={comment._id}
                style={{
                    border: "1px solid #E5E7EB",
                    borderRadius: "8px",
                    padding: "10px",
                    marginBottom: "10px",
                    backgroundColor: "#F9FAFB"
                }}
            >

                <strong>
                    {comment.commentedBy?.name}
                </strong>

                <p
                    style={{
                        marginTop: "5px"
                    }}
                >
                    {comment.text}
                </p>

            </div>

        ))

    )
}
<textarea
    placeholder="Write a comment..."

    value={commentText}

    onChange={(e) => setCommentText(e.target.value)}

    rows="3"

    style={{
        width: "100%",
        padding: "10px",
        marginTop: "15px",
        border: "1px solid #D1D5DB",
        borderRadius: "6px",
        resize: "none",
        boxSizing: "border-box"
    }}
/>
<button
    onClick={handleAddComment}

    style={{
        ...buttonStyle,
        marginTop: "10px",
        backgroundColor: "#2563EB"
    }}
>
    Add Comment
</button>
<hr style={{ margin: "20px 0" }} />

<h3
    style={{
        color: "#111827",
        marginBottom: "15px"
    }}
>
    Ticket History
</h3>

{
    selectedTicket.history?.map((item) => (

        <div
            key={item._id}
            style={{
                borderLeft: "3px solid #2563EB",
                paddingLeft: "12px",
                marginBottom: "12px"
            }}
        >

            <strong>{item.action}</strong>

            <br />

            <span
                style={{
                    color: "#6B7280",
                    fontSize: "14px"
                }}
            >
                By {item.performedBy?.name}
            </span>

        </div>

    ))
}

                    <button
                        onClick={() => setSelectedTicket(null)}
                        style={{
                            marginTop: "20px",
                            backgroundColor: "#2563EB",
                            color: "white",
                            border: "none",
                            padding: "10px 20px",
                            borderRadius: "6px",
                            cursor: "pointer",
                            fontWeight: "600"
                        }}
                    >
                        Close
                    </button>

                </div>

            </div>

        )}
        {
editingTicket && (

<div
    onClick={() => setEditingTicket(null)}
    style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }}
>

<div
    onClick={(e) => e.stopPropagation()}
    style={{
        backgroundColor: "white",
        width: "500px",
        padding: "30px",
        borderRadius: "10px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
    }}
>

<h2
    style={{
        color: "#111827",
        marginBottom: "20px"
    }}
>
    Edit Ticket
</h2>

<input
    type="text"
    value={editTitle}
    onChange={(e) => setEditTitle(e.target.value)}
    style={{
        width: "100%",
        padding: "10px",
        marginBottom: "20px",
        border: "1px solid #ccc",
        borderRadius: "6px",
        boxSizing: "border-box"
    }}
/>

<textarea
    value={editDescription}
    onChange={(e) => setEditDescription(e.target.value)}
    
    rows="5"
    style={{
        width: "100%",
        padding: "10px",
        marginBottom: "20px",
        border: "1px solid #ccc",
        borderRadius: "6px",
        resize: "none",
        boxSizing: "border-box"
    }}
/>
<select
    value={editPriority}
    onChange={(e) => setEditPriority(e.target.value)}
    style={{
        width: "100%",
        padding: "10px",
        marginBottom: "20px",
        border: "1px solid #ccc",
        borderRadius: "6px",
        boxSizing: "border-box"
    }}
>
    <option value="Low">Low</option>
    <option value="Medium">Medium</option>
    <option value="High">High</option>
    <option value="Critical">Critical</option>
</select>

{
    profile?.role === "admin" && (

        <div style={{ marginBottom: "15px" }}>

            <label
                style={{
                    display: "block",
                    marginBottom: "5px",
                    fontWeight: "600",
                    color: "#111827"
                }}
            >
                Status
            </label>

            <select
    value={editStatus}
    onChange={(e) => setEditStatus(e.target.value)}
    style={{
        width: "100%",
        padding: "10px",
        marginBottom: "20px",
        border: "1px solid #ccc",
        borderRadius: "6px",
        boxSizing: "border-box"
    }}
>
    <option value="Open">Open</option>
    <option value="In Progress">In Progress</option>
</select>

        </div>

    )
}
{
    profile?.role === "admin" && (

        <div style={{ marginBottom: "20px" }}>

            <label
                style={{
                    display: "block",
                    marginBottom: "5px",
                    fontWeight: "600",
                    color: "#111827"
                }}
            >
                Assign To
            </label>

            <select
                value={editAssignedTo}
                onChange={(e) => setEditAssignedTo(e.target.value)}
                style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "6px",
                    boxSizing: "border-box"
                }}
            >

                <option value="">Unassigned</option>

                {
                    users.map((user) => (

                        <option
                            key={user._id}
                            value={user._id}
                        >
                            {user.name}
                        </option>

                    ))
                }

            </select>

        </div>

    )
}

<div
    style={{
        display: "flex",
        justifyContent: "flex-end",
        gap: "10px"
    }}
>

<button
    onClick={() => setEditingTicket(null)}
    style={{
        padding: "10px 18px",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer"
    }}
>
    Cancel
</button>

<button
    onClick={handleUpdateTicket}
    style={{
        ...buttonStyle,
        backgroundColor: "#F59E0B"
    }}
>
    {
        profile?.role === "admin"
            ? "Update & Assign"
            : "Update Ticket"
    }
</button>

</div>

</div>

</div>

)
}
{
showCreateModal && (

<div
    onClick={() => setShowCreateModal(false)}
    style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }}
>

<div
    onClick={(e) => e.stopPropagation()}
    style={{
        backgroundColor: "white",
        width: "500px",
        padding: "30px",
        borderRadius: "10px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
    }}
>

<h2
    style={{
        color: "#111827",
        marginBottom: "20px"
    }}
>
    Create Ticket
</h2>

<input
    type="text"
    placeholder="Enter title"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    style={{
        width: "100%",
        padding: "10px",
        marginBottom: "20px",
        border: "1px solid #ccc",
        borderRadius: "6px",
        boxSizing: "border-box"
    }}
/>

<textarea
    placeholder="Enter description"
    value={description}
    onChange={(e) => setDescription(e.target.value)}
    rows="5"
    style={{
        width: "100%",
        padding: "10px",
        marginBottom: "20px",
        border: "1px solid #ccc",
        borderRadius: "6px",
        resize: "none",
        boxSizing: "border-box"
    }}
/>

<select
    value={priority}
    onChange={(e) => setPriority(e.target.value)}
    style={{
        width: "100%",
        padding: "10px",
        marginBottom: "20px",
        border: "1px solid #ccc",
        borderRadius: "6px",
        boxSizing: "border-box"
    }}
>
    <option value="Low">Low</option>
    <option value="Medium">Medium</option>
    <option value="High">High</option>
    <option value="Critical">Critical</option>
</select>

<div
    style={{
        display: "flex",
        justifyContent: "flex-end",
        gap: "10px"
    }}
>

<button
    onClick={() => setShowCreateModal(false)}
    style={{
        padding: "10px 18px",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer"
    }}
>
    Cancel
</button>

<button
    onClick={handleCreateTicket}
    style={{
        ...buttonStyle,
        backgroundColor: "#16A34A"
    }}
>
    Create Ticket
</button>

</div>

</div>

</div>

)
}



</div>

);

}

export default Tickets;