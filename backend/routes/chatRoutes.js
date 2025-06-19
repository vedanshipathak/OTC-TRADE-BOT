const express = require('express');
const router = express.Router();
const { createChat, sendMessage } = require('../controllers/chatController');

router.post('/create', createChat);
router.post('/send', sendMessage);

module.exports = router;
