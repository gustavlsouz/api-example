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

		obj.createdAt = date.format(new Date(), 'YYYY/MM/DD HH:mm:ss');

		let newData = EmployeesModel(obj);

		newData.save( err => {
			if (err) console.error(err)
			else console.log("new employee saved");
		});

		res.json({"status": 201, "statusName": "Criado"});
	} else {
		obj.statusName = "ErroDePorcentagem";
		obj.descricao = "Porcentagem total precisa ser igual 100%.";
		obj.totalPercent = sum;
		res.json(obj);
	}
};

exports.show = (req, res) => {
	let user = req.params.user
	, date = req.params.date
	;

	let query = {"user": user, "date": date};

	EmployeesModel.find(query)
	.limit(50)
	.sort({"_id": -1})
	.select({"dataInf._id": false, "__v": false})
	.exec((err, employees) => {
		res.json(employees);
	});
};