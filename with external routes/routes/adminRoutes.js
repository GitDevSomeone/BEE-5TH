const { Router } = require('express')

const path = require('path')
const fs = require('fs')
const {v4: uuidv4 } = require('uuid')
const { onlyAdmin } = require('../middleware/protectRoute')

const router = Router()

router.use(onlyAdmin);
router.get('/home', (req, res) => {
    try {
        res.sendFile(path.join(__dirname, "../view", "addproduct.html"));
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "server error" });
    }
});

router.post('/addproduct', (req, res) => {
    try {
        fs.readFile(path.join(__dirname, "../product.json"), 'utf-8', (err, data) => {
            try {
                data = JSON.parse(data)
                const productObject = {
                    ...req.body,
                    id: uuidv4()
                }
                data.push(productObject);
                fs.writeFile(path.join(__dirname, "../product.json"), JSON.stringify(data), (err) => {
                    if (!err) {
                        res.status(200).json(productObject)
                    }
                });
            } catch (error) {
                console.log(error);
                res.status(500).json({ message: "server error" });
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "server error" });
    }
})

module.exports = router