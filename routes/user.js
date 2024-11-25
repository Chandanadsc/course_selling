const express = require('express');
const { verifyjwt } = require("../middleware/auth");
const { Users, Courses } = require("../db/modals");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const router = express.Router();
const SECRET = "Aman";

router.post("/signup", async (req, res) => {
    const { username, password } = req.body;
    if (username && password) {
        const userExists = await Users.findOne({ username });
        if (userExists) {
            res.json({ message: "Username already used" });
        } else {
            bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                    return res.json({ message: err });
                } else {
                    console.log(hash);
                    const user = new Users({ username, password: hash });
                    user.save();
                    const token = jwt.sign({ username }, SECRET, { expiresIn: "1hr" });
                    res.json({ message: "User registered!", token: token, user: user });
                }
            })

        }

    }
})

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    if (username && password) {
        if (username) {
            const hashedpass = await Users.findOne({ username }, { password: 1 })
            bcrypt.compare(password, hashedpass.password, (err, result) => {
                if (err) {
                    return res.json({ message: err });
                } else {
                    if (result) {
                        const token = jwt.sign({ username }, SECRET, { expiresIn: "1hr" });
                        res.json({ message: "Logged in successfully!!", token: token })
                    } else {
                        res.json({ message: "Invalid password" });
                    }
                }
            })

        }
    }
})


router.post("/course", verifyjwt, async (req, res) => {
    const { title, description, price } = req.body;
    const author = req.user.username;
    const author_id = await Users.findOne({ username: author })
    if (author_id) {
        const newCourse = new Courses({ title, description, price, author: author_id });
        newCourse.save();
        if (newCourse) {
            res.json({ message: "Course Added!!" });
        } else {
            res.json({ message: "Could not add the course" });
        }

    }

})

router.get("/courses", verifyjwt, async (req, res) => {
    const courses = await Courses.find().populate({ path: "author", select: "username" });
    res.json({ courses })
})

router.post("/purchase", verifyjwt, async (req, res) => {
    const { courseid } = req.body;
    console.log(req.user.username);
    if (courseid) {
        try {
            const result = await Users.updateOne(
                { username: req.user.username },
                { $push: { purchasedCourses: courseid } }
            );

            res.json({ message: "Course purchased successfully!!" });
        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    } else {
        res.status(400).json({ message: "Course ID is required" });
    }
});

router.get("/purchasedcourses", verifyjwt, async (req, res) => {
    const courses = await Users.find({ username: req.user.username }).populate({ path: "purchasedCourses", populate: { path: "author", model: "Users", select: "username" } })
    if (courses) {
        res.json({ courses: courses })
    }

})

module.exports = router;