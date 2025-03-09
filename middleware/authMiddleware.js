const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.header("Authorization");
    console.log("Received Authorization Header:", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        console.log("Access Denied: No valid token format.");
        return res.status(401).json({ message: "Access Denied" });
    }

    const token = authHeader.split(" ")[1];
    console.log("Extracted Token:", token);

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.log("Invalid Token:", error.message);
        return res.status(401).json({ message: "Invalid Token" });
    }
};

module.exports = authMiddleware;
