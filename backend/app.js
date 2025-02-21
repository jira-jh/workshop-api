const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors')

const app = express();
const port = 3000;
const mongoURI = 'mongodb+srv://nvcdb:nvcdb@nvc-db.4umby.mongodb.net/'; // เปลี่ยน URI ตามที่เราต้องการ
let db;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function connectDB() {
  const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  db = client.db("00-sorawit"); // เปลี่ยนชื่อ Database ตามที่เราต้องการ
  console.log("MongoDB Connected");
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

app.post('/products', async (req, res) => {
  if (!db) {
    return res.status(500).send("Database not connected");
  }

  if (!req.body) {
    return res.status(400).send("Request body is missing");
  }
  // if (!req.body.name || !req.body.category) {
  //   return res.status(400).send("Missing required fields");
  // }
  const collection = db.collection("products");
  const data = req.body;
  await collection.insertOne(data);
  res.json({ message: "Product added" });
})

app.get('/products', async (req, res) => {
  if (!db) {
    return res.status(500).send("Database not connected");
  }
  const collection = db.collection("products");
  const data = await collection.find({}).toArray();
  res.json(data);
});

app.get('/products/:id', async (req, res) => {
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
