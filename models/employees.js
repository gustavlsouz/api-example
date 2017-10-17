const Schema = require('mongoose').Schema;

const data = Schema({
    nome: {type: String, required: true}
    , sobrenome: {type: String, required: true}
    , percentParticipacao: {type: Number, required: true}
});

const employees = Schema({
    user: {type: String, required: true}
    , date: {type: String, required: true}
    , updatedAt: {type: String}
    , createdAt: {type: String}
    , dataInf: {type: [data], required: true}
});

module.exports = db.model("employees", employees);
