const jwt = require("jsonwebtoken")

function authenticateToken(req, res, next) {

    const accessSecret = "8d245805079f46dd71f9a436adab2153456cd759f2463841e647c1dbf669a18e5119b4131780fd47c7a26eaceecba249a189150615b235353e43a11a4434eafb"

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