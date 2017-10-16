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

// exports.Employees = Employees;
module.exports = Employees;

// exports.create = function(dataToSave) {

//     var newData = new Employees(dataToSave);

//     newData.save(function(err) {
//         if (err) return console.error(err);
//         console.log("new employee saved");
//     });

// };

// exports.show = function(res, obj) {
//     // Employees.find(obj, function(err, result) {
//     //     if (err) return err;
//     //     console.log("resultado: ", result);
//     //     res.json(result);
//     // });
// };