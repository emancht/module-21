import mongoose from 'mongoose';

const StudentSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true, required: true, lowercase: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    session: { type: String, required: true },
    grade: { type: String, required: true },
    roll: { type: String, required: true },
    dob: { type: String, required: true },
    gender: { type: String, required: true },
    phone: { type: String, required: true },
    image: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
const StudentModel = mongoose.model('students', StudentSchema);

export default StudentModel;
