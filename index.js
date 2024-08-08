const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.use(express.static('public'));

app.post('/upload', upload.single('image'), (req, res) => {
  if (req.file) {
    const { filename } = req.file;
    res.json({ message: 'Image uploaded successfully', croppedImage: filename });
  } else {
    res.status(400).json({ message: 'No file uploaded' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
