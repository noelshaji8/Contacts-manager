const express = require("express")
const router = express.Router()
const authController = require("../controllers/authController");
const authenticateToken = require("../middleware/authenticateToken");

//SIGNUP USERS & CREATE USER IN DB
router.post("/signup", authController.signUp );

router.post("/login", authController.logIn )

router.get("/logout", authenticateToken, authController.logOut )

module.exports = router