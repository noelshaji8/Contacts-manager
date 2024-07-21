const express = require("express")
const router = express.Router()
const contactController = require("../controllers/contactController")

router.post("/create", contactController.createContact)

router.post("/read", contactController.readContacts)

router.post("/search/read", contactController.searchContact)

router.patch("/update", contactController.updateContact)

router.delete("/delete", contactController.deleteContact)

module.exports = router