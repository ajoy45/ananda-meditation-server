const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const port = process.env.PORT || 5000

// middleware
app.use(cors())
app.use(express.json())

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.4igohl8.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})
// user:ajoy
// pass:girEZ1SqmpWGVeSW
async function run() {
  try {
    const usersCollection = client.db('ananda').collection('users')
    // const roomsCollection = client.db('aircncDb').collection('rooms')
    // const bookingsCollection = client.db('aircncDb').collection('bookings')

    // user save to database
      app.put('/users/:email',async(req,res)=>{
        const email=req.params.email;
        const user=req.body;
        const filter={email:email};
        const options={upsert:true}
        const updateDoc={
          $set:user
        }
        const result=await usersCollection.updateOne(filter,updateDoc,options);
        console.log(result);
        res.send(result)
      })


    //   // get user as role
    //   app.get('/users/:email',async(req,res)=>{
    //     const email=req.params.email;
    //     const query={email:email}
    //     const result=await usersCollection.findOne(query)
    //     res.send(result)
    //   })


    //   // add rooms to database
    //   app.post('/rooms',async(req,res)=>{
    //     const rooms=req.body;
    //     const result=await roomsCollection.insertOne(rooms);
    //     res.send(result)
    //   })


    //   // update rooms booking status
    //   app.patch('/rooms/status/:id',async(req,res)=>{
    //     const id=req.params.id;
    //     const status=req.body.status;
    //     const query={_id:new ObjectId(id)}
    //     const updateDoc={
    //       $set:{
    //         booked:status
    //       }
    //     }
    //     const result=await roomsCollection.updateOne(query,updateDoc);
    //     res.send(result)
    //   })


    //   // get all rooms
    //   app.get('/rooms',async(req,res)=>{
    //     const result=await roomsCollection.find().toArray();
    //     res.send(result)
    //   })


    //   // get host room
    //   app.get('/rooms/:email',async(req,res)=>{
    //     const email=req.params.email;
    //     const query={'host':email}
    //     const result=await roomsCollection.find().toArray();
    //     res.send(result)
    //   })


    //   // get single room
    //   app.get('/room/:id',async(req,res)=>{
    //     const id=req.params.id;
    //     const query={_id:new ObjectId(id)}
    //     const result=await roomsCollection.findOne(query)
    //     res.send(result)
    //   })


    //   // booking save to database
    //   app.post('/booking',async(req,res)=>{
    //     const booking=req.body;
    //     const result=await bookingsCollection.insertOne(booking);
    //     res.send(result)
    //   })



    //   // get bookings by query
    //   app.get('/bookings',async(req,res)=>{
    //     const email=req.query.email;
    //     if(!email){
    //       res.send([])
    //     }
    //     const query={'guest.email':email}
    //     const result=await bookingsCollection.find(query).toArray();
    //     res.send(result)
    //   })


    //   // delete booking by id
    //   app.delete('/bookings/:id',async(req,res)=>{
    //       const id=req.params.id;
    //       const query={_id:new ObjectId(id)}
    //       const result=await bookingsCollection.deleteOne(query)
    //       res.send(result)
    //   })



    // Send a ping to confirm a successful connection
    await client.db('admin').command({ ping: 1 })
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!'
    )
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir)

app.get('/', (req, res) => {
  res.send('AirCNC Server is running..')
})

app.listen(port, () => {
  console.log(`AirCNC is running on port ${port}`)
})