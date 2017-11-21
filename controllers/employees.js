const Q = require('q');

const EmployeesModel = require('./../models/employees');

const employeeSchema = require('./../utils/employees');

const re = require('./../utils/regex');

exports.create = (req, res) => {
	
	const onError = errors => {
		res.status(500).json({ error: errors.toString() });
	};

	const onOk = () => {
		res.status(201).send();
	};

	if ( typeof req.body === 'object' ) {
		employeeSchema.readObject(req.body)
			.then(onOk)
			.catch(onError)
		
	} else {
		res.status(500).send();
	}
};

exports.read = (req, res) => {

	const find = (query) => {
		EmployeesModel.find(query)
			.limit(50)
			.sort({ "_id": -1 })
			.select({ "dataInf._id": false, "__v": false })
			.exec(onFind);
	};

	const onFind = (err, employees) => {
		if (!err) {
			res.status(200).json(employees);
		} else {
			res.status(200).json({ error: err.toString() });
		}
	};

	const onError = (err) => {
		res.status(500).json({ error: err.toString() });
	};

	let user = req.params.user
	, date = req.params.date;

	if (re.user.test(user) && re.date.test(date) ) {
		let query = { "user": user, "date": date };
		employeeSchema.checkParams(query)
			.then(() => { find(query); })
			.catch(onError)
	} else {
			res.status(500).send();
	}
	
};

exports.update = (req, res) => {

	const onSave = (err) => {
		if (err) {
			res.status(304).json({ error: err.toString() });
		} else res.status(204).send();
	};

	const sendError = (err) => {
		if (err instanceof Error) {
			res.status(500).json({ error: err.toString()});
		} else {
			res.status(500).send();
		}
	};

	let id = req.body.id
		, field = req.body.field
		;

	if ( re.id.test(id) && re.field.test(field) ) {

		let fieldFilter = Object.keys(EmployeesModel.schema.paths).filter( el => el === field);

		if (fieldFilter.length > 0) {
			let query = { "_id": id }
				, value = req.body.value
				;
			
			const onFindOne = (err, employee) => {
				if (err) {
					sendError(err);
				} else if (employee) {
					employee[field] = value;
					employee.save(onSave);
				} else {
					sendError(new Error(`Registro não encontrado.`));
				}
			};

			EmployeesModel.findOne(query, onFindOne);
		} else {
			sendError(new Error(`Field não encontrado`));
		}
	} else {
		if (!re.id.test(id)) {
			sendError(new Error(`ID inválido`));
		} else if (!re.field.test(field)) {
			sendError(new Error(`Field inválido`));
		}
	}

};

exports.delete = (req, res) => {
	let idToDelete = req.params.id;

	const onDelete = (err, doc) => {
		if (err) {
			res.status(500).json({ "message": err.toString() });
		}
		if (doc) {
			res.status(200).json({ "_id": doc["_id"], "message": "successfully deleted" });
		} else {
			res.status(500).json({ "message": "_id not found" });
		}

	};

	if (re.id.test(idToDelete)) {
		EmployeesModel.findByIdAndRemove(idToDelete, onDelete);
	} else {
		res.status(500).send();
	}

};