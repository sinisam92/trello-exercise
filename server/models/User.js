import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import config from "../config/config.js";
import bcrypt from "bcrypt";

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
      select: false,
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
    createdProjects: [{ type: String, ref: "Project" }],
    memberProjects: [{ type: String, ref: "Project" }],
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);
// // will be used later on when changing password is implemented
// TODO: implement password change
// userSchema.pre('save', async function(next) {
//   if (this.isModified('password')) {
//     this.password = await bcrypt.hash(this.password, 8);
//   }
//   next();
// });

// userSchema.methods.comparePassword = async function(candidatePassword) {
//   return bcrypt.compare(candidatePassword, this.password);
// };

// this is needed to compare passwords because the password is not returned in the response
UserSchema.methods.comparePassword = async function (candidatePassword) {
  if (!this.password) {
    throw new Error("User password not set");
  }
  return bcrypt.compare(candidatePassword, this.password);
};

UserSchema.virtual("fullName").get(function () {
  return this.firstName + " " + this.lastName;
});

//Find by the token
UserSchema.statics.findByToken = function (token) {
  const User = this;
  try {
    let decoded = jwt.verify(token, config.tokenSecret);
    return User.findOne({ _id: decoded._id });
  } catch (err) {
    return;
  }
};

const User = mongoose.model("User", UserSchema);
export default User;
