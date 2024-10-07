import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/// Single File Upload
export const uploadSingleFileService = async (req) => {
  try {
    const uploadFile = req.files.file;
    const uploadPath = path.join(
      __dirname,
      '../../uploads',
      Date.now() + '-' + uploadFile.name
    );
    await uploadFile.mv(uploadPath, (err) => {
      if (err) {
        return {
          status: 'error',
          data: 'Error occurred while uploading the file.',
        };
      }
    });

    /// If successful, return the status and file path
    return { status: 'success', data: 'File uploaded successfully!' };
  } catch (e) {
    return { status: 'error', data: e.toString() };
  }
};

/// Multiple Files Upload
export const uploadMultipleFileService = async (req) => {
  try {
    let uploadFiles = req.files.file;
    for (let i = 0; i < uploadFiles.length; i++) {
      const uploadPath = path.join(
        __dirname,
        '../../uploads',
        Date.now() + '-' + uploadFiles[i].name
      );

      await uploadFiles[i].mv(uploadPath, (err) => {
        if (err) {
          return {
            status: 'error',
            data: 'Error occurred while uploading the file.',
          };
        }
      });
    }
    return { status: 'success', data: 'Files uploaded successfully!' };
  } catch (e) {
    return { status: 'error', data: e.toString() };
  }
};

/// File Read
export const readUploadFileService = (req) => {
  try {
    const filename = req.params.filename;
    const filepath = path.join(__dirname, '../../uploads', filename);
    if (!fs.existsSync(filepath)) {
      return { status: 'error', data: 'File not found' };
    } else {
      // return { status: 'success', path: filepath };
      return filepath;
    }
  } catch (e) {
    return { status: 'error', data: e.toString() };
  }
};

/// Single File Delete
export const deleteSingleFileService = (req) => {
  try {
    const filename = req.params.filename;
    const filepath = path.join(__dirname, '../../uploads', filename);
    fs.unlink(filepath, (err) => {
      if (err) {
        return { status: 'error', data: 'Error occurred while deleting file.' };
      }
    });
    return { status: 'success', data: 'File deleted successfully!' };
  } catch (e) {
    return { status: 'error', data: e.toString() };
  }
};

/*

/// Multiple File Delete
export const deleteMultipleFileService = (req) => {
  try {
    const files = req.body.file;
    for (let i = 0; i < files.length; i++) {
      const filepath = path.join(__dirname, '../../uploads', files[i]);
      fs.unlink(filepath, (err) => {
        if (err) {
          return {
            status: 'error',
            data: 'Error occurred while deleting file.',
          };
          // console.log(err);
        }
      });
    }
    return { status: 'success', data: 'File deleted successfully!' };
  } catch (e) {
    return { status: 'error', data: e.toString() };
  }
};

 */
