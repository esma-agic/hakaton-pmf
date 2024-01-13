const Student = require('../models/student')
const express = require('express');
const {getChatUsers, getChatHistory, renderChat,findUserByUsername} = require('../controllers/chatController');

const router = express.Router();

router.get('/', async(req,res) => {
    const user = await Student.findById(req.session.student_id).populate('contacts').exec()
    console.log(user)
    res.render('inbox', {user})
})

router.get('/chat/:receiverId', renderChat)
router.get('/getChatUsers/:receiverId', getChatUsers); // gets sender and receiver
router.get('/getChatHistory/:receiverId', getChatHistory); // gets all messages between sender and receiver
router.get('/findUserByUsername/:username', findUserByUsername)

module.exports = router;