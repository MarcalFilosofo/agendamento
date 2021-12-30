let appointment = require('../models/Appointment');
let mongoose = require('mongoose');
let AppointmentFactory = require('../factories/AppointmentFactory');

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

    async getAll(showFinished){
        if(showFinished){
            return await Appo.find();
        }else{
            let appos = await Appo.find({finished: false});
            let appointments = [];

            appos.forEach(appointment => {

                if(appointment.date != undefined){
                    appointments.push(AppointmentFactory.Build(appointment));
                }
                
                console.log(appointments);
            })
            
            return appointments;
        }
    }

    async getById(id){
        try {
            return await Appo.findOne({'_id': id});
        } catch (error) {
            console.log(error);
        }
    }

    async finish(id){
        try{
            await Appo.findOneAndUpdate({'_id': id}, {finished: true})
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}

module.exports = new AppointmentService();