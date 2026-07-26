require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");
const ticketRoutes = require("./routes/ticketRoutes");

const app = express();

connectDB();

app.use(express.json());

app.use(userRoutes);
app.use(ticketRoutes);

app.get("/", (req, res) => {
    res.send("Welcome to IT Help Desk Ticketing System");
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});