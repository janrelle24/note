const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

//middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

//folder where notes will store
const NOTES_DIR = path.join(__dirname, "notes");

// Create notes folder if not exists
if (!fs.existsSync(NOTES_DIR)) {
    fs.mkdirSync(NOTES_DIR);
}

//create api save notes
app.post("/api/save", (req, res) =>{
    const { filename, content } = req.body;

    if(!filename){
        return res.status(400).json({ error: "Filename is required" });
    }
    const filePath = path.join(NOTES_DIR, filename);

    fs.writeFile(filePath, content, "utf8", (err) =>{
        if(err){
            return res.status(500).json({ error: "Failed to save note" });
        }
        res.json({ message: "File saved successfully" });
    });
});
//open notes
app.get("/api/open/:filename", (req, res) =>{
    const filePath = path.join(NOTES_DIR, req.params.filename);

    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: "File not found" });
    }
    
    fs.readFile(filePath, "utf8", (err, data) =>{
        if(err){
            return res.status(500).json({ error: "Failed to open note" });
        }
        res.json({ content: data });
    });
});
//list notes
app.get("/api/list", (req, res) =>{
    fs.readdir(NOTES_DIR, (err, files) =>{
        if(err){
            return res.status(500).json({ error: "Cannot read notes" });
        }
        res.json(files);
    });
});


//start server
app.listen(PORT, () =>{
    console.log(`Server running at http://localhost:${PORT}`);
});