// routes/contestRoutes.js
const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/upcoming-contest', async (req, res) => {
  try {
    const today = new Date().toISOString().split('.')[0];
    console.log(today);
    const response = await axios.get(`https://clist.by:443/api/v4/contest/?start__gte=${today}&order_by=start`, {
      headers: {
        'Authorization': `ApiKey ${process.env.CLIST_API}`
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching contest data', error: error.response?.data || error.message });
  }
});

module.exports = router;
