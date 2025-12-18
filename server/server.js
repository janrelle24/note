const express = require("express");

const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/notebook_app")
.then(() => console.log("MongoDB connected"))
.catch(err => console.error(err));

const app = express();
const PORT = 3000;

//middleware
const path = require("path");
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

const Note = require("./model/Note");
//create api save notes
app.post("/api/save", async (req, res) =>{
    const { filename, content } = req.body;

    if(!filename){
        return res.status(400).json({ error: "Filename is required" });
    }
    try{
        const note = await Note.findOneAndUpdate(
            { filename },
            { content, updatedAt: new Date() },
            { upsert: true, new: true }
        );
        res.json({ success: true, note });
    } catch (err){
        res.status(500).json({ error: "Save failed" });
    }
});
//open notes
app.get("/api/open/:filename", async (req, res) =>{
    
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
app.get("/api/list", async (req, res) =>{
    
    try {
        const notes = await Note.find({}, "filename");
        res.json(notes.map(n => n.filename));
    } catch (err) {
        res.status(500).json({ error: "List failed" });
    }
});

// DELETE FILE
app.post("/api/delete", async (req, res) => {
    
    try {
        await Note.deleteOne({ filename: req.body.filename });
        res.json({ success: true });
    } catch {
        res.status(500).json({ error: "Delete failed" });
    }
});

// RENAME FILE
app.post("/api/rename", async (req, res) => {
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