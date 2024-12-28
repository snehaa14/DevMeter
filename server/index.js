// Importing required modules using import
import express from 'express';

const app = express();
const port = 3000; // Define your port

// Middleware to parse incoming JSON requests
app.use(express.json());

// Define a route for the root URL ("/")
app.get('/', (req, res) => {
  res.send('Hello World!'); // Send a simple response
});



// Start the server and listen on the defined port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
