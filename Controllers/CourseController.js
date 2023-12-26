const asyncHandler = require('express-async-handler');
const Course = require('../Models/CourseModel');
const Section = require('../Models/sectionModel');
const Video = require('../Models/VideoModel');
const Quiz = require('../Models/quizModel');

const getCourses = asyncHandler(async(req,res)=>{
    const courses = await Course.find();
    res.status(200).json(courses);
});

const getCoursesById = asyncHandler(async(req,res)=>{
    const id = req.params.id;
    const course = await Course.findBYId(id).populate("sections");
    res.status(400).json(course);
});

const setCourse = asyncHandler(async(req,res)=>{
    const course =new Course({
        course_name:req.body.course_name,
        course_details:req.body.course_details,
        author:req.body.author,
        level:req.body.level,
        category:req.body.category,
        course_img:req.body.course_img
    });

    const savedCourse = await course.save();

    if(req.body.sections){
        for (let i = 0; i < req.body.sections; i++) {
            const section = req.body.sections[i];

            const newSection = new Section({
               section_name:section.section_name,
               section_text:section.section_text 
            });

            const savedSection = await newSection.save();
            
            if (section.Videos) {
                for (let j = 0; j <section.videos; j++) {
                    const video = section.videos[i];
                    
                    const newVideo = new Video({
                        video_url:video.video_url,
                        video_title:video.video_title
                    });

                    const savedVideo = await newVideo.save();

                    savedSection.video._ids.push(savedVideo._id);

                    if(section.quizees){
                        for (let k = 0; k < section.quizees; k++) {
                            const quiz = section.quizees;

                            const newQuiz = new Quiz({
                                quiz_title:quiz.quiz_title,
                                quiz_questions:quiz.quiz_question,
                                quiz_options:quiz.quiz_options,
                                quiz_answer:quiz.quiz_answer
                            });

                            const savedQuiz = await newQuiz.save();
                            
                            savedSection.quiz._ids.push(savedQuiz._id);
                        }
                    }
                    savedCourse.section.push(savedSection._id);
                }                                
            }
            const updatedCourse = await savedCourse.save();

            res.status(200).json(updatedCourse);
        }
    }
});

const updatedCourse = asyncHandler(async(req,res)=>{
    const course = await Course.findBYId(req.params.id);

    if(!course){
        res.status(400);
        throw new Error("Course Not Found")
    }

    const updatedCourse = await Course.findBYIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    );

    res.status(200).json(updatedCourse);
});

const deleteCourse = asyncHandler(async(req,res)=>{
    const course = await Course.findBYId(req.params.id);

    if (!course) {
        res.status(400);
        throw new Error("Course Not Found")        
    }

    await course.remove();

    res.status(200).json({id:req.params.id});
});

const getAllCourse = asyncHandler(async(req,res)=>{
    const courses = await Course.find();

    res.status(200).json(courses);
});

module.exports = {
    getCourses,
    getCoursesById,
    setCourse,
    updatedCourse,
    deleteCourse,
    getAllCourse
};


