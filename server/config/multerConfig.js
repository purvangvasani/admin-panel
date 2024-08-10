// multerConfig.js
const multer = require('multer');
const path = require('path');

// Set up storage options
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'C:\\MyStuffs\\images'); // Use double backslashes for Windows paths
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    }
});

const upload = multer({ storage: storage });

module.exports = upload;
