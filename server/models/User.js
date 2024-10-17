import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import config from '../config/config.js';

const UserSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuidv4,
      required: true,
    },
    username: {
      type: String,
      required: true,
      maxLength: 20,
    },
    firstName: {
      type: String,
      required: true,
      maxLength: 30,
    },
    lastName: {
      type: String,
      required: true,
      maxLength: 30,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      maxLength: 50,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    defaultAvatar: {
      type: String,
      required: true,
    },
    avatarUrl: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

//Find by the token
UserSchema.statics.findByToken = function (token) {
  const User = this;
  try {
    let decoded = jwt.verify(token, config.tokenSecret);
    console.log(`Decoded token: ${decoded._id}`);
    return User.findOne({ _id: '0b0be344-fc2c-419c-b24e-483879e00f7b' });
  } catch (err) {
    return;
  }
};

const User = mongoose.model('User', UserSchema);
export default User;
