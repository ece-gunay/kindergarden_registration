const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 7001;


// Middleware
app.use(cors()); // To allow cross-origin requests
app.use(bodyParser.json()); // To parse JSON bodies

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/kindergarden', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

/*
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

*/


const addressSchema = new mongoose.Schema({
    street: String,
    town: String,
    neighbourhood: String
});

const contactSchema = new mongoose.Schema({
    phone: String,
    contactPhone: String
});

const occupationSchema = new mongoose.Schema({
    occupation: String,
    occupationType: String,
    workingHours: String
});

const parentSchema = new mongoose.Schema({
    name: String,
    IDNo: String,
    address: addressSchema,
    occupation: occupationSchema,
    contact: contactSchema
});

const caregiverSchema = new mongoose.Schema({
    working: Boolean,
    IDNo: String,
    phone: String
});

const userSchema = new mongoose.Schema({
    nameSurname: String,
    IDNo: { type: String, unique: true, required: true },
    sex: String,
    apply: String,
    address: addressSchema,
    dateBirth: Date,
    mother: parentSchema,
    father: parentSchema,
    caregiver: caregiverSchema,
    medicalInfo: {
        chronicDisease: String,
        allergies: String,
        behavioralIssues: String
    }
});

const User = mongoose.model('students', userSchema);

app.post('/api/submit', async (req, res) => {
    try {
        const { IDNo } = req.body;

        // Check if IDNo already exists
        const existingUser = await User.findOne({ IDNo });

        if (existingUser) {
            return res.status(400).json({ message: 'Başvuru zaten yapıldı' });
        }

        // If not, save the new user
        const user = new User(req.body);
        await user.save();

        res.status(200).json({ redirectUrl: 'success.html' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Sunucu hatası' });
    }
});

/*
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
*/

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
