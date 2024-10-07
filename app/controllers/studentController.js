import {
  loginService,
  logOutServices,
  readProfileService,
  registerService,
  updateProfileService,
} from '../services/studentService.js';

/// Student Registration
export const register = async (req, res) => {
  let result = await registerService(req);
  return res.json(result);
};

/// Student Login
export const login = async (req, res) => {
  let result = await loginService(req, res);
  return res.json(result);
};

/// Read Student Profile
export const readProfile = async (req, res) => {
  let result = await readProfileService(req, res);
  return res.json(result);
};

/// Update Student Profile
export const updateProfile = async (req, res) => {
  let result = await updateProfileService(req);
  return res.json(result);
};

/// Student Log Out
export const logOut = async (req, res) => {
  let result = await logOutServices(req, res);
  return res.json(result);
};
