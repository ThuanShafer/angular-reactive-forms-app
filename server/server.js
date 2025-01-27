const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const constants = require("constants.ts");

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect(constants.aws_doc_db_con_str, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const chatSchema = new mongoose.Schema({
  name: String,
  message: String,
  timestamp: { type: Date, default: Date.now },
});

const Chat = mongoose.model('Chat', chatSchema);

// API Endpoints
app.get('/api/chat', async (req, res) => {
  const chats = await Chat.find().sort({ timestamp: 1 });
  res.json(chats);
});

app.post('/api/chat', async (req, res) => {
  const { name, message } = req.body;
  const newChat = new Chat({ name, message });
  await newChat.save();
  const chats = await Chat.find().sort({ timestamp: 1 });
  res.json(chats);
});

// Start Server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
