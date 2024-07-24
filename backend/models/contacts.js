const mongoose = require("mongoose")
const Schema = mongoose.Schema

//SCHEMA AND MODEL FOR CONTACTS COLLECTION
//STORES INFO IN DB

const contactSchema = new Schema({
    uid: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    phone_no: {
        type: String,
        required: true,
    },
    alt_phone_no: {
        type: String,
    },
    email: {
        type: String,
    },
    address: {
        type: String,
    },
    company: {
        type: String,
    }
}, { timestamps: true })

contactSchema.index({ uid: 1, name: 1 }, { unique: true });
const Contact = mongoose.model("Contact", contactSchema)

module.exports = Contact