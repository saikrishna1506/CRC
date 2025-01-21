const mongoose = require('mongoose');

// MongoDB URI
const mongoURI = "mongodb://localhost:27017/CRCBOT";

// Paper schema and model
const paperSchema = new mongoose.Schema({
  subject: String,
  year: Number,
  semester: Number,
  link: String,
});

const Paper = mongoose.model('papers', paperSchema);

// Function to insert multiple papers directly into the database
async function insertPapers() {
  try {
    // Array of papers to insert
    const papers = [
      {
        subject: "Mathematics",
        year: 2022,
        semester: 1,
        link: "https://example.com/math2022"
      },
      {
        subject: "Physics",
        year: 2022,
        semester: 1,
        link: "https://example.com/physics2022"
      },
      {
        subject: "Chemistry",
        year: 2021,
        semester: 2,
        link: "https://example.com/chemistry2021"
      }
    ];

    // Insert all papers into the database
    const result = await Paper.insertMany(papers);
    console.log(`${result.length} papers inserted successfully.`);
  } catch (error) {
    console.error('Error inserting papers:', error);
  }
}

// Connect to MongoDB and insert papers
async function connectToDatabase() {
  try {
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB with Mongoose');
    
    // Insert papers after connecting to the database
    await insertPapers();
  } catch (err) {
    console.error('Failed to connect to MongoDB with Mongoose', err);
  }
}

// Initialize everything
connectToDatabase();
