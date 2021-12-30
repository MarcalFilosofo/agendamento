class AppointmentFactory {

    Build(simpleAppoitment){
        let month = simpleAppoitment.date.getMonth();
        let day = simpleAppoitment.date.getDate() + 1;
        let year = simpleAppoitment.date.getFullYear();

        let hour =   Number.parseInt(simpleAppoitment.time.split(':')[0]);
        let minute = Number.parseInt(simpleAppoitment.time.split(':')[1]);

        let startDate = new Date(year, month, day, hour, minute, 0, 0);
        // startDate.setHours(startDate.getHours() - 3);

        let appo = {
            id: simpleAppoitment._id,
            title: simpleAppoitment.name + ' - ' + simpleAppoitment.description,
            start: startDate,
            end: startDate,
        }

        return appo;
    }
}

module.exports = new AppointmentFactory();