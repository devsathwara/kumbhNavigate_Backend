//Write Events mongoose model field include name,date,time,decription, imagePath
const mongoose =require('mongoose');
const Schema = mongoose.Schema;
const eventSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    date: {
        type:String,
        required: true,
    },
    time:{
        type:String,
        required: true,
    },
    description:{
        type:String,
        required: true,
    },
    imagePath:{
        type:String,
        required: true,
    }
});
module.exports = mongoose.model('Events', eventSchema);