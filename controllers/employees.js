const Q = require('q');

const EmployeesModel = require('./../models/employees');

const employeeSchema = require('./../utils/employees');

const re = require('./../utils/regex');

exports.create = (req, res) => {
	if ( typeof req.body === 'object' ) {
		employeeSchema.readObject(req.body)
			.then(() => {
				res.status(201).send();
			})
			.catch(errors => {
				res.status(500).json({ error: errors.toString() });
			})
		
	} else {
		res.status(500).send();
	}
};

exports.read = (req, res) => {
	let user = req.params.user
	, date = req.params.date;

	if (re.user.test(user) && re.date.test(date) ) {
		let query = { "user": user, "date": date };
		employeeSchema.checkParams(query)
			.then(() => {
				EmployeesModel.find(query)
					.limit(50)
					.sort({ "_id": -1 })
					.select({ "dataInf._id": false, "__v": false })
					.exec((err, employees) => {
						if (!err) {
							res.status(200).json(employees);
						} else {
							res.status(200).json({ error: err.toString() });
						}
					});
			})
			.catch((err) => {
				res.status(500).json({ error: err.toString() });
			})
	} else {
			res.status(500).send();
	}
	
};

exports.update = (req, res) => {
	let id = req.body.id
		, field = req.body.field
		;

	const onSave = (err) => {
		if (err) {
			res.status(304).json({ error: err.toString() });
		} else res.status(204).send();
	};
	if ( re.id.test(id) && re.field.test(field) ) {

		let fieldFilter = Object.keys(EmployeesModel.schema.paths).filter( el => el === field);

		if (fieldFilter.length > 0) {
			let query = { "_id": id }
				, value = req.body.value
				;

			EmployeesModel.findOne(query, (err, employee) => {
				if (err) return next(err);
				employee[field] = value;

				employee.save(onSave);
			});
		} else {
			res.status(500).send();
		}
	} else {
		res.status(500).send();
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