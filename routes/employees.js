var router = require('express').Router();
var EmployeesController = require('../controllers/employees');

router.post('/', EmployeesController.create);
router.get('/find/:user/:date', EmployeesController.show);

module.exports = router;