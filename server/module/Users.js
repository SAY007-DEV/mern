const express = require('express');
const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
    name: { type: String},
    email: { type: String}, 
    age: { type: Number},
   
    
});

const UserModel = mongoose.model("User", UsersSchema);
module.exports = UserModel;
