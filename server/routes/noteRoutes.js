const express = require('express');
const router = express.Router();
const note = require('../controllers/noteController');
const { isAuth } = require('../middlewares/authMiddleware');


router.post('/save', isAuth, note.saveNote);
router.get('/open/:filename', isAuth, note.openNote);
router.get('/list', isAuth, note.listNotes);
router.post('/delete', isAuth, note.deleteNote);
router.post('/rename', isAuth, note.renameNote);


module.exports = router;