const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/user");
const cors = require("cors");

const app = express();
app.use(cors())
app.use(express.json());
app.use("/user", userRouter);

mongoose.connect("mongodb+srv://klh:Aman2004@cluster0.w7eb8ia.mongodb.net/CourseSelling")
    .then(() => {
        console.log("Connected to db")
    })
    .catch(() => {
        console.error("Could not connect to db");
    })

app.listen(3000, () => {
    console.log("Listening at port 3000");
})
