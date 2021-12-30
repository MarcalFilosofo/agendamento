//Importando as dependencias
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const appointmentService = require('./services/AppointmentService');


app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json());

app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost:27017/agendamento', {
    useNewUrlParser: true, 
    useUnifiedTopology: true
});

mongoose.set('useFindAndModify', false)

app.get('/', (req, res) => {
    res.render('index');
})

app.get('/cadastro', (req, res) => {
    res.render('create');
})

app.post('/cadastro', (req, res) => {
    appointmentService.create(
        req.body.name,
        req.body.email, 
        req.body.description, 
        req.body.cpf, 
        req.body.date, 
        req.body.time
    ).then(result => {
        res.redirect('/');
    }).catch(error => {
        console.log(error);
        res.redirect('/cadastro');
    })
})

app.get('/calendar', async (req, res) => {
    let consulta = await appointmentService.getAll(false);

    res.json(consulta);
})

app.get('/event/:id', async (req, res) => {
    var appointment = await appointmentService.getById(req.params.id);

    res.render('event', {appointment: appointment});
})

app.post('/finish', async (req, res) => {
    let id = req.body.id;

    let result = await appointmentService.finish(id);

    res.redirect('/');
})

app.listen(8080, () => {
    console.log('Server is running on port 8080');
})