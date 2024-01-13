const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController')

//router.get('/home', studentController.getAllPosts)
router.get('/account', studentController.getAccount)


module.exports = router;