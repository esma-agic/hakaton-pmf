const Student = require('../models/student')
const Post = require('../models/post')

//svi postovi za dati odsjek
/*module.exports.getAllPosts = async(req, res, next) => {

    const post = await Post.find(
        {student: req.session.student_id, department: "Matematika"}
    ).populate('student')
    
    res.render('home',{post: post} )

    
}*/

module.exports.getAccount = async(req,res)=>{
    const student = await Student.findById(req.session.student_id)

    const posts = await Post.find({student: req.session.student_id})
    const subsPosts = await Post.find({subscribers: req.session.student_id})

    const myPosts = posts.length
    const subscribedPosts = subsPosts.length
    res.render('account' ,{student, myPosts, subscribedPosts})
}