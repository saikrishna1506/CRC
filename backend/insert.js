const mongoose = require('mongoose');

// MongoDB URI
const mongoURI = "mongodb://localhost:27017/CRCBOT";
// mongodb://localhost:27017/CRCBOT
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
        subject: "CLOUD COMPUTING",
        year: 2023,
        semester: 1,
        link: "https://www.aceec.ac.in/index.php?gf-download=2023%2F05%2FCLOUD-COMPUTING.pdf&form-id=1&field-id=7&hash=e264928932b6a87263c6ff54330e45d9affcb48e1e9d1417ba417756c5f21568"
      },
      {
        subject: "CRYPTOGRAPHY AND NETWORK SECURITY",
        year: 2023,
        semester: 1,
        link: "https://www.aceec.ac.in/index.php?gf-download=2023%2F05%2FCRYPTOGRAPHY-AND-NETWORK-SECURITY.pdf&form-id=1&field-id=7&hash=73e2ac9efd5221bb5bfc4d1da61106b858f91c6f82373be8838e41ff1f1b7058"
      },
      {
        subject: "DATA MINING",
        year: 2023,
        semester: 1,
        link: "https://www.aceec.ac.in/index.php?gf-download=2024%2F03%2FDATA-MINING-CSE-IT.pdf&form-id=1&field-id=7&hash=33d1845041db07421023e5e3323f66d52075b196e107201e608cb7f6df281403"
      },
      {
        subject: "CLOUD COMPUTING",
        year: 2024,
        semester: 1,
        link: "https://www.aceec.ac.in/index.php?gf-download=2024%2F03%2FCLOUD-COMPUTING-CSE-IT-CSM.pdf&form-id=1&field-id=7&hash=424e0f5984d6259a592c8226697bc069d3e19b52fc8f9c2a1fad35cbf2c87637"
      },
      {
        subject: "REMOTE SENSING &GIS",
        year: 2023,
        semester: 1,
        link: "https://www.aceec.ac.in/index.php?gf-download=2024%2F03%2FREMOTE-SENSING-GIS-CSECSD-CSO.pdf&form-id=1&field-id=7&hash=40a199d05877429627c286c604a08166be06e478c48277acc34d3915d89e5912"
      },
      {
        subject: "SOFTWARE PROCESS & PROJECT MANAGEMENT",
        year: 2023,
        semester: 1,
        link: "https://www.aceec.ac.in/index.php?gf-download=2024%2F03%2FSOFTWARE-PROCESS-PROJECT-MANAGEMENT-CSE.pdf&form-id=1&field-id=7&hash=97675e206cb264d20a46f75fe040bb554e7f15fcf46696442082d7d0a01efa04"
      },
      {
        subject: "CRYPTOGRAPHY & NETWORK SECURITY",
        year: 2023,
        semester: 1,
        link: "https://www.aceec.ac.in/index.php?gf-download=2024%2F03%2FCRYPTOGRAPHY-NETWORK-SECURITY-CSE.pdf&form-id=1&field-id=7&hash=ece191361c0640143974ac44966176a0acebd82c9c2aa797f78c40070d8a03bf"
      },
      {
        subject: "DISTRIBUTED SYSTEMS",
        year:2023,
        semester: 2,
        link: "https://www.aceec.ac.in/index.php?gf-download=2023%2F08%2FDISTRIBUTED-SYSTEMSCSEIT.pdf&form-id=1&field-id=7&hash=f2ef7fd6983787236abcea4ac29e46271e20606037549006d34fcf7f28be3ea5"
      },
      {
        subject: "ENVIRONMENTAL IMPACT ASSESSMENT",
        year: 2024,
        semester: 2,
        link: "https://www.aceec.ac.in/index.php?gf-download=2024%2F12%2FENVIRONMENTAL-IMPACT-ASSESSMENT-CSE-CSO.pdf&form-id=1&field-id=7&hash=d8d368db7daa463eb077c68dd6bc489ea8eb30823e67b90a867aafbd35097b74"
      },
       {
        subject: "HUMAN COMPUTER INTERACTION ",
        year: 2024,
        semester: 2,
        link: "https://www.aceec.ac.in/index.php?gf-download=2024%2F12%2FENVIRONMENTAL-IMPACT-ASSESSMENT-CSE-CSO.pdf&form-id=1&field-id=7&hash=d8d368db7daa463eb077c68dd6bc489ea8eb30823e67b90a867aafbd35097b74"
      },
       {
        subject: "NON CONVENTIONAL SOURCES OF ENERGY",
        year: 2023,
        semester: 2,
        link: "https://www.aceec.ac.in/index.php?gf-download=2023%2F08%2FNON-CONVENTIONAL-SOURCES-OF-ENERGYIT-EEE-CSE-ITE.pdf&form-id=1&field-id=7&hash=24682562019b1f4120d22488b9b945c53c3b4257a461c25df0bd678d22006463"
      },
      {
        subject: "ORGANIZATIONAL BEHAVIOUR",
        year: 2024,
        semester: 2,
        link: "https://www.aceec.ac.in/index.php?gf-download=2024%2F12%2FORGANIZATIONAL-BEHAVIOUR-CSE-IT-CSM-CSD-CSO.pdf&form-id=1&field-id=7&hash=0556272c3aeb4fffedf7311d09cf5bf7c0"
      },
      {
        subject: "ARTIFICIAL INTELLIGENCE",
        year: 2023,
        semester: 1,
        link: "https://www.aceec.ac.in/index.php?gf-download=2023%2F08%2FARTIFICIAL-INTELLIGENCECSD-CSE.pdf&form-id=1&field-id=7&hash=907493e78afa9b6580fc9839a43e4ab9038ed66aca8f18f1959340405bc68857"
      },
      {
        subject: "DISTRIBUTED SYSTEMS",
        year: 2024,
        semester: 1,
        link: "https://www.aceec.ac.in/index.php?gf-download=2025%2F01%2FCOMPUTER-NETWORKSCSE-CSM-CSD-CSO.pdf&form-id=1&field-id=7&hash=e04d30537038eac605e76ceb0deb4c36432765b3dc61240d0698047833120597"
      },
      {
        subject: "BUSINESS ECONOMICS FINANCIAL ANALYSIS",
        year: 2024,
        semester: 2,
        link: "https://www.aceec.ac.in/index.php?gf-download=2025%2F01%2FBUSINESS-ECONOMICS-FINANCIAL-ANALYSISCSEIT-CSDACER22.pdf&form-id=1&field-id=7&hash=5523a68806374dc597cc79f1e2c76e70170f6a75392edcbf30af0fa946638000"
      },
      {
        subject: "COMPILER DESIGN",
        year: 2024,
        semester: 2,
        link: "https://www.aceec.ac.in/index.php?gf-download=2025%2F01%2FCOMPIL11.PDF&form-id=1&field-id=7&hash=3854d49f361c6a53bed0bda6d12dec41b105c794cc0a20bf1b9df7f7ca50b1a0"
      },
      {
        subject: "ANALOG AND DIGITAL ELECTRONICS",
        year: 2024,
        semester: 1,
        link: "https://www.aceec.ac.in/index.php?gf-download=2025%2F01%2FANALOG-AND-DIGITAL-ELECTRONICSCSE-ITACER20.pdf&form-id=1&field-id=7&hash=972da25a9d8b79030d0baabf31c54c7c62bf323a0011665b1390077e378cac6e"
      },
      {
        subject: "COMPUTER ORGANIZATION and ARCHITECTURE",
        year: 2024,
        semester: 1,
        link: "https://www.aceec.ac.in/index.php?gf-download=2025%2F01%2FCOMPUT15.PDF&form-id=1&field-id=7&hash=314c2b92f681d34f2a6a9192838d1b0d199a0e8f9bdbf4d49103d9dc5fed81b8"
      },
      {
        subject: "COMPUTER ORIENTED STATISTICAL METHODS",
        year: 2024,
        semester: 1,
        link: "https://www.aceec.ac.in/index.php?gf-download=2025%2F01%2FCOMPUT21.PDF&form-id=1&field-id=7&hash=7f99910b81a11be276133ddbc9327aedbd7051f6ebf77012fab912ed03c05c2f"
      },
      {
        subject: "DATA STRUCTURES",
        year: 2024,
        semester: 1,
        link: "https://www.aceec.ac.in/index.php?gf-download=2025%2F01%2FDATAST1.PDF&form-id=1&field-id=7&hash=0fdbeb93dcb2f8930ea34981618f0c619450f8cd4fdcba2663e064d92b4d4c11"
      },
      {
        subject: "OBJECT ORIENTED PROGRAMMING THROUGH JAVA",
        year: 2024,
        semester: 1,
        link: "https://www.aceec.ac.in/index.php?gf-download=2025%2F01%2FOBJECT11.PDF&form-id=1&field-id=7&hash=516fda10de4159c307e8ae183a09438d00f0dbf352d6711a7841b9eee4cb8824"
      },
      {
        subject: "DATABASE MANAGEMENT SYSTEMS ",
        year: 2024,
        semester: 2,
        link: "https://www.aceec.ac.in/index.php?gf-download=2025%2F01%2FDATABA11.PDF&form-id=1&field-id=7&hash=19f7aa5f9bb8b2ed722038e7af4623c188a5aa9e4df40bfad07dba3851adb3a5"
      },
      {
        subject: "DISCRETE MATHEMATICS",
        year: 2024,
        semester: 2,
        link: "https://www.aceec.ac.in/index.php?gf-download=2025%2F01%2FDISCRETE-MATHEMATICS-CSE-IT-ACE-R20.pdf&form-id=1&field-id=7&hash=82d6cf3834e2070cf6a97c527a432aec7b9e79ecf1bba436093ef35c94f4bf6d"
      },
      {
        subject: "JAVA PROGRAMMING",
        year: 2023,
        semester: 2,
        link: "https://www.aceec.ac.in/index.php?gf-download=2023%2F05%2FJAVA-PROGRAMMING-CSEITCSMCSD-CSO.pdf&form-id=1&field-id=7&hash=ac75811704674105bfe6cc4957154c3ff40a9f1b46b19e4df20e8dbfa7c28a64"
      },
      {
        subject: "OPERATING SYSTEMS",
        year: 2024,
        semester: 1,
        link: "https://www.aceec.ac.in/index.php?gf-download=2025%2F01%2FOPERAT11.PDF&form-id=1&field-id=7&hash=1de7051d11843cec87e092ac62a054bf2d4a04bcf0e631bd001df5e5bebe5d64"
      },
      {
        subject: "SOFTWARE ENGINEERING",
        year: 2024,
        semester: 1,
        link: "https://www.aceec.ac.in/index.php?gf-download=2025%2F01%2FSOFTWARE-ENGINEERINGCSE-CSDACER22.pdf&form-id=1&field-id=7&hash=030a3ae7ccfea150a949e82daefb8c167c1221978a55f763c761206d07dbf8b2"
      },
      {
        subject: "APPLIED PHYSICS",
        year: 2024,
        semester: 1,
        link: "https://www.aceec.ac.in/index.php?gf-download=2025%2F01%2FAPPLIE11.PDF&form-id=1&field-id=7&hash=7a5dffb31abb04d5682a131768998db3bf73d10856b3dbc870548b11a1a95055"
      },
      {
        subject: "BASIC ELECTRICAL ENGINEERING",
        year: 2024,
        semester: 1,
        link: "https://www.aceec.ac.in/index.php?gf-download=2025%2F01%2FBASICE1.PDF&form-id=1&field-id=7&hash=ea959d9e1538e8d7e5df10f45ef92426777dce345128a4a98f4114fbde79af58"
      },
      {
        subject: "C PRGRAMMING AND DATA STRUCTURES",
        year: 2024,
        semester: 1,
        link: "https://www.aceec.ac.in/index.php?gf-download=2025%2F01%2FCPRGRA1.PDF&form-id=1&field-id=7&hash=1385d3e0aaf6c69165ffa3841c63d2402716d028ad960c416604d13d265a48ad"
      },
      {
        subject: "COMPUTER AIDED ENGINEERING GRAPHICS",
        year: 2023,
        semester: 1,
        link: "https://www.aceec.ac.in/index.php?gf-download=2023%2F05%2FCOMPUTER-AIDED-ENGINEERING-GRAPHICS-CSE.pdf&form-id=1&field-id=7&hash=827f8429bb1e27c5502bc61f47b824d7ef2bfdec206cdad99fee33ee1b453e14"
      },
      {
        subject: "APPLIED MECHANICS",
        year: 2024,
        semester: 2,
        link: "https://www.aceec.ac.in/index.php?gf-download=2024%2F12%2FAPPLIED-MECHANICSCEACER22.pdf&form-id=1&field-id=7&hash=db8d887758c36f82e57cda93679b2ed2fe81687636f857acf03cd44e60994b83"
      },
      {
        subject: "APPLIED PHYSICS",
        year: 2023,
        semester: 2,
        link: "https://www.aceec.ac.in/index.php?gf-download=2023%2F05%2FAPPLIED-PHYSICSEEE-CSE-IT-CSD.pdf&form-id=1&field-id=7&hash=686aa1b37211b0adc255a5a6fde572f60da4d3ea6c12498e542008e7004f634d"
      },
      {
        subject: "DIGITAL ELECTRONICS",
        year: 2024,
        semester: 2,
        link: "https://www.aceec.ac.in/index.php?gf-download=2025%2F01%2FDIGITA1.PDF&form-id=1&field-id=7&hash=390216e56ffef40069248570af9d69bdfe153da746313fdc6b949481e959ba6f"
      },
      {
        subject: "ENGINEERING CHEMISTRY",
        year: 2022,
        semester: 2,
        link: "https://www.aceec.ac.in/index.php?gf-download=2023%2F05%2FENGINEERING-CHEMISTRY.pdf&form-id=1&field-id=7&hash=1b5921b50ee92861e5b4263f7637fdb06ba27f4b82ffd1eb50c8ab17abcfc53c"
      },
      {
        subject: "ELECTRICAL CIRCUIT ANALYSIS-II",
        year: 2024,
        semester: 2,
        link: "https://www.aceec.ac.in/index.php?gf-download=2024%2F12%2FELECTRICAL-CIRCUIT-ANALYSIS-IIEEEACER22.pdf&form-id=1&field-id=7&hash=c5cd25c50eeaf8201470e0e8a66549b123176a2554d59bffbbba6faf91466629"
      },
      {
        subject: "ELECTRONIC DEVICES AND CIRCUITS",
        year: 2024,
        semester: 2,
        link: "https://www.aceec.ac.in/index.php?gf-download=2025%2F01%2FELECTR2.PDF&form-id=1&field-id=7&hash=4efdefee60353c44f3fd3185313f7861083e2e76f57729fb210fddce5671d3cb"
      },
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
