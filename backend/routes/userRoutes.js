const express = require("express");

const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const {
    registerUser,
    loginUser,
    getProfile,
    getAllUsers
} = require("../controllers/userController");

router.post("/user", registerUser);

router.post("/login", loginUser);
router.get("/profile", authMiddleware, getProfile);
router.get("/users", authMiddleware, getAllUsers);
module.exports = router;