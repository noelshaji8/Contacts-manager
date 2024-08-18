const Contact = require("../models/contacts")
const User = require("../models/user");


/**
 * This function creates a new contact and saves it to the database.
 */
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

/**
 * This function retrieves all contacts associated with the user.
 */
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

/**
 * This function updates a contact in the database.
 */
const updateContact = (req, res) => {

    Contact.findOneAndUpdate({ _id: req.body._id, uid: req.user.uid }, req.body, { new: true })
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            res.send(err)
        })
}

/**
 * This function deletes a contact from the database.
 */
const deleteContact = (req, res) => {

    Contact.deleteOne({ _id: req.body._id, uid: req.user.uid })
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            res.send(err)
        })
}

/**
 * This function updates user information in the database.
 */
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
    updateContact,
    deleteContact,
    updateUserInfo
}