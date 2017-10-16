var EmployeesModel = require('../models/employees');

exports.create = function(req, res) {

	let obj = req.body
	, sum = 0;
	
	obj.dataInf.forEach((el) => {
		sum += el.percentParticipacao;
	});
	
	if (sum === 100) {

		// let newData = new EmployeesModel.Employees(obj);
		let newData = new EmployeesModel(obj);

		newData.save(function(err) {
			if (err) return console.error(err);
			console.log("new employee saved");
		});

		res.json({"status": 201, "statusName": "Criado"});
	} else {
		obj.statusName = "ErroDePorcentagem";
		obj.descricao = "Porcentagem total precisa ser igual 100%.";
		obj.totalPercent = sum;
		res.json(obj);
	}
};

exports.show = function(req, res) {
	let user = req.params.user
	, date = req.params.date
	;
	console.log("user: ", user, "date: ",date);

	let query = {"user": user, "date": date};

	EmployeesModel.find(query)
	.limit(5)
	.select({"_id": false, "dataInf._id": false, "__v": false})
	.exec(function(err, employees) {
		res.json(employees);
	});
};