const Joi = require('joi');
const Q = require('q');
const date = require('date-and-time');

const EmployeesModel = require('./../models/employees');

const re = /^[a-zA-Z]{3,30}$/;

const dataSchema = Joi.object().keys({
    nome: Joi.string().regex(re).required(),
    sobrenome: Joi.string().regex(re).max(30).required(),
    percentParticipacao: Joi.number().precision(4).positive().max(100)
});

const employeeSchema = Joi.object().keys({
    user: Joi.string().min(3).max(30).required(),
    date: Joi.date().min('1900-01-01').required(),
    dataInf: Joi.array().items(dataSchema)
});



const checkEmployeeSchema = (employeeObj) => {
    let deffered = Q.defer();
    
    let result = Joi.validate(employeeObj, employeeSchema);
    
    if (result.error instanceof Error) {
        deffered.reject(result.error);
    } else {
        deffered.resolve(result.value);
    }
    return deffered.promise;
};

const checkPercent = (employeeObj) => {
    let deffered = Q.defer();
    
    let sum = 0
        , ok = true;

    for (let idx = 0; idx < employeeObj.dataInf.length; idx++) {
        let el = employeeObj.dataInf[idx];
        if (typeof el.percentParticipacao === 'number') {
            sum += el.percentParticipacao;
        } else {
            ok = false;
            break;
        }
    }
    if (!ok) {
        deffered.reject(new Error("Percentual deve ser Number"));
    } else if (sum === 100) {
        deffered.resolve(employeeObj);
    } else {
        deffered.reject(new Error("Total da porcentagem deve ser igual a 100."));
    }
    return deffered.promise;
};

const readObject = (employeeObj) => {
    let deffered = Q.defer();

    checkEmployeeSchema(employeeObj)
        .then(checkPercent)
        .catch(err => {
            deffered.reject(err);
        })
        .then(employeeObj => {
            let now = new Date();
            employeeObj.createdAt = date.format(now, 'YYYY-MM-DD');
            employeeObj.createdAtHour = date.format(now, 'HH:mm:ss');
            employeeObj.date = date.format(employeeObj.date, 'YYYY-MM-DD');

            let newEmployee = EmployeesModel(employeeObj);
            newEmployee.save(err => {
                if (err) {
                    deffered.reject(err);
                } else {
                    deffered.resolve(true);
                }
            });
            return deffered.promise;
        })

    return deffered.promise;
};

const checkParams = (params) => {
    let deffered = Q.defer();

    let result = Joi.validate(params, employeeSchema);
    if (result.error instanceof Error) {
        deffered.reject(result.error);
    } else {
        deffered.resolve(true);
    }

    return deffered.promise;
};

exports.readObject = readObject;
exports.checkParams = checkParams;