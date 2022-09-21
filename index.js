const express = require('express')
require("dotenv").config();
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000
app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.thykviz.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
  try {
    const serviceCollection = client.db("doctors_portal").collection("services");
    const bookingCollection = client.db("doctors_portal").collection("booking");
    app.get('/service', async(req, res) => {
      const query = { };
      const cursor = serviceCollection.find(query);
      const services = await cursor.toArray();
      res.send(services);
    })
    app.post('/booking',async(req, res)=>{
      const booking = req.body;
      const query = {treatment:booking.treatment, date:booking.date, patient:booking.patient}
      const exists = await bookingCollection.findOne(query);
      if(exists){
        return res.send({success:false, booking:exists})
      }
      const result = await bookingCollection.insertOne(booking);
      return res.send({success:true, result})
    })
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Starting doctor portal')
})

app.listen(port, () => {
  console.log(`Doctors portal listening on port ${port}`)
})