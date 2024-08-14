const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path'); // Bu satırı ekleyin

const session = require('express-session');

const app = express();
const port = 7001;
const bcrypt = require('bcrypt');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); 



/*
// Middleware
app.use(cors()); // To allow cross-origin requests
app.use(bodyParser.json()); // To parse JSON bodies


// Diğer middleware'lerin üstüne ekleyin
app.use(session({
  secret: 'your_secret_key',  // Burada güvenli bir anahtar kullanın
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }  // HTTPS kullanıyorsanız true yapın
}));
*/


// Body-parser middleware'ini kullanma
app.use(cors()); // To allow cross-origin requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Session middleware'i ekleyin
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
}));


// MongoDB connection
mongoose.connect('mongodb://localhost:27017/kindergarden', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


// Address Schema
const addressSchema = new mongoose.Schema({
  street: String,
  town: String,
  neighbourhood: String
});

// Parent Schema
const parentSchema = new mongoose.Schema({
  name: String,
  IDNo: String,
  address: addressSchema,
  occupation: {
      occupation: String,
      occupationType: String,
      workingHours: String
  },
  contact: {
      phone: String,
      contactPhone: String
  }
});

// Caregiver Schema
const caregiverSchema = new mongoose.Schema({
  working: Boolean,
  IDNo: String,
  phone: String
});

// Student Schema
const studentSchema = new mongoose.Schema({
  phone: String,
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


const User = mongoose.model('students', studentSchema); //burası da silinebilir.
module.exports = User; //burası silinebilrir


//submit edildiğinde ID numarasını kontrol eder. ID uniquedir.
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

// Veritabanındaki tüm kullanıcıları getiren endpoint JSONN olarak getiirir.
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/*

//databasedeki isim ve tcleri getiren end-point tablo yapar.
app.get('/admin', async (req, res) => {
  try {
    const users = await User.find(); // Ensure this query is correct
    res.render('admin', { users }); // Ensure 'admin.ejs' exists in the 'views' folder
  } catch (err) {
    console.error('Error loading admin panel:', err); // Log the error for debugging
    res.status(500).send('Error loading admin panel');
  }
});
*/

//admin paneki authent için
// Admin Schema
const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

//const Admin = mongoose.model('admins', adminSchema);
const Admin = mongoose.model('Admin', adminSchema, 'admins');
module.exports = Admin;

app.get('/login', (req, res) => {
  res.render('login', { error: null });
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  console.log(username);
  console.log(password)
  
  try {
    // Admin kullanıcıyı veritabanında bul
    //const admin = await Admin.findOne({ username });  // Burada `text` yerine `username` kullanın
    const admin = await Admin.findOne({ username: username });

    if (!admin) {
      // Eğer admin bulunamazsa
      return res.status(401).send('Giriş başarısız: Admin bulunamadı');
    }
    
    // Şifreyi doğrulayın
    if (admin.password !== password) {
      // Eğer şifre eşleşmezse
      return res.status(401).send('Giriş başarısız: Şifre yanlış');
    }
    
    // Session veya token yaratma
    req.session.adminId = admin._id; // Session-based authentication
    res.redirect('/admin'); // Admin paneline yönlendir
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Sunucu hatası');
  }

});



/*
app.get('/login', (req, res) => {
    res.render('login', { error: null });
});



app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  // Admin kullanıcıyı veritabanında bul
  const admin = await Admin.findOne({ username });
  if (admin.password !== password) {
    return res.status(401).send('Giriş başarısız password yanlış');
  }
  else if(!admin){
    return res.status(401).send('Giriş başarısız admin yok');
  }
  else{ 
    return res.status(401).send('password dor');
  }


      // Session veya token yaratma
  req.session.adminId = admin._id; // Session-based authentication
  res.redirect('/admin'); // Admin paneline yönlendir
});
*/


app.get('/admin', async (req, res) => {
  if (!req.session.adminId) {
    return res.redirect('/login'); // Giriş yapılmamışsa login sayfasına yönlendir
  }

  try {
    const users = await User.find(); // Veritabanındaki kullanıcıları al
    res.render('admin', { users }); // admin.ejs dosyasını render et
  } catch (err) {
    console.error('Error loading admin panel:', err);
    res.status(500).send('Error loading admin panel');
  }
});

// Öğrenci Silme Route'u
app.post('/admin/delete/:IDNo', async (req, res) => {
  try {
    const IDNo = req.params.IDNo;
    await User.findOneAndDelete({ IDNo: IDNo });
    res.redirect('/admin');  // Silme işlemi başarılı olursa admin paneline geri dön
  } catch (error) {
    console.error('Öğrenci silinirken bir hata oluştu:', error);
    res.status(500).send('Sunucu hatası');
  }
});

// Öğrenci güncelleme sayfasını yükler
app.get('/admin/update/:IDNo', async (req, res) => {
  try {
    const IDNo = req.params.IDNo;
    const user = await User.findOne({ IDNo: IDNo });

    if (!user) {
      return res.status(404).send('Öğrenci bulunamadı');
    }

    res.render('update', { user });
  } catch (error) {
    console.error('Güncelleme sayfası yüklenirken bir hata oluştu:', error);
    res.status(500).send('Sunucu hatası');
  }
});

// Öğrenci bilgilerini günceller
app.post('/admin/update/:IDNo', async (req, res) => {
  try {
    const IDNo = req.params.IDNo;
    const updatedData = req.body;

    // Öğrenciyi güncelle
    await User.findOneAndUpdate({ IDNo: IDNo }, updatedData, { new: true });

    res.redirect('/admin'); // Güncelleme sonrası admin paneline geri dön
  } catch (error) {
    console.error('Öğrenci güncellenirken bir hata oluştu:', error);
    res.status(500).send('Sunucu hatası');
  }
});




// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

//serve static files
app.use(express.static('public'));
