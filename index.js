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
    const classCollection = client.db('ananda').collection('class')
    const bookingCollection = client.db('ananda').collection('booking')
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
        // console.log(result);
        res.send(result)
      })
      // get instructor
      app.get('/instructor',async(req,res)=>{
        const query={role:"instructor"};
        const result=await usersCollection.find(query).toArray();
        res.send(result)
      })
        
      // get user as role
      app.get('/users/:email',async(req,res)=>{
        const email=req.params.email;
        const query={email:email}
        const result=await usersCollection.findOne(query)
        res.send(result)
      })
    

      // add class to database
      app.post('/class',async(req,res)=>{
        const data=req.body;
        const result=await classCollection.insertOne(data);
        res.send(result)
      })
      

      // get class by id
      app.put('/class/:id',async(req,res)=>{
        const id=req.params.id;
        const currentStatus=req.body;
        const filter={_id:new ObjectId(id)};
        const options={upsert:true}
        const updateDoc={
          $set:currentStatus
        }
        const result=await classCollection.updateOne(filter,updateDoc,options);
        // console.log(result);
        res.send(result)
      })
   


      // get all users
      app.get('/users',async(req,res)=>{
        const result=await usersCollection.find().toArray();
        res.send(result)
      })
      // get all classes
      app.get('/class',async(req,res)=>{
        const result=await classCollection.find().toArray();
        res.send(result)
      })
      // get all approved classes
      app.get('/class/status',async(req,res)=>{
        const query={status:'Approved'}
        const result=await classCollection.find(query).toArray();
        res.send(result)
      })

      // select save to database
      app.post('/booking',async(req,res)=>{
        const data=req.body;
        const result=await bookingCollection.insertOne(data);
        res.send(result)
      })
      // get data from booking
      app.get('/booking',async(req,res)=>{
        const result=await bookingCollection.find().toArray();
        res.send(result)
      })
      // delete booking
      app.delete('/booking/:id',async(req,res)=>{
        const id=req.params.id;
        const query={_id:id};
        const result=await bookingCollection.deleteOne(query);
        res.send(result)

      })
    



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
  res.send('ananda Server is running..')
})

app.listen(port, () => {
  console.log(`ananda is running on port ${port}`)
})