const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo').default;
const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('./config/db');


const authRoutes = require('./routes/authRoutes');
const noteRoutes = require('./routes/noteRoutes');


dotenv.config();
connectDB();


const app = express();


app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));


app.use(session({
    secret: 'notebook_secret_key',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: { maxAge: 1000 * 60 * 60 }
}));


app.use('/api', authRoutes);
app.use('/api', noteRoutes);


app.get('/', (req, res) => {
    if (!req.session.userId) return res.redirect('/login.html');
    res.sendFile(path.join(__dirname, '../public/index.html'));
});


module.exports = app;