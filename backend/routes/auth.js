const express = require("express")
const router = express.Router()
const User = require("../models/User")
const { body, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const JWT_SECRET = "harshsingh"
const fetchuser = require("../middleware/fetchuser")

//ROUTE : 1
router.post("/createuser", [
    body('name', 'Enter a valid name').isLength({ min: 5 }),
    body("email").isEmail(),
    body("password",'Password must be atleast 5 characters').isLength({ min: 5 })
], async (req, res) => {
    let success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success ,  errors: errors.array() });
    }
    //Checking user with this email already exist 
    try {
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({success ,   error: "Sorry a user with this email already exist." })
        }
        const salt = await bcrypt.genSaltSync(10);
        const secPass = await bcrypt.hash(req.body.password, salt)
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email
        })
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true
        // res.send({ success ,authToken})
        res.json({ authToken })
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured")
    }

})
//ROUTE 2 : Authenticate a user
router.post("/login", [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Passwod cannot be blank").exists()
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email })
        if (!user) {
            success = false
            return res.status(400).json({ error: "Please login with correct credentials" })
        }

        const passwordcompare = await bcrypt.compare(password, user.password);
        if (!passwordcompare) {
            success = false
            return res.status(400).json({ success , error: "Please login with correct credentials" })
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success =true
        res.json({ success , authToken })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured")
    }
})

//ROUTE 3: GET loggedin user details
router.post("/getuser",fetchuser , async (req, res) => {
    try {
        let userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured")
    }
})
module.exports = router;