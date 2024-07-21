const express = require("express")
const router = express.Router()
const authController = require("../controllers/authController")

//SIGNUP USERS & CREATE USER IN DB
router.post("/signup", authController.signUp );

//LOGIN USERS
router.post("/login", authController.logIn )

module.exports = router