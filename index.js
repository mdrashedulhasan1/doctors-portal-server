const express = require('express')
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000


const uri = "mongodb+srv://doctor_admin:N05DzdjLvAIhp0BT@cluster0.thykviz.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Starting doctor portal')
})

app.listen(port, () => {
  console.log(`Doctors portal listening on port ${port}`)
})