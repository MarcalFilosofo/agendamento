const mongoose = require('mongoose');

const appointment = new mongoose.Schema({
    name: String, 
    date: Date,
    description: String, 
    cpf: String, 
    date: Date, 
    time: String, 
    finished: Boolean
});

module.exports = appointment
