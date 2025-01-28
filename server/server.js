const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('ws');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/chats', {}).then(() => console.log('Connected to MongoDB'))
  .catch((e) => console.log('MongoDB connection error:', e));

const chatSchema = new mongoose.Schema({
  name: String,
  message: String,
  timestamp: { type: Date, default: Date.now },
});

const Chat = mongoose.model('Chat', chatSchema);

app.get('/api/chat', async (req, res) => {
  try {
    const chats = await Chat.find().sort({ timestamp: 1 });
    res.json(chats);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching chat data' });
  }
});

app.post('/api/chat', async (req, res) => {
  const { name, message } = req.body;
  
  try {
    const newChat = new Chat({ name, message });
    await newChat.save();
    
    const updatedChats = await Chat.find().sort({ timestamp: 1 });
    wss.clients.forEach((client) => {
      if (client.readyState === 1) { // WebSocket.OPEN
        client.send(JSON.stringify({ chats: updatedChats, userCount }));
      }
    });
    
    res.json(updatedChats);
  } catch (err) {
    res.status(500).json({ message: 'Error saving chat message' });
  }
});

const server = http.createServer(app);
const wss = new Server({ server });

let userCount = 0;

wss.on('connection', async (ws) => {
  console.log('WebSocket connection established');
  userCount++;
  
  try {
    const chats = await Chat.find().sort({ timestamp: 1 });
    ws.send(JSON.stringify({ chats, userCount }));
  } catch (err) {
    console.error('Error fetching chats for WebSocket client:', err);
  }
  
  wss.clients.forEach((client) => {
    if (client.readyState === 1) {
      client.send(JSON.stringify({ userCount }));
    }
  });
  
  ws.on('message', async (message) => {
    try {
      const { name, message: text } = JSON.parse(message);
      const newChat = new Chat({ name, message: text });
      await newChat.save();
      
      const updatedChats = await Chat.find().sort({ timestamp: 1 });
      wss.clients.forEach((client) => {
        if (client.readyState === 1) {
          client.send(JSON.stringify({ chats: updatedChats, userCount }));
        }
      });
    } catch (err) {
      console.error('Error processing message:', err);
    }
  });
  
  ws.on('close', () => {
    console.log('WebSocket connection closed');
    userCount--;
    
    wss.clients.forEach((client) => {
      if (client.readyState === 1) {
        client.send(JSON.stringify({ userCount }));
      }
    });
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
