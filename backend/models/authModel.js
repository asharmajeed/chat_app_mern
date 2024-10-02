const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema;

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    gender: {
        type: String,
        required: true,
        enum: ["male", "female"]
    },
    profilePic: {
        type: String,
        default: ""
    }
}, { timestamps: true })

// static signup method
userSchema.statics.signup = async function (fullName, username, password, gender) {

    const exists = await this.findOne({ username })

    if (exists) {
        throw Error('Username already exists')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

    const user = await this.create({
        fullName,
        username,
        password: hash,
        gender,
        profilePic: gender == "male" ? boyProfilePic : girlProfilePic
    })

    return user
}

// static login methon
userSchema.statics.login = async function (username, password) {

    const user = await this.findOne({ username })

    if (!user) {
        throw Error('Invalid username or password')
    }
    
    const match = await bcrypt.compare(password, user.password)
    
    if (!match) {
        throw Error('Invalid username or password')
    }

    return user
}

// model
const User = mongoose.model('User', userSchema)

module.exports = User