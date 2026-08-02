const Ticket = require("../models/Ticket");

const createTicket = async (req, res) => {

    const title = req.body.title;
    const description = req.body.description;
    const priority = req.body.priority;

    if (!title || !description) {
        return res.status(400).send("Please provide title and description.");
    }
    const validPriorities = ["Low", "Medium", "High", "Critical"];

if (priority && !validPriorities.includes(priority)) {
    return res.status(400).send("Invalid priority.");
}

    try {

        const ticket = new Ticket({

    title: title,

    description: description,

    priority: priority,

    createdBy: req.user.id,

    history: [

        {

            action: "Ticket Created",

            performedBy: req.user.id

        }

    ]

});

        await ticket.save();

        res.status(201).send("Ticket created successfully.");

    } catch (error) {

        console.error(error);

return res.status(500).json({
    message: "Internal Server Error"
});
    }

};
const getAllTickets = async (req, res) => {

    const status = req.query.status;
    const sort = req.query.sort;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

const skip = (page - 1) * limit;

    const filter = {};
    let sortOption = { createdAt: -1 };

    if (status) {
        filter.status = status;
    }
    if (sort === "oldest") {
    sortOption = { createdAt: 1 };
}

    try {

        const tickets = await Ticket.find(filter)
    .sort(sortOption)
    .skip(skip)
    .limit(limit)
    .populate("createdBy", "name email")
    .populate("assignedTo", "name email");

        res.status(200).json(tickets);

    } catch (error) {

        console.error(error);

return res.status(500).json({
    message: "Internal Server Error"
});

    }

};
const getMyTickets = async (req, res) => {

    try {

        const tickets = await Ticket.find({
            createdBy: req.user.id
        })
        .populate("createdBy", "name email")
        .populate("assignedTo", "name email");

        res.json(tickets);

    } catch (error) {

        console.error(error);

return res.status(500).json({
    message: "Internal Server Error"
});

    }

};
const getAssignedTickets = async (req, res) => {

    try {

        const tickets = await Ticket.find({
            assignedTo: req.user.id
        })
        .populate("createdBy", "name email")
        .populate("assignedTo", "name email");

        res.json(tickets);

    } catch (error) {

       console.error(error);

return res.status(500).json({
    message: "Internal Server Error"
});
    }

};
const getTicketById = async (req, res) => {

    try {

        const ticketId = req.params.id;

        const ticket = await Ticket.findById(ticketId)
    .populate("createdBy", "name email")
    .populate("assignedTo", "name email")
    .populate("comments.commentedBy", "name email")
    .populate("history.performedBy", "name email");

        if (!ticket) {
            return res.status(404).send("Ticket not found.");
        }

        res.json(ticket);

    } catch (error) {

        console.error(error);

return res.status(500).json({
    message: "Internal Server Error"
});

    }

};
const updateTicket = async (req, res) => {

    const ticketId = req.params.id;

    const { title, description, priority, status, assignedTo } = req.body;

    if (!title || !description) {
        return res.status(400).send("Please provide title and description.");
    }

    const validPriorities = ["Low", "Medium", "High", "Critical"];

    if (!validPriorities.includes(priority)) {
        return res.status(400).send("Invalid priority.");
    }
    const validStatuses = ["Open", "In Progress", "Resolved", "Closed"];

if (!validStatuses.includes(status)) {
    return res.status(400).send("Invalid status.");
}

    try {

        const ticket = await Ticket.findById(ticketId);

        if (!ticket) {
            return res.status(404).send("Ticket not found.");
        }

        if (
    ticket.createdBy.toString() !== req.user.id &&
    req.user.role !== "admin"
) {
    return res.status(403).send("You are not authorized to update this ticket.");
}

       ticket.title = title;
ticket.description = description;
ticket.priority = priority;

if (req.user.role === "admin") {
    const oldAssignedTo = ticket.assignedTo
    ? ticket.assignedTo.toString()
    : null;
    ticket.assignedTo = assignedTo;
    if (assignedTo && assignedTo !== oldAssignedTo) {

    ticket.history.push({

        action: "Ticket Assigned",

        performedBy: req.user.id

    });

}
    if (assignedTo && ticket.status === "Open") {

        ticket.status = "In Progress";

    } else {

        ticket.status = status;

    }

}
   
        await ticket.save();

        res.json(ticket);

    } catch (error) {
        console.error(error);

return res.status(500).json({
    message: "Internal Server Error"
});


    }

};

