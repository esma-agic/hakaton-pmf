const express = require('express')

const path = require('path')
const http = require('http')
const app = express()
const server = http.createServer(app)
const chatSocket = require('./controllers/sockets');
const chatRouter = require('./routes/chatRoutes')


// Upotreba dotenv za cuvanje podataka - link za bazu
require('dotenv').config()

// Konekcija na bazu
const mongoose = require('mongoose')
mongoose.connect(process.env.mongo_url)


app.use(express.static('public'));


app.use(express.urlencoded({extended:false}))
app.use(express.json())




const authRoutes = require('./routes/authRoutes')
const studentRoutes = require('./routes/studentRoutes')
const postRoutes = require('./routes/postRoutes')

// session
const session = require('express-session')

const MongoDBSession = require('connect-mongodb-session')(session)





app.set('view engine', 'ejs')
const store = new MongoDBSession({
    uri: process.env.mongo_url,
    collection: 'mySession'
})

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'my key',
    resave: false,
    saveUninitialized: true,
    store: store
}))



app.use('/', authRoutes)

const isAuth = (req,res,next)=>{
    if(req.session.isAuth) next()
    else {

        res.send(`<h1>Nemate pristup, <a href="/">idi na login</a></h1>`)
    }
}

app.use(isAuth)

app.use('/student', studentRoutes)
app.use('/post', postRoutes)
app.use('/inbox', chatRouter)

chatSocket(server)


server.listen(3000, ()=>console.log('spojeno '))