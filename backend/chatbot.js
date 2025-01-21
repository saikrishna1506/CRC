const express = require('express');
const mongoose = require('mongoose');
const tf = require('@tensorflow/tfjs');
const use = require('@tensorflow-models/universal-sentence-encoder');
const bodyParser = require('body-parser');
const cors = require('cors');
const { intents } = require('./intents');
const { responses } = require('./responses');

// Mongoose connection setup
const mongoURI = "mongodb://localhost:27017/CRCBOT";

let isDbConnected = false;
let model; // To hold the loaded Universal Sentence Encoder model

// Ensure database connection
async function connectToDatabase() {
  if (!isDbConnected) {
    try {
      await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
      console.log('Connected to MongoDB');
      isDbConnected = true;
    } catch (err) {
      console.error('Failed to connect to MongoDB', err);
    }
  }
}

// Ensure model loading
async function loadModel() {
  if (!model) {
    try {
      model = await use.load();
      console.log('Universal Sentence Encoder model loaded');
    } catch (err) {
      console.error('Failed to load Universal Sentence Encoder model', err);
    }
  }
}

let userContext = {
  waitingFor: null, // Can be "subject", "semester", "year"
  subject: null,
  year: null,
  semester: null
};

// Recognize intent using Universal Sentence Encoder
async function recognizeIntent(userInput) {
  const userInputEmb = await model.embed([userInput]);
  let maxScore = -1;
  let recognizedIntent = null;

  for (const [intent, examples] of Object.entries(intents)) {
    const examplesEmb = await model.embed(examples);
    const scores = await tf.matMul(userInputEmb, examplesEmb, false, true).data();
    const maxExampleScore = Math.max(...scores);
    if (maxExampleScore > maxScore) {
      maxScore = maxExampleScore;
      recognizedIntent = intent;
    }
  }

  return recognizedIntent;
}

// Define paper schema and fetch papers from MongoDB
const paperSchema = new mongoose.Schema({
  subject: String,
  year: Number,
  semester: Number,
  link: String,
});

const Paper = mongoose.model('papers', paperSchema);

async function fetchPapers(subject, year, semester) {
  try {
    const papers = await Paper.find({ subject, year, semester });
    if (papers.length === 0) {
      return `No papers found for subject: ${subject}, year: ${year}, semester: ${semester}.`;
    }
    return papers.map(paper => paper.link).join('\n');
  } catch (err) {
    console.error('Error fetching papers', err);
    return "An error occurred while fetching papers. Please try again later.";
  }
}

// Express setup
const app = express();

// Enable CORS for all routes
app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST"],
  credentials: true,
}));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json("Hello! The server is running.");
});

// API to handle chatbot interaction
app.post('/chat', async (req, res) => {
  try {
    // Ensure DB connection and model loading
    await connectToDatabase();
    await loadModel();

    const userInput = req.body.message.trim();

    if (userContext.waitingFor === 'subject') {
      userContext.subject = userInput;
      userContext.waitingFor = 'semester';
      return res.json({ response: 'Please tell me the semester (e.g., 1, 2, 3, etc.):' });
    }

    if (userContext.waitingFor === 'semester') {
      userContext.semester = userInput;
      userContext.waitingFor = 'year';
      return res.json({ response: 'Please tell me the year (e.g., 2022):' });
    }

    if (userContext.waitingFor === 'year') {
      userContext.year = userInput;
      const { subject, year, semester } = userContext;
      userContext = {}; // Reset context
      const papers = await fetchPapers(subject, year, semester);
      return res.json({ response: papers });
    }

    if (userInput.toLowerCase() === 'quit') {
      return res.json({ response: 'Goodbye!' });
    }

    const intent = await recognizeIntent(userInput);
    if (intent === 'fetch_papers') {
      userContext.waitingFor = 'subject';
      return res.json({ response: 'Please tell me the subject (e.g., Mathematics, Physics, etc.):' });
    }

    if (intent && responses[intent]) {
      return res.json({ response: responses[intent] });
    } else {
      return res.json({ response: "I'm sorry, I don't understand that. Can you please rephrase?" });
    }
  } catch (error) {
    console.error('Error in /chat route:', error);
    res.status(500).json({ response: 'An error occurred. Please try again later.' });
  }
});

// Export for Vercel serverless functions
module.exports = app;

app.listen(3001, async () => {
  // await connectToDatabase();
  // await loadModel();
  console.log('Server running on http://localhost:3001');
});
