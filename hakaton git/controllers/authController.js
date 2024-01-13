const Student = require('../models/student')
const Post = require('../models/post')
const bcrypt = require('bcrypt')

module.exports.getLoginPage = (req, res, next) => {
    res.render('login')
}

module.exports.getRegisterPage = (req, res, next) => {
    res.render('register')
}


module.exports.login = async(req, res, next) => {
    const email = req.body.email
    const password = req.body.password

    const student = await Student.findOne({email:email})
    if(!student){
        res.send('Student s ovim emailom ne postoji')
    } else {
        const isti_password = await bcrypt.compare(password, student.password)
        if(!isti_password){
            res.send('Netacan password za ovog korisnika')
        }
        else {
            req.session.student_id = student._id
            req.session.isAuth = true
            res.redirect('/post/home/Matematika')
        }
    }
}

module.exports.logout = async (req,res) =>{
    console.log(req.session.user)
    const student = await Student.findById(req.session.student_id)

    await student.save()

    req.session.destroy((err)=>{
        if(err) throw err
        res.redirect('/')

    })
}


module.exports.registerUser = async(req, res, next) => {

    const password = req.body.password
    const hashedPassword = await bcrypt.hash(password, 10)

    const studentData = {
        name: req.body.name,
        lastname: req.body.lastname,
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        phone: req.body.phone

    }
   
    await Student.create(studentData)
    res.redirect('/')
}

module.exports.getHomePage = async (req, res, next) => {
    const post = await Oglas.find({}).populate('student')

    res.render('home', {post: post})
}


module.exports.deleteStudent = async(req,res)=>{

    await Post.deleteMany({
        student: req.session.student_id
    })


    const student = await Student.findOneAndDelete({_id:req.session.student_id})

    res.redirect('/')




}