const assignTicket = async (req, res) => {

    const ticketId = req.params.id;
    const assignedTo = req.body.assignedTo;
    if (!assignedTo) {
        return res.status(400).send("Please provide the user ID to assign the ticket.");
    }

    if (req.user.role !== "admin") {
        return res.status(403).send("Only Admin can assign tickets.");
    }

   try {

    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
        return res.status(404).send("Ticket not found.");
    }

    ticket.assignedTo = assignedTo;

    ticket.status = "In Progress";

    ticket.history.push({

        action: "Ticket Assigned",

        performedBy: req.user.id

    });

    await ticket.save();

    const updatedTicket = await Ticket.findById(ticketId)
        .populate("createdBy", "name email")
        .populate("assignedTo", "name email");

    res.json(updatedTicket);

} catch (error) {
    console.error(error);

return res.status(500).json({
    message: "Internal Server Error"
});

   

}

};
const addComment = async (req, res) => {

    const ticketId = req.params.id;

    const text = req.body.text;
    if (!text || text.trim() === "") {
    return res.status(400).send("Comment cannot be empty.");
}

    try {

        const ticket = await Ticket.findById(ticketId);

        if (!ticket) {

            return res.status(404).send("Ticket not found.");

        }

        ticket.comments.push({

            text: text,

            commentedBy: req.user.id

        });
        ticket.history.push({

    action: "Comment Added",

    performedBy: req.user.id

});

        await ticket.save();

        const updatedTicket = await Ticket.findById(ticketId)
            .populate("createdBy", "name email")
            .populate("assignedTo", "name email")
            .populate("comments.commentedBy", "name email");

        res.json(updatedTicket);

    } catch (error) {

        console.error(error);

return res.status(500).json({
    message: "Internal Server Error"
});

    }

};
const resolveTicket = async (req, res) => {

    const ticketId = req.params.id;

    try {

    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
        return res.status(404).send("Ticket not found.");
    }

    if (ticket.assignedTo.toString() !== req.user.id) {
        return res.status(403).send("Only the assigned engineer can resolve this ticket.");
    }

    ticket.status = "Resolved";

    ticket.history.push({

        action: "Ticket Resolved",

        performedBy: req.user.id

    });

    await ticket.save();

    const updatedTicket = await Ticket.findById(ticketId)
        .populate("createdBy", "name email")
        .populate("assignedTo", "name email");

    res.json(updatedTicket);

} catch (error) {

    console.error(error);

return res.status(500).json({
    message: "Internal Server Error"
});
}


};
const closeTicket = async (req, res) => {

    const ticketId = req.params.id;

    try {

    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
        return res.status(404).send("Ticket not found.");
    }

    if (ticket.createdBy.toString() !== req.user.id) {
        return res.status(403).send("Only the ticket creator can close this ticket.");
    }

    if (ticket.status !== "Resolved") {
        return res.status(400).send("Ticket must be Resolved before it can be Closed.");
    }

    ticket.status = "Closed";

    ticket.history.push({

        action: "Ticket Closed",

        performedBy: req.user.id

    });

    await ticket.save();

    const updatedTicket = await Ticket.findById(ticketId)
        .populate("createdBy", "name email")
        .populate("assignedTo", "name email");

    res.json(updatedTicket);

} catch (error) {
    console.error(error);

return res.status(500).json({
    message: "Internal Server Error"
});

}

};
const deleteTicket = async (req, res) => {

    try {

        const ticketId = req.params.id;

        const ticket = await Ticket.findById(ticketId);

        if (!ticket) {
            return res.status(404).send("Ticket not found.");
        }

        if (ticket.createdBy.toString() !== req.user.id) {
            return res.status(403).send("You are not authorized to delete this ticket.");
        }

        const deletedTicket = await Ticket.findByIdAndDelete(ticketId);

        res.status(200).json(deletedTicket);

    } catch (error) {

        console.error(error);

return res.status(500).json({
    message: "Internal Server Error"
});

    }

};
const getDashboard = async (req, res) => {
   
    try {

        const totalTickets = await Ticket.countDocuments();

        const openTickets = await Ticket.countDocuments({
            status: "Open"
        });

        const closedTickets = await Ticket.countDocuments({
            status: "Closed"
        });

        const inProgressTickets = await Ticket.countDocuments({
            status: "In Progress"
        });

        const resolvedTickets = await Ticket.countDocuments({
            status: "Resolved"
        });
        const lowPriorityTickets = await Ticket.countDocuments({
    priority: "Low"
});

const mediumPriorityTickets = await Ticket.countDocuments({
    priority: "Medium"
});

const highPriorityTickets = await Ticket.countDocuments({
    priority: "High"
});
const ticketsCreatedByMe = await Ticket.countDocuments({
    createdBy: req.user.id
});

const ticketsAssignedToMe = await Ticket.countDocuments({
    assignedTo: req.user.id
});

const criticalPriorityTickets = await Ticket.countDocuments({
    priority: "Critical"
});

      res.json({
    totalTickets,
    openTickets,
    inProgressTickets,
    resolvedTickets,
    closedTickets,

    lowPriorityTickets,
    mediumPriorityTickets,
    highPriorityTickets,
    criticalPriorityTickets,

    ticketsCreatedByMe,
    ticketsAssignedToMe
});

    } catch (error) {
        console.error(error);

return res.status(500).json({
    message: "Internal Server Error"
});

    }

};

