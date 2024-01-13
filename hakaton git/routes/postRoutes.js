const Post = require('../models/post')
const express = require('express');
const router = express.Router()
const postController = require('../controllers/postController')
const studentController = require("../controllers/studentController");

router.post('/createPost', postController.createPost )

//ruta za pocetnu stranicu gdje su svi postovi za dati odsjek


router.post('/search', postController.searchPosts)

router.get('/home/:department', postController.getAllPosts)

router.post('/addSubscriber/:postId', postController.addSubscriber)
router.post('/removeSubscriber/:postId', postController.removeSubscriber)

router.get('/myPosts', postController.getMyPosts)

router.get('/mySubscribedPosts', postController.getMySubscribedPosts)
router.get('/disabledPosts', postController.getDisabledPosts)

router.get('/delete/:postId', postController.deletePost)
router.get('/disable/:postId', postController.disablePost)
router.get('/enable/:postId', postController.enablePost)



module.exports = router