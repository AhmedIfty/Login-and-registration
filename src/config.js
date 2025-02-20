const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb://localhost:27017/logindemo");

// check db connected or not
connect.then(() => {
    console.log("Database connected Successfully");
})
.catch(() => {
    console.log("Database not connected ");
})

//creating a schema
const LoginSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
});

// collection part , creating model
const collection = new mongoose.model("users", LoginSchema);

module.exports = collection;



