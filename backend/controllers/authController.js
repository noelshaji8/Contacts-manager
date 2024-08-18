const express = require("express")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const User = require("../models/user");

/**
 * Sign up a user by hashing the password and saving the user to the database.
 */
const signUp = async (req, res) => {

    // Check if the request body contains a username and password
    if ((req.body.username) && (req.body.password)) {
        try {
            // Generate a salt and hash the password
            const salt = await bcrypt.genSalt();
            const hashPassword = await bcrypt.hash(req.body.password, salt);
            const uid = Math.floor(Math.random() * 1000);

            // Create a new user object
            const user = new User({
                uid: uid,
                username: req.body.username,
                password: hashPassword,
            });

            // Save the user to the database
            user.save()
                .then((result) => {
                    res.send(result);
                    console.log(result);
                })
                .catch(() => {
                    res.status(400).send("User exists");
                });
        } catch (error) {
            res.status(500).send(error);
        }
    } else {
        res.status(500).send("Enter username & password");
    }
};

/**
 * Log in a user by comparing the provided password with the stored password hash.
 */
const logIn = async (req, res) => {
    // Get the access secret from the environment variables
    const accessSecret = process.env.ACCESS_SECRET;

    // Check if the request body contains a username and password
    if ((req.body.username) && (req.body.password)) {
        const checkFunction = (user) => {
            if (user["username"] === req.body["username"]) {
                return user;
            }
        };

        // Find the user with the provided username in the database
        const users = await User.find();
        const requiredUser = users.find(checkFunction);

        if (requiredUser == null) {
            return res.status(400).send("User does not exist");
        }

        try {
            // Compare the provided password with the stored password hash
            if (await bcrypt.compare(req.body["password"], requiredUser.password)) {
                console.log("successful login");
            } else {
                return res.status(404).send("Incorrect credentials");
            }
        } catch (err) {
            return res.status(500).send("Invalid input");
        }

        // Generate a JWT token for the user
        const tokenUser = { username: requiredUser.username, password: requiredUser.password, uid: requiredUser.uid };
        const userjwt = tokenUser;
        const accessToken = jwt.sign(userjwt, accessSecret);

        // Set the token as a cookie in the response
        res.cookie("token", accessToken);

        // Send the access token and user data in the response
        return res.send({ accessToken: accessToken, requiredUser: requiredUser });

    } else {
        // If the request body is missing a username or password, send a 500 status code with an error message
        return res.status(500).send("Invalid input");
    }
};

/**
 * Log out the user by clearing the token cookie and sending a success response.
 */
const logOut = async (req, res) => {

    // Clear the token cookie
    res.clearCookie("token");

    // Send a success response
    res.status(200).json({ success: true, message: 'User logged out successfully' });
};


module.exports = {
    signUp, logIn, logOut
}