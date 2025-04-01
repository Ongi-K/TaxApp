const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

// Storage config — saves to /uploads with original name
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, file.originalname)
});

const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|pdf/;
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, allowedTypes.test(ext));
  }
});

router.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Upload</title>
        <style>
          body {
            background: #111;
            color: white;
            font-family: sans-serif;
            padding: 40px;
            text-align: center;
          }
          input[type="file"] {
            margin: 20px 0;
          }
          button {
            padding: 10px 20px;
            font-size: 16px;
          }
        </style>
      </head>
      <body>
        <h1>Upload PDF or Image</h1>
        <form action="/upload" method="POST" enctype="multipart/form-data">
          <input type="file" name="file" required />
          <br />
          <button type="submit">Upload</button>
        </form>
      </body>
    </html>
  `);
});

router.post('/', upload.single('file'), (req, res) => {
  if (!req.file) return res.send("No file uploaded.");
  res.send(`Upload successful: ${req.file.originalname}`);
});

module.exports = router;
