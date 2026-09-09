const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
    try {
        // 1. Get token from cookie
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: "Please login"
            });
        }

        // 2. Verify JWT
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // 3. Find user
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(401).json({
                message: "User not found"
            });
        }

        // 4. Attach user to request
        req.user = user;

        // 5. Continue to next middleware/controller
        next();

    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};

module.exports = authMiddleware;