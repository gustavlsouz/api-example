const router = require('express').Router();
const EmployeesController = require('../controllers/employees');

router.post('/', EmployeesController.create);
router.get('/find/:user/:date', EmployeesController.read);
router.put('/', EmployeesController.update);

module.exports = router;