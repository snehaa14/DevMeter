import express from 'express';
import axios from 'axios';
const router = express.Router();

// Endpoint to fetch Codeforces data
router.get('/:handle', async (req, res) => {
  // console.log("hello kitty");
    // const { handle } = req.params;
    
  const handle = req.params.handle;
console.log('handle is : ',handle);
  const urlInfo = `https://codeforces.com/api/user.info?handles=${handle}`;
  const urlRating = `https://codeforces.com/api/user.rating?handle=${handle}`;
  const urlStatus = `https://codeforces.com/api/user.status?handle=${handle}&from=1&count=1000000000`;
  // console.log(urlInfo,urlRating,urlStatus);
  try {
    const [userInfoResponse, userRatingResponse, userStatusResponse] = await Promise.all([
      axios.get(urlInfo),
      axios.get(urlRating),
      axios.get(urlStatus),
    ]);

    const userInfo = userInfoResponse.data.result[0];
    const userRating = userRatingResponse.data.result;
    const userStatus = userStatusResponse.data.result;

    // console.log('userInfo is : ',userInfo);
    // console.log('userRating is : ',userRating);
    // console.log('userStatus is : ',userStatus);

   return res.json({ userInfo, userRating, userStatus });
  } 
  catch (error) {
     return res.status(500).json({ error: 'Error fetching data from Codeforces API' });
  }
});

export default router;
