const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const path = require('path');
const crypto = require('crypto');
const { getGfs } = require('../config/db'); // Import getGfs to access gfs in routes if needed

let upload; // Declare upload outside to be accessible after initialization

const initUploadMiddleware = (dbConnection) => {
  if (!dbConnection || !dbConnection.connection || !dbConnection.connection.db) {
    throw new Error('Mongoose connection object is not valid for GridFsStorage initialization.');
  }

  // Create storage engine
  const storage = new GridFsStorage({
    db: dbConnection.connection.db, // Pass the active Mongoose DB connection
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = buf.toString('hex') + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: 'uploads',
            metadata: req.body, // Optionally add metadata from the request body
          };
          resolve(fileInfo);
        });
      });
    },
  });

  upload = multer({
    storage,
    limits: { fileSize: 1024 * 1024 * 10 }, // 10MB file size limit
    fileFilter: (req, file, cb) => {
      const filetypes = /jpeg|jpg|png|gif|webp|avif/;
      const mimetype = filetypes.test(file.mimetype);
      const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

      if (mimetype && extname) {
        return cb(null, true);
      } else {
        cb(new Error('Only images (jpeg, jpg, png, gif, webp, avif) are allowed!'));
      }
    },
  });

  return upload;
};

// Export the init function and the getGfs for routes
module.exports = { initUploadMiddleware, getGfs };
