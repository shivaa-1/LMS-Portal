const express = require('express');
const router = express.Router();
const {registerUser,getMe, loginUser , getData}= require('../Controllers/UserController');
const { protect } = require('../Middleware/authMiddleware');

router.post('/register',registerUser);
router.post('/login',loginUser);
router.get('/me',protect,getMe);
router.get('/',getData);

module.exports = router;
