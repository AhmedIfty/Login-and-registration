const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const collections = require("./config");
const collection = require('./config');

const app = express();
const saltRounds = 10;

//convert data into json format
app.use(express.json());

app.use(express.urlencoded({extended: false}));

// use ejs as view engine
app.set('view engine', 'ejs');

app.get("/login", (req, res) => {
    res.render("login");
  });

app.get("/signup", (req, res) => {
    res.render("signup");
  });

// Register user
app.post("/signup", async(req, res) => {
  const data = {
    email: req.body.email,
    password: req.body.password
  }

  // Check if the user already exists
  const existingUser = await collection.findOne({email: data.email});

  if (existingUser) {
    // If user exists, send an error response
    return res.status(400).send("User with this email already exists");
  }else{
    // Hash the password
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);
    data.password = hashedPassword;

    const userdata = await collection.insertMany(data);
    console.log(userdata);
    res.redirect("./login");
  }
})



const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
