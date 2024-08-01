const express = require("express")
const authRoutes = require("./routes/authRoutes")
const authenticateToken = require("./middleware/authenticateToken")
const mongoose = require("mongoose")
const crudRoutes = require("./routes/crudRoutes")
const cookieParser = require("cookie-parser");
const cors = require("cors")
const dotenv = require('dotenv');

dotenv.config();

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
}

const app = express()
app.use(express.json({limit:'50mb'}))
app.use(express.urlencoded({ extended: true }))
app.use(cors(corsOptions));
app.use(cookieParser());

//CONNECT TO MONGO DB
mongoose.connect(process.env.DB_URL)
    .then((result) => {
        app.listen(process.env.PORT, function () {
            console.log("Server is running & Connected to Database!")
        })
    })
    .catch((err) => { console.log(err) })

app.use(authRoutes)

app.use(authenticateToken)  //JWT AUTHENTICATION MIDDLEWARE RUNS BEFORE EVERY REQUEST

app.use(crudRoutes)


