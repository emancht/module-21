import StudentModel from '../models/studentModel.js';
import { EncodeToken } from '../utilities/tokenUtiliy.js';

/// Student Registration
export const registerService = async (req) => {
  try {
    let reqBody = req.body;
    // Create a new student record in the database.
    let data = await StudentModel.create(reqBody);
    return {
      status: 'success',
      message: 'User registered successfully.',
      data: data,
    };
  } catch (e) {
    return {
      status: 'error',
      message: e.toString(),
    };
  }
};

/// Student Login
export const loginService = async (req, res) => {
  try {
    let reqBody = req.body;
    /// Match the user with the provided credentials
    let data = await StudentModel.aggregate([
      { $match: reqBody },
      { $project: { _id: 1, email: 1 } },
    ]);
    // console.log(data.length)
    if (data.length > 0) {
      /// Generate a token for the logged-in user
      let token = EncodeToken(data[0]['email']);
      // console.log(token);
      /// Set Cookie
      let options = {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      };
      // Set the token in the user's cookie
      res.cookie('Token', token, options);
      return {
        status: 'success',
        message: 'User login successfully.',
        data: data,
      };
    } else {
      return {
        status: 'error',
        message: 'login failed, Invalid credentials.',
      };
    }
  } catch (e) {
    return {
      status: 'error',
      message: e.toString(),
    };
  }
};

///  Read Student Profile
export const readProfileService = async (req, res) => {
  let email = req.headers.email;
  try {
    let MatchStage = { $match: { email } };
    let ProjectionStage = {
      $project: {
        _id: 0,
        email: 1,
        firstName: 1,
        lastName: 1,
        session: 1,
        grade: 1,
        roll: 1,
        dob: 1,
        gender: 1,
        phone: 1,
        image: 1,
      },
    };
    let data = await StudentModel.aggregate([MatchStage, ProjectionStage]);
    return {
      status: 'success',
      data: data[0],
    };
  } catch (e) {
    return {
      status: 'error',
      message: e.toString(),
    };
  }
};

///  Update Student Profile
export const updateProfileService = async (req) => {
  try {
    let email = req.headers.email;
    let reqBody = req.body;
    reqBody.email = email;
    await StudentModel.updateOne(
      { email },
      { $set: reqBody },
      { upsert: true }
    );

    return { status: 'success', message: 'Profile Update Successful' };
  } catch (e) {
    return {
      status: 'error',
      message: e.toString(),
    };
  }
};

/// Student Log Out
export const logOutServices = async (req, res) => {
  try {
    res.clearCookie('Token');
    return {
      status: 'success',
      message: 'User logout successfully.',
    };
  } catch (e) {
    return {
      status: 'error',
      message: e.toString(),
    };
  }
};
