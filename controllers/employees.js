// const date = require('date-and-time');
const Q = require('q');

const EmployeesModel = require('./../models/employees');

const string = require('./../utils/string');
const employeeSchema = require('./../utils/employees');

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
	, date = req.params.date
	, query = {"user": user, "date": date}
	;
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
};

exports.update = (req, res) => {
	let conditions = {"_id": req.body.id}
	, field = req.body.field
	, value = req.body.value
	;

	const callback = (err) => {
		if (err) {
			res.status(304).json({
				"status": 304,
				"description": "Not Modified"
			});
		}
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
		if (doc) {
			res.status(200).json({"_id": doc["_id"], "message": "successfully deleted"});
		} else {
			res.status(500).json({"message":"_id not found"});
		}
		
	});
};