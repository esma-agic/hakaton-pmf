const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController')

router.get('/register', authController.getRegisterPage)
router.post('/register', authController.registerUser)
router.get('/', authController.getLoginPage)
router.post('/login', authController.login)
router.get('/home', authController.getHomePage)
router.get('/logout', authController.logout)

router.post('/deleteStudent',authController.deleteStudent )



module.exports = router;