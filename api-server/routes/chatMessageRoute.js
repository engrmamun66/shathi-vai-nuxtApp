const express = require('express');
const router = express.Router();
const {
    saveMessage,
    getAllMessages,
} = require('../controllers/ChatMessageController');
router.route('/').post(saveMessage).get(getAllMessages);
module.exports = router