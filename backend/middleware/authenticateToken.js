const jwt = require("jsonwebtoken")

function authenticateToken(req, res, next) {

    const accessSecret = process.env.ACCESS_SECRET
    console.log(accessSecret)

     //TOKEN READ FROM COOKIES
    const token = req.cookies.token;
    if (token == null) {
        return res.status(400).send("no token")
    }
    try {

        // Verify the token using the access secret
        jwt.verify(token, accessSecret, (err, user) => {
            if (err) {

                // If the token is invalid, return a 403 status with a message
                return res.status(403).send("Token invalid. Please login with proper credentials")
            }
            
            // Add the user object to the request
            req.user = user
        })
        next()
    } catch (err) {
        res.clearCookie("token")
    }

}

module.exports = authenticateToken;