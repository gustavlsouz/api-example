const Schema = require('mongoose').Schema;

const data = Schema({
    nome: {type: String, required: true}
    , sobrenome: {type: String, required: true}
    , percentParticipacao: {type: Number, required: true}
});

const employees = Schema({
    user: {type: String, required: true}
    , date: {type: Date, required: true}
    , updatedAt: { type: Date}
    , createdAt: { type: Date}
    , createdAtHour: {type: String}
    , dataInf: {type: [data], required: true}
});

module.exports = db.model("employees", employees);
