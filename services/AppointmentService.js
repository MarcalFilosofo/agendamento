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
            finished: false,
            notified: false
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

    async search(query){
        try{
            let appos = await Appo.find().or([{email: query}, {cpf: query}])
            return appos;
        } catch (error) {
            console.log(error);
        }
    }

    async sendNotification(){
        let appos = await this.getAll(false);

        appos.forEach(appointment => {
            
            let transporter = nodemailer.createTransport({
                host: 'smtp.mailtrap.io',
                port: 25,
                auth: {
                    user: 'e8f9c9f8f9c9f8',
                    pass: 'e8f9c9f8f9c9f8'
                }
            });

            //If the appointment is not notified and one hour to go the event
            if(!appointment.notified && appointment.start.getTime() - new Date().getTime() <= 3600000){
                transporter.sendMail({
                    from: 'teste@gmail.com',
                    to: appointment.email,
                    subject: 'Agendamento',
                    text: 'Olá ' + appointment.name + ', seu agendamento está prestes a acontecer!',
                }).then(() => {
                    appointment.notified = true;
                    appointment.save();
                }).catch(error => {
                    console.log(error);
                });

            }

        })

    }
}

module.exports = new AppointmentService();