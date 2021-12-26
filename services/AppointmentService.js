let appointment = require('../models/Appointment');
let mongoose = require('mongoose');

const Appo = mongoose.model('Appointment', appointment);

class AppointmentService {
    async create(name, email, description, cpf, date, time){
        let newAppo = new Appo({
            name: name,
            email: email,
            description: description,
            cpf: cpf,
            date: date,
            time: time,
            finished: false
        });

        try {
            await newAppo.save();

            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}

module.exports = new AppointmentService();