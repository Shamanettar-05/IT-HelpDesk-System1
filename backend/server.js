require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");
const ticketRoutes = require("./routes/ticketRoutes");

const app = express();

connectDB();

app.use(express.json());
app.use(cors());
app.use(userRoutes);
app.use(ticketRoutes);

app.get("/", (req, res) => {
    res.send("Welcome to IT Help Desk Ticketing System");
});
const jwt = require("jsonwebtoken");

app.get("/testjwt", (req, res) => {

    const token = jwt.sign(
        {
            name: "Test User"
        },
        process.env.JWT_SECRET
    );

    try {

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        res.json({
            token,
            decoded
        });

    } catch (error) {

        res.json(error);

    }

});


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});