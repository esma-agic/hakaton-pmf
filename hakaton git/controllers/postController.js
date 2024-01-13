const Post = require('../models/post')
const Student = require('../models/student')


exports.createPost = async (req, res) => {
    try {
        console.log('pozvana ruta')
        const { subject, department, price, grade } = req.body;
        const thisUser = req.session.student_id;
        const newPost = new Post({
            subject,
            department,
            price,
            grade,
            student: thisUser
        });

        await newPost.save();

        res.redirect(`/post/home/${department}`)
    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).send({ error: "Internal Server Error" });
    }
};

exports.deletePost = async(req,res)=>{

    await Post.findByIdAndDelete(req.params.postId);
    res.redirect('/post/myPosts')

}




exports.searchPosts = async (req,res) => {
    const {subject} = req.body

    const post = await Post.find({
         subject: subject,
         student : {$ne: req.session.student_id},
        subscribers: {$ne: req.session.student_id},

        }
    ).populate('student')
    res.render('home',{post: post} )

}

module.exports.getAllPosts = async(req, res, next) => {
    console.log('get all posts')
    const department = req.params.department
    const post = await Post.find(
        { department: department,
            subscribers: {$ne: req.session.student_id},
            student : {$ne: req.session.student_id},

        }
    ).populate('student')

    res.render('home',{post: post} )


}

module.exports.addSubscriber = async(req,res)=>{
    const {postId} = req.params
    const student = await Student.findById(req.session.student_id)
    const post = await Post.findById(postId)
    const depart = post.department



    // Ensure that post.subscribes is an array before calling some()
    //const isSubscribed = Array.isArray(post.subscribes) && post.subscribes.some(subscriber => subscriber.equals(student._id));
    const isSubscribed = post.subscribers.includes(student._id)

    console.log(isSubscribed)
    if (isSubscribed ){
        // If already subscribed, pull the student ID from the subscribes array
        post.subscribers.pull(student._id);
        await post.save();

    } else {
        // If not subscribed, push the student ID to the subscribes array
        await post.updateOne(
            { $push: { subscribers: student._id }
            });

    }

    await post.save();
    res.redirect(`/post/home/${depart}`)

}

module.exports.removeSubscriber = async(req,res)=>{
    const {postId} = req.params
    const student = await Student.findById(req.session.student_id)
    const post = await Post.findById(postId)
    const depart = post.department



    // Ensure that post.subscribes is an array before calling some()
    //const isSubscribed = Array.isArray(post.subscribes) && post.subscribes.some(subscriber => subscriber.equals(student._id));
    const isSubscribed = post.subscribers.includes(student._id)

    console.log(isSubscribed)
    if (isSubscribed ){
        // If already subscribed, pull the student ID from the subscribes array
        post.subscribers.pull(student._id);
        await post.save();

    } else {
        // If not subscribed, push the student ID to the subscribes array
        await post.updateOne(
            { $push: { subscribers: student._id }
            });

    }

    await post.save();
    res.redirect(`/post/mySubscribedPosts`)

}


exports.getMyPosts = async(req,res) =>{
    const student = req.session.student_id
    const post = await Post.find({student:student, active:true}).populate('student subscribers').exec()
    console.log(student)

    res.render('myPosts' ,{post: post})


}

exports.getMySubscribedPosts = async(req,res) =>{
    const student = req.session.student_id
    const post = await Post.find({subscribers:student}).populate('student').exec()


    res.render('mySubscribedPosts' ,{post: post})


}

exports.getDisabledPosts = async(req,res) =>{
    const student = req.session.student_id
    const post = await Post.find({student:student, active:false}).populate('student').exec()


    res.render('disabledPosts' ,{post: post})
}

exports.disablePost = async(req,res)=>{


    await Post.findOneAndUpdate({ _id: req.params.postId }, { $set: { active: false } });
    console.log(123)
    res.redirect('/post/myPosts')

}

exports.enablePost = async(req,res)=>{


    await Post.findOneAndUpdate({ _id: req.params.postId }, { $set: { active: true } });
    res.redirect('/post/disabledPosts')

}