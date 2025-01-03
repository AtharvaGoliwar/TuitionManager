const express = require('express')
require('dotenv').config()
const { MongoClient, ObjectId } = require('mongodb')
const cors = require('cors')

const app = express();

const corsOptions = {
    origin: 'http://localhost:5174', // Replace with your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed HTTP methods
    credentials: true, // If you need to send cookies
  };

app.use(cors(corsOptions))
app.use(express.json())
const uri = process.env.URI
const client = new MongoClient(uri)
let db,collection

async function connectToDB() {
    try {
      await client.connect();
      console.log('Connected to MongoDB');
      db = client.db(process.env.DBNAME); // Replace with your database name
      collection = db.collection(process.env.COLLECTION); // Replace with your collection name
    } catch (err) {
      console.error('Database connection failed:', err);
      process.exit(1);
    }
  }
  
  connectToDB();


app.get('/',async (req,res)=>{
    try{
        const data = await collection.find().toArray()
        res.json(data)
    }catch(err){
        console.log(err)
        res.status(500).send('error')
    }
})

app.get('/getInfo/:id',async (req,res)=>{
    const id = req.params.id
    try{
        let result = await collection.findOne({_id:new ObjectId(id)})
        res.status(200).json({message:"data extraction successful",item:result})
    }catch(err){
        console.log(err)
        res.status(401).json({message:"error in fetching data"})
    }
})

app.post('/addStudent',async (req,res)=>{
    const { name,date} = req.body
    // console.log(req.body)
    try{
        const result = await collection.insertOne({name:name, date:date, attendance:{}})
        res.status(201).json({message:"user insertion successful",id:result.insertedId})
    }catch(err){
        console.log(err)
        res.status(500).json({ message: 'Internal server error' });
    }
})

app.delete('/deletestudent/:id',async (req,res)=>{
    const abc = req.params.id
    try{
        const result0 = await collection.deleteOne({_id:new ObjectId(abc)})
        res.json({message:"deletion successfull",id:abc})
    }catch(err){
        console.log(err)
        res.status(500).json({message:'error in deletion'})
    }
})

app.put('/submit',async (req,res)=>{
    const { data, stateArr, selectedDate } = req.body
    try{   
        const bulkOps = data.map((item,index)=>{
            item.attendance[selectedDate] = stateArr[index]
            return {
                updateOne: {
                    filter: {name: item.name},
                    update: {$set: {attendance: item.attendance}}
                }
            }
        })
        const result = await collection.bulkWrite(bulkOps)
        if (result.modifiedCount > 0) {
            res.status(200).json({ message: `${result.modifiedCount} documents updated successfully.` });
          } else {
            res.status(400).json({ message: 'No documents were updated.' });
          }
    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
})

app.listen(process.env.PORT,()=>{
    console.log("connected to backend")
})