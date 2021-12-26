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

app.get('/', (req, res) => {
   res.send("Oi"); 
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

app.listen(8080, () => {
    console.log('Server is running on port 8080');
})