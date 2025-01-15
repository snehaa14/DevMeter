import express from 'express';
import cors from 'cors';
import axios from 'axios';
import mongoose from 'mongoose'; // For MongoDB connection
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import AuthRouter from './Routes/AuthRouter.js'
import LeetCodeRouter from './Routes/LeetCodeRouter.js'
import CodechefRouter from './Routes/CodechefRouter.js'
import CodeforcesRouter from './Routes/CodeforcesRouter.js'


import contestRoute from './Routes/contestRoutes.js'


const app = express();


// Middleware to parse incoming JSON requests
app.use(express.json());
dotenv.config();
app.use(cors());
app.use(bodyParser.json());




const port =process.env.PORT ;

//MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONN);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); 
  }
};


// Connect to MongoDB
connectDB();

app.use('/auth',AuthRouter);
app.use('/contest', contestRoute);

// Use the LeetCode router for any request to /leetcode
app.use('/leetcode', LeetCodeRouter);

// app.get('/codechef/:username
app.use('/codechef', CodechefRouter);

app.use('/codeforces',CodeforcesRouter);



// Define a route for the root URL ("/")
app.get('/', (req, res) => {
  res.send('Hello World!'); // Send a simple response
});




// Start the server and listen on the defined port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});