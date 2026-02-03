const bcrypt = require('bcryptjs');
const User = require('../model/User');


exports.register = async (req, res) => {
    const { username, email, password } = req.body;


    const exists = await User.findOne({ $or: [{ username }, { email }] });
    if (exists) return res.status(400).json({ error: 'Username or Email already taken' });


    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashed });
    await user.save();


    res.json({ success: true });
};


exports.login = async (req, res) => {
    const { username, password } = req.body;


    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: 'Invalid Login' });


    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: 'Invalid Login' });


    req.session.userId = user._id;
    res.json({ success: true });
};


exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.json({ success: true });
    });
};