const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB bağlantısı
mongoose.connect('mongodb://localhost:27017/ymusic')
  .then(() => {
    console.log('MongoDB bağlantısı başarılı!');
  })
  .catch((err) => {
    console.error('MongoDB bağlantı hatası:', err);
  });



// Schema ve Model oluşturma
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});
const User = mongoose.model('User', userSchema);

// API rotası
app.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  try {
    const newUser = new User({ email, password });
    await newUser.save();
    res.status(201).json({ message: 'Kullanıcı başarıyla kaydedildi!' });
  } catch (error) {
    res.status(500).json({ error: 'Bir hata oluştu!' });
  }
});

// Server başlatma
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor.`);
});
