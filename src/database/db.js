//write below two line using require
const mongoose =require('mongoose');
const {config} =require('../config/config');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(config.env.database.mongoURL).then(()=>{
            console.log('Connected to MongoDB');
        });
        return conn;
    } catch (err) {
        console.error(err.message);
        // Exit process with failure
        process.exit(1);
    }
};
module.exports = connectDB;