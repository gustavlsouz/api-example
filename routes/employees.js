const router = require('express').Router();
const EmployeesController = require('../controllers/employees');

router.post('/', EmployeesController.create);
router.get('/:user/:date', EmployeesController.read);
router.put('/', EmployeesController.update);
router.delete('/', EmployeesController.delete);

module.exports = router;