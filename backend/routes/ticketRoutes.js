const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
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
} = require("../controllers/ticketController");

router.post("/ticket", authMiddleware, createTicket);
router.get("/tickets", authMiddleware, getAllTickets);
router.get("/mytickets", authMiddleware, getMyTickets);
router.get(
    "/assignedtickets",
    authMiddleware,
    getAssignedTickets
);
router.get("/ticket/:id", authMiddleware, getTicketById);
router.put("/ticket/:id", authMiddleware, updateTicket);
router.put("/ticket/:id/assign", authMiddleware, assignTicket);
router.put("/ticket/:id/resolve", authMiddleware, resolveTicket);
router.put("/ticket/:id/close", authMiddleware, closeTicket);
router.delete("/ticket/:id", authMiddleware, deleteTicket);
router.get("/dashboard", authMiddleware, getDashboard);
router.get(
    "/tickets/search",
    authMiddleware,
    searchTickets
);
router.get(
    "/prioritystats",
    authMiddleware,
    getPriorityStats
);
router.get(
    "/statusstats",
    authMiddleware,
    getStatusStats
);
router.get(
    "/recenttickets",
    authMiddleware,
    getRecentTickets
);
router.post(
    "/ticket/:id/comment",
    authMiddleware,
    addComment
);
module.exports = router;