// codechefRouter.js
const express = require('express');
const axios = require('axios');

const codechefRouter = express.Router();

codechefRouter.get('/:username', async (req, res) => {
  const { username } = req.params;

  try {
    // Fetch data from CodeChef API
    console.log("username: ", username);
    const response = await axios.get(`https://codechef-api.vercel.app/handle/${username}`);
    const data = response.data;
    res.json(data);
  } catch (error) {
    console.error('Error fetching data from CodeChef API:', error.message);
    res.status(500).json({ error: 'Error fetching data from CodeChef API' });
  }
});

export default router;  
