const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();

const connectDB = require('./Config/db');

const port = process.env.PORT||5000;

connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use('/api/users',require('./Routes/UserRoute'));
app.use('/api/courses',require('./Routes/CourseRoute'));
app.use('/api/contacts',require('./Routes/ContactsRoute'));

const course = require('./Models/CourseModel');

app.post('/newCourse',async(req,res)=>{
    const id = req.body.id;
    const CourseName = req.body.coursename;
    const CourseDescription = req.body.description;
    const Author = req.body.author;
    const Level = req.body.level;
    const Category= req.body.category;
    const CourseImage = req.body.courseimage;

    const courseData = new course({
        id:id,
        course_name:CourseName,
        course_details:CourseDescription,
        author:Author,
        level:Level,
        category:Category,
        course_img:CourseImage
    });

    try {
        await courseData.save();

        res.status(200).send("Inserted Data Succesfully");
    } catch (error) {
        console.log(error)
    }

});

app.put('/newSection',async(req,res)=>{
    const id = req.body.id;
    const CourseName = req.body.courssename;
    const SectionName = req.body.sectionname;
    const SectionDescription = req.body.description;
    const VideoTitle = req.body.video;
    const VideoUrl = req.body.url;

    try {
        const updatedCourse = await course.findOneAndUpdate(
            {course_name:CourseName},
            {
                $push:{
                    sections:{
                        section_name:SectionName,
                        section_text:SectionDescription,
                        video_title:VideoTitle,
                        video_url:VideoUrl
                    }
                }
            },
            {new:true}
        );

        if (!updatedCourse){
            res.status(401).send("Course Not Found")            
        };

        res.send("Updated Data Successfully");
    } catch (error) {
        console.log(error);
        res.status(500).send("An Internal Server Error Countered");
    }

});
const {registerUser}= require('./Controllers/UserController');
const {loginUser}= require('./Controllers/UserController');
const {getMe} = require('./Controllers/UserController');
const {getData} = require('./Controllers/UserController');
const Connections = require('./Controllers/ContactsController');

app.post('/api/users/register',registerUser);
app.post('/api/users/login',loginUser);
app.get('/api/users/me',getMe);
app.get('/',getData);

app.post('/api/contacts/contact',Connections);

app.listen(port,()=>{
    console.log("server started on port "+port);
});