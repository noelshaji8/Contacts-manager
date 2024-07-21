const mongoose = require("mongoose")
const Schema = mongoose.Schema

//SCHEMA AND MODEL FOR CONTACTS COLLECTION
//STORES INFO IN DB

const contactSchema = new Schema({
    uid: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    phone_no: {
        type: String,
        required: true,
        unique: true
    },
    alt_phone_no: {
        type: String,
        unique: true        
    },
    email: {
        type: String,
        unique: true
    },
    address: {
        type: String
    },
    group: {
        type: String
    }
}, { timestamps: true })

const Contact = mongoose.model("Contact", contactSchema)

module.exports = Contact