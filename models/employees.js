const Schema = require('mongoose').Schema;

const data = Schema({
    nome: {type: String, required: true}
    , sobrenome: {type: String, required: true}
    , percentParticipacao: {type: Number, required: true}
});

const employees = Schema({
    user: {type: String, required: true}
    , date: {type: String, required: true}
    , dataInf: {type: [data], required: true}
});

const Employees = db.model("employees", employees);

module.exports = Employees;
