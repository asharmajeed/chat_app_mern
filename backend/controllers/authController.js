const User = require('../models/authModel')
const generateTokenAndSetCookie = require('../utils/generateToken')

// login user
const loginUser = async (req, res) => {
    const { username, password } = req.body

    try {
        const user = await User.login(username, password)
        await generateTokenAndSetCookie(user._id, res)
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic,
        })
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// signup user
const signupUser = async (req, res) => {
    const { fullName, username, password, confirmPassword, gender } = req.body

    if (password !== confirmPassword) {
        return res.status(400).json({error: "Passwords don't match"})
    }

    try {
        const user = await User.signup(fullName, username, password, gender)
        await generateTokenAndSetCookie(user._id, res)
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic,
        })
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const logoutUser = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 })
        res.status(200).json({message: "Loged out successfully!"})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


module.exports = { loginUser, signupUser, logoutUser }