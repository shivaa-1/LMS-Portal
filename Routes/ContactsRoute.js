const express = require('express');
const router = express.Router();
const Connections = require('../Controllers/ContactsController');

router.post('/contact',Connections);

module.exports = router;