const getPriorityStats = async (req, res) => {

    try {

        const stats = await Ticket.aggregate([

            {
                $group: {
                    _id: "$priority",
                    count: { $sum: 1 }
                }
            }

        ]);

        res.json(stats);

    } catch (error) {

        console.error(error);

return res.status(500).json({
    message: "Internal Server Error"
});

    }

};
const getStatusStats = async (req, res) => {

    try {

        const stats = await Ticket.aggregate([

            {
                $group: {

                    _id: "$status",

                    count: { $sum: 1 }

                }

            }

        ]);

        res.json(stats);

    } catch (error) {

        console.error(error);

return res.status(500).json({
    message: "Internal Server Error"
});

    }

};
const getRecentTickets = async (req, res) => {

    try {

        const tickets = await Ticket.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .populate("createdBy", "name email")
            .populate("assignedTo", "name email");

        res.json(tickets);

    } catch (error) {

        console.error(error);

return res.status(500).json({
    message: "Internal Server Error"
});

    }

};
const searchTickets = async (req, res) => {

    const title = req.query.title;

    const status = req.query.status;
    const priority = req.query.priority;

    try {

        let query = {

            title: {
                $regex: title,
                $options: "i"
            }

        };

        if (status && status !== "All") {

            query.status = status;

        }

        if (priority && priority !== "All") {

    query.priority = priority;

}
       

        const sort = req.query.sort;

let sortOption = {};

if (sort === "Newest") {

    sortOption = { createdAt: -1 };

}
else if (sort === "Oldest") {

    sortOption = { createdAt: 1 };

}


const tickets = await Ticket.find(query)
    .populate("createdBy", "name email")
    .populate("assignedTo", "name email")
    .sort(sortOption);

const priorityOrder = {
    Low: 1,
    Medium: 2,
    High: 3,
    Critical: 4
};

if (sort === "HighPriority") {

    tickets.sort(
        (a, b) =>
            priorityOrder[b.priority] - priorityOrder[a.priority]
    );

}

if (sort === "LowPriority") {

    tickets.sort(
        (a, b) =>
            priorityOrder[a.priority] - priorityOrder[b.priority]
    );

}

        res.json(tickets);

    } catch (error) {

    console.error(error);

    res.status(500).json({
        message: "Internal Server Error"
    });

}

};
module.exports = {

    createTicket,
    getAllTickets,
    getMyTickets,
    getAssignedTickets,
    getTicketById,
    updateTicket,
    assignTicket,
    resolveTicket,
    closeTicket,
    deleteTicket,
    getDashboard,
    getPriorityStats,
    getStatusStats, 
    getRecentTickets,
    searchTickets,
    addComment
};