const express = require("express");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo").default;
const path = require("path");
const Note = require("./model/Note");
const User = require("./model/User");

const app = express();
const PORT = 3000;

mongoose.connect("mongodb://127.0.0.1:27017/notebook_app")
.then(() => console.log("MongoDB connected"))
.catch(err => console.error(err));

//middleware

app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

//session management

app.use(session({
    secret: "notebook_secret_key",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: "mongodb://127.0.0.1:27017/notebook_app"
    }),
    cookie: { maxAge: 1000 * 60 * 60 } // 1 hour
}));


function isAuth(req, res, next) {
    if (!req.session.userId) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    next();
}

//register api
app.post("/api/register", async (req, res) =>{
    const { username, email, password } = req.body;
    if(!username || !email || !password){
        return res.status(400).json({ error: "All fields required" });
    }
    try{
        /*
        const hashed = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashed});
        await user.save();
        res.json({ success: true });*/
        const exists = await User.findOne({
            $or: [{ username }, { email }]
        }); 
        if(exists){
            return res.status(400).json({ error: "Username or Email already taken" });
        }
        // Hash password
        const hashed = await bcrypt.hash(password, 10);
        //Save user
        const user = new User({
            username,
            email,
            password: hashed
        });
        await user.save();

        res.json({ success: true });
        
    }catch (err){
        res.status(500).json({ error: "Server error" });
    }
});
//login api
app.post("/api/login", async (req, res) =>{
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if(!user) return res.status(400).json({ error: "Invalid Login" });

    const match = await bcrypt.compare(password, user.password);
    if(!match) return res.status(400).json({ error: "Invalid Login" });

    req.session.userId = user._id;
    res.json({ success: true });
});
//logout api
app.post("/api/logout", (req, res) => {
    req.session.destroy(() => {
        res.json({ success: true });
    });
});
//create api save notes
app.post("/api/save", isAuth, async (req, res) =>{
    const { filename, content } = req.body;

    if(!filename){
        return res.status(400).json({ error: "Filename is required" });
    }
    try{
        const note = await Note.findOneAndUpdate(
            { filename, userId: req.session.userId },
            { content, updatedAt: new Date() },
            { upsert: true, new: true }
        );
        res.json({ success: true, note });
    } catch (err){
        res.status(500).json({ error: "Save failed" });
    }
});
//open notes
app.get("/api/open/:filename", isAuth, async (req, res) =>{
    
    try{
        const note = await Note.findOne({ filename: req.params.filename });

        if (!note) {
            return res.status(404).json({ error: "File not found" });
        }
        res.json({ content: note.content });
    } catch (err){
        res.status(500).json({ error: "Open failed" });
    }
});
//list notes
app.get("/api/list", isAuth, async (req, res) =>{
    
    try {
        const notes = await Note.find({userId: req.session.userId}, "filename");
        res.json(notes.map(n => n.filename));
    } catch (err) {
        res.status(500).json({ error: "List failed" });
    }
});

// DELETE FILE
app.post("/api/delete", isAuth, async (req, res) => {
    
    try {
        await Note.deleteOne({ filename: req.body.filename });
        res.json({ success: true });
    } catch {
        res.status(500).json({ error: "Delete failed" });
    }
});

// RENAME FILE
app.post("/api/rename", isAuth, async (req, res) => {
    const { oldName, newName } = req.body;

    try {
        await Note.updateOne(
            { filename: oldName },
            { filename: newName, updatedAt: new Date() }
        );

        res.json({ success: true });
    } catch {
        res.status(500).json({ error: "Rename failed" });
    }
});



//start server
app.listen(PORT, () =>{
    console.log(`Server running at http://localhost:${PORT}`);
});