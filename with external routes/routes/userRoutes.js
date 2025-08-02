const {Router} = require('express')
const path = require('path')

const router = Router()
const protect = require('../middleware/protectRoute');

router.get('/home', protect.protectRoute ,(req, res) => {
    try {
        res.sendFile(path.join(__dirname, "../view", "home.html"));
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "server error" });
    }
});

module.exports = router