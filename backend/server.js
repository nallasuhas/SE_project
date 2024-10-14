require("dotenv").config()
const express = require("express")
const app = express()
const ejs = require('ejs')
const path = require('path')
const mongoose = require('mongoose')
const expressLayout = require('express-ejs-layouts')
const session = require('express-session')
const flash = require('express-flash')
const passport = require('passport')
const Emitter = require('events')
const MongoDbStore = require('connect-mongo')
const router = require('./routes/web.js')




const PORT = process.env.PORT || 3000

 const connectDB = async () => {
    try{
         const con =  await mongoose.connect(process.env.MONGO_URL_SESSIONS)
         console.log("mongodb connected");
         
    }
    catch(e){
        console.log("error connecting to mongodb:" + e.message);
    }
}

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())


app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoDbStore({
        mongoUrl: process.env.MONGO_URL_SESSIONS
    }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 }

}))

const passportInit = require('./Auth/passport.js')
passportInit(passport)
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

app.use((req, res, next) => {
    res.locals.session = req.session
    res.locals.user = req.user
    next()
})

app.use(expressLayout)
app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'ejs')

app.use('/', router)
app.listen(PORT, () => {
    connectDB()
    console.log("server started at:", PORT);
})