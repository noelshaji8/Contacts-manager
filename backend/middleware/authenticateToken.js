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
        jwt.verify(token, accessSecret, (err, user) => {
            if (err) { return res.status(403).send("Token invalid. Please login with proper credentials") }
            req.user = user
        })
        next()
    } catch (err) {
        res.clearCookie("token")
    }


}

module.exports = authenticateToken;