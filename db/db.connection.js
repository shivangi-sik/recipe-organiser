const mongoose = require("mongoose")
require("dotenv").config()

const mongoURI = process.env.MONGODB

const initialiseDatabase = async () => {
try{
const connection = await mongoose.connect(mongoURI)
if(connection){
    console.log("connected successfully")
}
}
catch(error){
console.log("connection failed", error)
}
}

module.exports = {initialiseDatabase}
