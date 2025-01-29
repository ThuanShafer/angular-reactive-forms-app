const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('ws');
const { MongoClient } = require('mongodb');

// App setup
const app = express();
app.use(express.json());
app.use(cors());

const mongoUri = 'mongodb://chatadmin:1qaz2wsx@chat-room-101.cluster-cbku282k01wo.ap-southeast-1.docdb.amazonaws.com:27017/?replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false';
const dbName = 'chats';
const collectionName = 'messages';

let db, chatCollection;

MongoClient.connect(mongoUri)
  .then((client) => {
    db = client.db(dbName);
    chatCollection = db.collection(collectionName);
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
});

app.get('/api/chat', async (req, res) => {
  try {
    const chats = await chatCollection.find().sort({ timestamp: 1 }).toArray();
    res.json(chats);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching chat data' });
  }
});

app.post('/api/chat', async (req, res) => {
  const { name, message } = req.body;
  const timestamp = new Date();
  
  try {
    await chatCollection.insertOne({ name, message, timestamp });
    
    const updatedChats = await chatCollection.find().sort({ timestamp: 1 }).toArray();
    broadcastMessage({ chats: updatedChats, userCount });
    
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
    const chats = await chatCollection.find().sort({ timestamp: 1 }).toArray();
    ws.send(JSON.stringify({ chats, userCount }));
  } catch (err) {
    console.error('Error fetching chats for WebSocket client:', err);
  }
  
  broadcastMessage({ userCount });
  
  ws.on('message', async (message) => {
    try {
      const { name, message: text } = JSON.parse(message);
      const timestamp = new Date();
      await chatCollection.insertOne({ name, message: text, timestamp });
      
      const updatedChats = await chatCollection.find().sort({ timestamp: 1 }).toArray();
      broadcastMessage({ chats: updatedChats, userCount });
    } catch (err) {
      console.error('Error processing message:', err);
    }
  });
  
  ws.on('close', () => {
    console.log('WebSocket connection closed');
    userCount--;
    broadcastMessage({ userCount });
  });
});

function broadcastMessage(data) {
  wss.clients.forEach((client) => {
    if (client.readyState === 1) {
      client.send(JSON.stringify(data));
    }
  });
}

const PORT = process.env.PORT || 3000;
server.listen(PORT, 'ec2-13-250-46-200.ap-southeast-1.compute.amazonaws.com', () => {
  console.log(`Server running on port ${PORT}`);
});
