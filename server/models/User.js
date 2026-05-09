import mongoose from "mongoose";

import bcrypt from "bcryptjs";

// ================= USER SCHEMA =================
const UserSchema = new mongoose.Schema(
  {

    // ================= NAME =================
    name: {

      type: String,

      required: [
        true,
        "Name is required",
      ],

      trim: true,

      minlength: 2,

      maxlength: 50,

    },

    // ================= EMAIL =================
    email: {

      type: String,

      required: [
        true,
        "Email is required",
      ],

      unique: true,

      lowercase: true,

      trim: true,

      match: [
        /^\S+@\S+\.\S+$/,
        "Please enter a valid email",
      ],

    },

    // ================= PASSWORD =================
    password: {

      type: String,

      required: [
        true,
        "Password is required",
      ],

      minlength: 6,

    },

    // ================= ROLE =================
    role: {

      type: String,

      enum: [
        "Admin",
        "Member",
      ],

      default: "Member",

    },

  },

  {

    timestamps: true,

  }
);

// ================= HASH PASSWORD =================
UserSchema.pre(
  "save",
  async function () {

    // Skip if password not modified
    if (
      !this.isModified("password")
    ) {

      return;

    }

    // Generate salt
    const salt =
      await bcrypt.genSalt(10);

    // Hash password
    this.password =
      await bcrypt.hash(
        this.password,
        salt
      );

  }
);

// ================= COMPARE PASSWORD =================
UserSchema.methods.comparePassword =
  async function (
    candidatePassword
  ) {

    return await bcrypt.compare(
      candidatePassword,
      this.password
    );

  };

// ================= REMOVE PASSWORD FROM JSON =================
UserSchema.methods.toJSON =
  function () {

    const user =
      this.toObject();

    delete user.password;

    return user;

  };

// ================= EXPORT MODEL =================
const User =
  mongoose.models.User ||
  mongoose.model(
    "User",
    UserSchema
  );

export default User;