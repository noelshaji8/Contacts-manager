const express = require("express")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const User = require("../models/user");

const signUp = async (req, res) => {

    if ((req.body.username) && (req.body.password)) {
        try {
            //PASSWORD ENCODED
            const salt = await bcrypt.genSalt()
            const hashPassword = await bcrypt.hash(req.body.password, salt)
            const uid = Math.floor(Math.random() * 1000)
            const user = new User({
                uid: uid,
                username: req.body.username,
                password: hashPassword,
            })
            user.save()
                .then((result) => {
                    res.send(result);
                    console.log(result)
                })
                .catch(() => { res.status(400).send("User exists"); })
        } catch (error) {
            res.status(500).send(error)
        }
    }
    else {
        res.status(500).send("Invalid input")
    }
}

const logIn = async (req, res) => {

    const accessSecret = process.env.ACCESS_SECRET

    if ((req.body.username) && (req.body.password)) {
        const checkFunction = (user) => {
            if (user["username"] === req.body["username"]) {
                return user
            }
        }

        const users = await User.find()
        const requiredUser = users.find(checkFunction)

        if (requiredUser == null) {
            return res.status(400).send("User does not exist")
        }

        try {
            if (await bcrypt.compare(req.body["password"], requiredUser.password)) {
                console.log("successful login")
            }
            else {
                return res.status(404).send("Incorrect credentials")
            }
        } catch (err) {
            return res.status(500).send("Invalid input")
        }

        //TOKEN GENERATION & SET AS COOKIE

        const tokenUser = { username: requiredUser.username, password: requiredUser.password, uid: requiredUser.uid }
        const userjwt = tokenUser
        const accessToken = jwt.sign(userjwt, accessSecret)
        res.cookie("token", accessToken)
        return res.send({ accessToken: accessToken, requiredUser: requiredUser })

    }
    else {
        res.status(500).send("Invalid input")
    }
}


module.exports = {
    signUp, logIn
}