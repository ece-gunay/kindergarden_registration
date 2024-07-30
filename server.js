const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors()); // To allow cross-origin requests
app.use(bodyParser.json()); // To parse JSON bodies

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/kindergarden', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Define a schema and model
const userSchema = new mongoose.Schema({  
  phone: String,
  NameSurname: String,
  IDNo: String,
  sex: String,
  apply: String,
  address: String,
  town: String,
  neighbourhood: String,
  dateBirth: Date,
  motherName: String,
  motherIDNo: String,
  motherAddress: String,
  motherOccupation: String,
  motherOccupationType: String,
  motherPhone: String,
  motherContactPhone: String,
  motherWorkingHours: String,
  fatherName: String,
  fatherIDNo: String,
  fatherAddress: String,
  fatherOccupation: String,
  fatherOccupationType: String,
  fatherPhone: String,
  fatherContactPhone: String,
  fatherWorkingHours: String,
  caregiverWorking: String,
  caregiverIDNo: String,
  caregiverPhone: String,
  chronicDisease: String,
  allergies: String,
  behavioralIssues: String
});

const User = mongoose.model('students', userSchema);

// Endpoint to handle form submission
app.post('/api/submit', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json({ message: 'User created successfully', data: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
