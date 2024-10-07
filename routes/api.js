import express from 'express';
const router = express.Router();

import * as FileController from '../app/controllers/fileController.js';
import * as StudentsController from '../app/controllers/studentController.js';
import AuthMiddleware from '../app/middlewares/AuthMiddleware.js';

/// Student Registration, Login, Read Profile, Update Profile & Log Out
router.post('/register', StudentsController.register);
router.post('/login', StudentsController.login);
router.get(
  '/read-profile/:email',
  AuthMiddleware,
  StudentsController.readProfile
);
router.post(
  '/update-profile/:email',
  AuthMiddleware,
  StudentsController.updateProfile
);
router.post('/log-out', AuthMiddleware, StudentsController.logOut);

/// File Upload, Read & Delete
router.post('/upload-single-file', FileController.uploadSingleFile);
router.post('/upload-multiple-files', FileController.uploadMultipleFiles);
router.get('/read-upload-file/:filename', FileController.readUploadFile);
router.post('/delete-single-file/:filename', FileController.deleteSingleFile);
// router.post('/delete-multiple-file', FileController.deleteMultipleFile);

export default router;
