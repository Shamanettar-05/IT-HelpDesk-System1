const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const registerUser = async (req, res) => {

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    if (!name || !email || !password) {
        return res.status(400).send("Please provide all the details.");
    }

    try {

        const existingUser = await User.findOne({
            email: email
        });

        if (existingUser) {
            return res.status(400).send("Email already exists.");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name: name,
            email: email,
            password: hashedPassword
        });

        await user.save();

        res.status(200).send("User saved successfully.");

    } catch (error) {

    console.error(error);

    return res.status(500).json({
        message: "Internal Server Error"
    });

}

};

const loginUser = async (req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    try {

        const user = await User.findOne({
            email: email
        });

        if (!user) {
            return res.status(404).send("User not found.");
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(401).send("Invalid password.");
        }

        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET
        );

        res.json({
            message: "Login successful.",
            token: token
        });

    } catch (error) {

    console.error(error);

    return res.status(500).json({
        message: "Internal Server Error"
    });

}

};
const getProfile = async (req, res) => {

    try {

        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(404).send("User not found.");
        }

        res.json(user);

    } catch (error) {

    console.error(error);

    return res.status(500).json({
        message: "Internal Server Error"
    });

}

};
const getAllUsers = async (req, res) => {

    if (req.user.role !== "admin") {
        return res.status(403).send("Only Admin can access this.");
    }

    try {

        const users = await User.find().select("-password");

        res.json(users);

    } catch (error) {

    console.error(error);

    return res.status(500).json({
        message: "Internal Server Error"
    });

}

};
module.exports = {
    registerUser,
    loginUser,
    getProfile,
    getAllUsers
};