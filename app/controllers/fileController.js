import {
  // deleteMultipleFileService,
  deleteSingleFileService,
  readUploadFileService,
  uploadMultipleFileService,
  uploadSingleFileService,
} from '../services/fileService.js';

export const uploadSingleFile = async (req, res) => {
  let result = await uploadSingleFileService(req);
  return res.json(result);
};

export const uploadMultipleFiles = async (req, res) => {
  let result = await uploadMultipleFileService(req);
  return res.json(result);
};

export const readUploadFile = (req, res) => {
  let result = readUploadFileService(req);
  return res.sendFile(result);
};

export const deleteSingleFile = async (req, res) => {
  let result = await deleteSingleFileService(req);
  return res.json(result);
};

// export const deleteMultipleFile = async (req, res) => {
//   let result = await deleteMultipleFileService(req, res);
//   return res.json(result);
// };
