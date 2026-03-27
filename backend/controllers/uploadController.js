const asyncHandler = require('express-async-handler');
const { getGfs } = require('../config/db');
const mongoose = require('mongoose');

// @desc    Upload media and save metadata to DB
// @route   POST /api/upload
// @access  Private (Admin)
const uploadMedia = asyncHandler(async (req, res) => {
  console.log('[UPLOAD] Processing request...');

  if (!req.files || req.files.length === 0) {
    console.error('[UPLOAD] No files received');
    res.status(400);
    throw new Error('No files uploaded. Make sure you are sending "images" key in form-data.');
  }

  const { getGfs } = require('../config/db');
  const gfs = getGfs();
  const { Readable } = require('stream');
  const path = require('path');

  // Helper: Upload Buffer to GridFS
  const uploadToGridFS = (file) => {
    return new Promise((resolve, reject) => {
      const filename = `file_${Date.now()}_${Math.round(Math.random() * 1000)}${path.extname(file.originalname)}`;
      const writeStream = gfs.openUploadStream(filename, {
        contentType: file.mimetype,
        metadata: {
          originalName: file.originalname
        }
      });

      const readableStream = new Readable();
      readableStream.push(file.buffer);
      readableStream.push(null);

      readableStream.pipe(writeStream)
        .on('error', (error) => {
          console.error(`[UPLOAD] Error uploading ${filename}:`, error);
          reject(error);
        })
        .on('finish', () => {
          // On finish, the file is committed. resolve with known filename.
          resolve({
            filename: filename,
            fileId: writeStream.id,
            contentType: writeStream.options.contentType,
            url: `/api/upload/${filename}`
          });
        });
    });
  };

  try {
    const uploadPromises = req.files.map(file => uploadToGridFS(file));
    const results = await Promise.all(uploadPromises);

    console.log(`[UPLOAD] Successfully saved ${results.length} files`);
    res.status(201).json({
      message: 'Files uploaded successfully',
      files: results,
    });
  } catch (error) {
    console.error('[UPLOAD] Batch upload failed:', error);
    res.status(500);
    throw new Error(`Upload failed: ${error.message}`);
  }
});

// @desc    Get a single media file by filename
// @route   GET /api/upload/:filename
// @access  Public
const getMediaByFilename = asyncHandler(async (req, res) => {
  const gfs = getGfs();
  const files = await gfs.find({ filename: req.params.filename }).toArray();

  if (!files || files.length === 0) {
    res.status(404);
    throw new Error('No file exists');
  }

  const file = files[0];

  // Check if file is an image
  if (file.contentType.startsWith('image/')) {
    const readstream = gfs.openDownloadStreamByName(req.params.filename);
    readstream.pipe(res);
  } else {
    res.status(404);
    throw new Error('Not an image');
  }
});

// @desc    Delete a media file
// @route   DELETE /api/upload/:id
// @access  Private (Admin)
const deleteMedia = asyncHandler(async (req, res) => {
  const gfs = getGfs();
  const fileId = new mongoose.Types.ObjectId(req.params.id);

  try {
    await gfs.delete(fileId);
    res.status(200).json({
      message: 'File deleted successfully',
    });
  } catch (err) {
    res.status(404);
    throw new Error('File not found or already deleted');
  }
});


module.exports = {
  uploadMedia,
  getMediaByFilename,
  deleteMedia,
};
