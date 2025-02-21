const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors')

const app = express();
const port = 3000;
const mongoURI = 'mongodb://localhost:27017/'; // เปลี่ยน URI ตามที่เราต้องการ
let db;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function connectDB() {
  const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  db = client.db("stores"); // เปลี่ยนชื่อ Database ตามที่เราต้องการ
  console.log("MongoDB Connected");
}


const findLastId = async () => {
  const collection = db.collection("stores"); // เปลี่ยนชื่อ Collection ตามที่เราต้องการ
  const lastStore = await collection.find().sort({ id: -1 }).limit(1).toArray();
  return lastStore.length > 0 ? lastStore[0].id : 0;
}


app.delete('/products/delete/:id', async (req, res) => {
  if (!db) {
    return res.status(500).send("Database not connected");
  }
  const productId = parseInt(req.params.id);
  const collection = db.collection("products"); // เปลี่ยนชื่อ Collection ตามที่เราต้องการ
  await collection.deleteOne({ id: productId });
  res.json({ message: "Product deleted" });
})

app.put('/products/update/:id', async (req, res) => {
  if (!db) {
    return res.status(500).send("Database not connected");
  }
  if (!req.body) {
    return res.status(400).send("Request body is missing");
  }
  if (!req.body.name || !req.body.category) {
    return res.status(400).send("Missing required fields");
  }
  const productId = parseInt(req.params.id);
  const collection = db.collection("products"); // เปลี่ยนชื่อ Collection ตามที่เราต้องการ
  await collection.updateOne({ id: productId }, { $set: req.body });
  res.json({ message: "Product updated" });
})

app.post('/products/add', async (req, res) => {
  if (!db) {
    return res.status(500).send("Database not connected");
  }

  if (!req.body) {
    return res.status(400).send("Request body is missing");
  }
  if (!req.body.name || !req.body.category) {
    return res.status(400).send("Missing required fields");
  }
  const collection = db.collection("products");
  const lastId = await findLastId();
  req.body.id = lastId + 1;
  const data = req.body;
  await collection.insertOne(data);
  res.json({ message: "Product added" });
})

app.get('/products/list', async (req, res) => {
  if (!db) {
    return res.status(500).send("Database not connected");
  }
  const collection = db.collection("products");
  const data = await collection.find({}).toArray();
  res.json(data);
});

app.get('/products/detail/:id', async (req, res) => {
  if (!db) {
    return res.status(500).send("Database not connected");
  }
  const productId = parseInt(req.params.id);
  const collection = db.collection("products");
  const data = await collection.find({ id: productId }).toArray();
  res.json(data);
});


connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}).catch(err => console.error("MongoDB connection error:", err));
