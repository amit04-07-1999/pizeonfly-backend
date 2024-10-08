const express = require('express');
const Message = require('../model/taskMessageModel');
const router = express.Router();

// Create a message
router.post('/taskMessage', async (req, res) => {
  const { content, senderId, taskId } = req.body;

  try {
    const message = new Message({ content, senderId, taskId });
    await message.save();
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: 'Error creating message', error });
  }
});

// Get messages for a task
router.get('/taskMessages/:taskId', async (req, res) => {
  try {
    const messages = await Message.find({ taskId: req.params.taskId });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching messages', error });
  }
});



module.exports = router;
