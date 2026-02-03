const Note = require('../model/Note');


exports.saveNote = async (req, res) => {
    const { filename, content } = req.body;


    const note = await Note.findOneAndUpdate(
        { filename, userId: req.session.userId },
        { content, updatedAt: new Date() },
        { upsert: true, new: true }
    );


    res.json({ success: true, note });
};


exports.openNote = async (req, res) => {
    const note = await Note.findOne({ filename: req.params.filename });
    if (!note) return res.status(404).json({ error: 'File not found' });


    res.json({ content: note.content });
};


exports.listNotes = async (req, res) => {
    const notes = await Note.find({ userId: req.session.userId }, 'filename');
    res.json(notes.map(n => n.filename));
};


exports.deleteNote = async (req, res) => {
    await Note.deleteOne({ filename: req.body.filename });
    res.json({ success: true });
};


exports.renameNote = async (req, res) => {
    const { oldName, newName } = req.body;


    await Note.updateOne(
    { filename: oldName },
    { filename: newName, updatedAt: new Date() }
    );


    res.json({ success: true });
};