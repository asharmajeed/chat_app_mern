const { default: mongoose } = require("mongoose");

const connectToMongoDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Connected to Mongo Db');
    } catch (error) {
        console.log('Error connecting to mongo db', error.message);
    }
}

module.exports = connectToMongoDb()