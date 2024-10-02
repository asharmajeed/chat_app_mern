const jwt = require("jsonwebtoken")
const User = require("../models/authModel")

const requireAuth = async (req, res, next) => {
    try {
        const token = req.cookies.jwt

        if (!token) {
            return res.status(401).json({error: 'Authorization token required'})
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

		if (!decoded) {
			return res.status(401).json({ error: "Unauthorized - Invalid Token" });
		}

		const user = await User.findById(decoded.userId).select("_id");

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		req.user = user;

        next()
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

module.exports = requireAuth