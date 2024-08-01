const Contact = require("../models/contacts")
const User = require("../models/user");

const createContact = (req, res) => {
    const contact = new Contact({
        uid: req.user.uid,
        name: req.body.name,
        phone_no: req.body.phone_no,
        alt_phone_no: req.body.alt_phone_no,
        email: req.body.email,
        address: req.body.address,
        company: req.body.company,
        pfp: req.body.pfp
    })
    contact.save()
        .then((result) => { res.send(result) })
        .catch((error) => { res.status(400).send(error) })
}

const readContacts = (req, res) => {
    Contact.find({
        uid: { $eq: req.user.uid }
    })
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            res.send(err)
        })
}

const searchContact = (req, res) => {
    Contact.find({
        name: { $eq: req.body.name }
    })
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            res.send(err)
        })
}

const updateContact = (req, res) => {

    Contact.findOneAndUpdate({ _id: req.body._id, uid: req.user.uid }, req.body, { new: true })
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            res.send(err)
        })
}

const deleteContact = (req, res) => {

    Contact.deleteOne({ _id: req.body._id, uid: req.user.uid })
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            res.send(err)
        })
}

const updateUserInfo = (req, res) => {
    User.findOneAndUpdate({ _id: req.body._id, uid: req.user.uid }, req.body, { new: true })
    .then((result) => {
        res.send(result)        
    })
    .catch((err) => {
        res.send(err)       
    })
}

module.exports = {
    createContact,
    readContacts,
    searchContact,
    updateContact,
    deleteContact,
    updateUserInfo
}