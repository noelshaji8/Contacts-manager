const express = require("express")
const authRoutes = require("./routes/authRoutes")
const authenticateToken = require("./middleware/authenticateToken")
const mongoose = require("mongoose")
const crudRoutes = require("./routes/crudRoutes")
const cookieParser = require("cookie-parser");
const cors = require("cors")

const corsOptions = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
}

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors(corsOptions));
app.use(cookieParser());


const dbUrl = 'mongodb+srv://noelshaji:987654321@practice-mongodb.vuoqpkx.mongodb.net/contacts-app?retryWrites=true&w=majority&appName=practice-mongodb'

//CONNECT TO MONGO DB
mongoose.connect(dbUrl)
    .then((result) => {
        app.listen(4000, function () {
            console.log("Server is running & Connected to Database!")
        })
    })
    .catch((err) => { console.log(err) })

app.use(authRoutes)

app.use(authenticateToken)  //JWT AUTHENTICATION MIDDLEWARE RUNS BEFORE EVERY REQUEST

app.use(crudRoutes)


