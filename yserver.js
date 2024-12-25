const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const app = express();

// CORS ayarları
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || origin === 'http://localhost:5500' || origin === 'http://127.0.0.1:5500') {
            callback(null, true);
        } else {
            callback(new Error('CORS hatası: Erişim reddedildi'), false);
        }
    },
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
};

app.use(cors(corsOptions));

// JSON verisi işleme
app.use(express.json());

// MongoDB bağlantısı
mongoose.connect('mongodb://localhost:27017/ymusic')
    .then(() => console.log('MongoDB bağlantısı başarılı'))
    .catch((err) => console.error('MongoDB bağlantı hatası:', err));

// Playlist şeması ve modeli
const playlistSchema = new mongoose.Schema({
    playlistLink: { type: String, required: true }
});

const Playlist = mongoose.model('Playlist', playlistSchema);

// Playlist linkini kaydetme
app.post('/submit', async (req, res) => {
    try {
        const { playlistLink } = req.body;

        if (!playlistLink) {
            return res.status(400).json({ message: 'Playlist linki gerekli!' });
        }

        // Playlist linkini veritabanına kaydet
        const newPlaylist = new Playlist({ playlistLink });
        await newPlaylist.save();

        res.status(201).json({ message: 'Playlist linki başarıyla kaydedildi.' });
    } catch (error) {
        console.error('Veritabanı hatası:', error);
        res.status(500).json({ message: 'Bir hata oluştu, lütfen tekrar deneyin.' });
    }
});

// Yeni rota: Python scriptini çağırarak playlist indirme
app.post('/downloadPlaylist', (req, res) => {
    const { playlistLink } = req.body;

    if (!playlistLink) {
        return res.status(400).json({ message: 'Playlist linki gerekli!' });
    }

    // Python scriptini çalıştır
    const command = `python "C:/Users/PC/Desktop/t1/download_playlist.py" "${playlistLink}"`;


    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Hata: ${error.message}`);
            return res.status(500).json({ message: 'Playlist indirme sırasında bir hata oluştu.' });
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return res.status(500).json({ message: 'Playlist indirme sırasında bir hata oluştu.' });
        }

        console.log(`stdout: ${stdout}`); // Python çıktısını göster
        res.status(200).json({ message: 'Playlist başarıyla indirildi!' });
    });
});

// Sunucuyu başlat
app.listen(4000, () => {
    console.log('Server 4000 portunda çalışıyor.');
});
