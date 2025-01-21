const express = require('express');
const mongoose = require('mongoose');
const tf = require('@tensorflow/tfjs');
const use = require('@tensorflow-models/universal-sentence-encoder');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors
const { intents } = require('./intents');
const { responses } = require('./responses');

// Mongoose connection setup
const mongoURI = "mongodb://localhost:27017/CRCBOT";

async function connectToDatabase() {
  try {
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB with Mongoose');
  } catch (err) {
    console.error('Failed to connect to MongoDB with Mongoose', err);
  }
}

// Load Universal Sentence Encoder model
let model;
async function loadModel() {
  try {
    model = await use.load();
    console.log('Model loaded');
  } catch (err) {
    console.error('Failed to load model', err);
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
app.use(cors()); // Add this line to enable CORS

app.use(bodyParser.json());
app.get('/',(req,res)=>{
  return res.json({ response: 'Hello World!' });
})
// API to handle chatbot interaction
app.post('/chat', async (req, res) => {
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
});

// Start the server
app.listen(3001, async () => {
  await connectToDatabase();
  await loadModel();
  console.log('Server running on http://localhost:3001');
});
