const date = require('date-and-time');

const EmployeesModel = require('../models/employees');

const string = require('../utils/string');

exports.create = (req, res) => {

	let obj = req.body
	, sum = 0;
	
	obj.dataInf.forEach((el) => {
		sum += el.percentParticipacao;
	});
	
	if (sum === 100) {
		obj.dataInf.forEach((el) => {
			el.nome = string.capitalize(el.nome);
			el.sobrenome = string.capitalize(el.sobrenome);
		});

		obj.createdAt = date.format(new Date(), 'YYYY-MM-DD HH:mm:ss');

		let newEmployee = EmployeesModel(obj);

		newEmployee.save( err => {
			if (err) console.error(err);
			else console.log("new employee saved");
		});

		res.status(201).send();
	} else {
		obj.statusName = "ErroDePorcentagem";
		obj.descricao = "Porcentagem total precisa ser igual 100%.";
		obj.totalPercent = sum;
		res.json(obj);
	}
};

exports.read = (req, res) => {
	let user = req.params.user
	, date = req.params.date
	, query = {"user": user, "date": date}
	;

	EmployeesModel.find(query)
	.limit(50)
	.sort({"_id": -1})
	.select({"dataInf._id": false, "__v": false})
	.exec((err, employees) => {
		res.json(employees);
	});
};

exports.update = (req, res) => {
	let conditions = {"_id": req.body.id}
	, field = req.body.field
	, value = req.body.value
	;

	let callback = (err) => {
		if (err) {res.status(500).json({"status": 304, "description": "Not Modified"});}
		else res.status(204).send();
	};

	EmployeesModel.findOne(conditions, (err, employee) => {
		if (err) return next(err);
		employee[field] = value;

		employee.save(callback);
	});
};

exports.delete = (req, res) => {
	let obj = req.body;
	EmployeesModel.findByIdAndRemove(obj["_id"], (err, doc) => {
		if (err) {
			res.status(500).json({"message": err});
		}
		res.status(200).json({"_id": doc["_id"], "message": "successfully deleted"});
	});
};