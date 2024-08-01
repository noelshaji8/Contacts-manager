const mongoose = require("mongoose")
const Schema = mongoose.Schema

//SCHEMA AND MODEL FOR USER COLLECTION
//STORES USERNAME AND PASSWORD IN DB & ASSIGNS AN UNIQUE ID TO EACH

const userSchema = new Schema({
    uid: {
        type: Number,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone_no: {
        type: String,
        default:""
    },
    alt_phone_no: {
        type: String,
        default:""
    },
    email: {
        type: String,
        default:""
    },
    address: {
        type: String,
        default:""
    },
    company: {
        type: String,
        default:""
    },
    gender: {
        type: String,
        default:""
    },
    dob: {
        type: String,
        default:""
    },
    pfp: {
        type: String,
        default:""
    },


}, { timestamps: true })

const User = mongoose.model("User", userSchema)

module.exports = User
