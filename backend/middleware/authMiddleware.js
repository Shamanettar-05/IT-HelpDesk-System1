const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            message: "Access Denied. No token provided."
        });
    }

    if (!authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "Invalid Authorization Header."
        });
    }

    const token = authHeader.replace("Bearer ", "");

    try {

        const decoded = jwt.verify(
            token.trim(),
            process.env.JWT_SECRET
        );

        req.user = decoded;

        next();

    } catch (error) {

   

    return res.status(401).json({
        error: error.name,
        message: error.message
    });

}

};

module.exports = authMiddleware;