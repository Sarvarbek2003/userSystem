const router = require('express').Router();
const userController = require('../controllers/users.js');
const database = require('../middlewares/postgres.js');


router.get('/', database.data, userController.GET);
router.post('/send', database.data, userController.POST);

router.post('/register', database.data, userController.REG);
router.post('/auth', database.data, userController.AUTH);

module.exports = router