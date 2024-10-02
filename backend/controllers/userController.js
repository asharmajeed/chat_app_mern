const User = require("../models/authModel")

const getUserForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId}}).select('-password')
        res.status(200).json(filteredUsers)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = getUserForSidebar