import express from 'express';
import cors from 'cors';
import axios from 'axios';
import mongoose from 'mongoose'; // For MongoDB connection
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import AuthRouter from './Routes/AuthRouter.js'


import contestRoute from './Routes/contestRoutes.js'

const app = express();


// Middleware to parse incoming JSON requests
app.use(express.json());
dotenv.config();
app.use(cors());
app.use(bodyParser.json());




const port =process.env.PORT ;

// MongoDB connection
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





// LeetCode GraphQL Query
const query = `
  query getUserProfile($username: String!) {
    allQuestionsCount {
      difficulty
      count
    }
    matchedUser(username: $username) {
      username
      contributions {
        points
      }
      profile {
        reputation
        ranking
        realName
        aboutMe
        userAvatar
        location
        skillTags
        websites
        company
        school
        starRating
      }
      submissionCalendar
      submitStats {
        acSubmissionNum {
          difficulty
          count
          submissions
        }
        totalSubmissionNum {
          difficulty
          count
          submissions
        }
      }
      badges {
        id
        displayName
        icon
        creationDate
      }
    }
    recentSubmissionList(username: $username, limit: 20) {
      title
      titleSlug
      timestamp
      statusDisplay
      lang
      runtime
      memory
      url
      __typename
    }
    userContestRanking(username: $username) {
      attendedContestsCount
      rating
      globalRanking
      totalParticipants
      topPercentage
      badge {
        name
        icon
      }
    }
  }
`;

// Function to format LeetCode data
const formatData = (data) => {
  return {
    username: data.matchedUser.username,
    totalSolved: data.matchedUser.submitStats.acSubmissionNum[0].count,
    totalSubmissions: data.matchedUser.submitStats.totalSubmissionNum[0].count,
    totalQuestions: data.allQuestionsCount[0].count,
    easySolved: data.matchedUser.submitStats.acSubmissionNum[1].count,
    totalEasy: data.allQuestionsCount[1].count,
    mediumSolved: data.matchedUser.submitStats.acSubmissionNum[2].count,
    totalMedium: data.allQuestionsCount[2].count,
    hardSolved: data.matchedUser.submitStats.acSubmissionNum[3].count,
    totalHard: data.allQuestionsCount[3].count,
    ranking: data.matchedUser.profile.ranking,
    contributionPoints: data.matchedUser.contributions.points,
    reputation: data.matchedUser.profile.reputation,
    submissionCalendar: JSON.parse(data.matchedUser.submissionCalendar),
    recentSubmissions: data.recentSubmissionList,
    profile: {
      realName: data.matchedUser.profile.realName,
      aboutMe: data.matchedUser.profile.aboutMe,
      userAvatar: data.matchedUser.profile.userAvatar,
      location: data.matchedUser.profile.location,
      skillTags: data.matchedUser.profile.skillTags,
      websites: data.matchedUser.profile.websites,
      company: data.matchedUser.profile.company,
      school: data.matchedUser.profile.school,
      starRating: data.matchedUser.profile.starRating,
    },
    badges: data.matchedUser.badges,
    contestRanking: data.userContestRanking,
  };
};

// Endpoint to fetch LeetCode data
app.get('/leetcode/:username', (req, res) => {
  const { username } = req.params;

  fetch('https://leetcode.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Referer': 'https://leetcode.com',
    },
    body: JSON.stringify({
      query: query,
      variables: { username: username },
    }),
  })
  .then((result) => result.json())
  .then((data) => {
    if (data.errors) {
      console.error(data.errors);  // Log more detailed errors from LeetCode
      res.status(500).send(data.errors);
    } else {
      res.status(200).send(formatData(data.data));
    }
  })
  .catch((err) => {
    console.error('Fetch Error:', err);
    res.status(500).send('Error fetching data');
  });
  
});






// Define a route for the root URL ("/")
app.get('/', (req, res) => {
  res.send('Hello World!'); // Send a simple response
});




// Start the server and listen on the defined port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
