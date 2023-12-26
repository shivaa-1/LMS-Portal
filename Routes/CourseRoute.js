const express = require('express');
const router = express.Router();
const {getCourses,
    getCoursesById,
    setCourse,
    updatedCourse,
    deleteCourse,
    getAllCourse} = require('../Controllers/CourseController');

router.get('/',getCourses);
router.get('/all',getAllCourse);
router.get('/:id',getCoursesById);
router.post('/addcourse',setCourse);
router.route("/:id").put(updatedCourse).delete(deleteCourse);

module.exports = router;
