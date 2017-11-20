const router = require('express').Router();

const EmployeesController = require('../controllers/employees');

router.post(`/api/employees`, EmployeesController.create);
router.get(`/api/employees/:user/:date`, EmployeesController.read);
router.put(`/api/employees`, EmployeesController.update);
router.delete(`/api/employees/delete/:id`, EmployeesController.delete);


module.exports = router;