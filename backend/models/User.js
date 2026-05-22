import mongoose from "mongoose";

const addressSchema =
  new mongoose.Schema(
    {
      fullName: {
        type: String,
        required: true,
        trim: true,
      },

      phone: {
        type: String,
        required: true,

        match:
          /^[0-9]{10}$/,
      },

      address: {
        type: String,
        required: true,
        trim: true,
        maxlength: 300,
      },

      city: {
        type: String,
        required: true,
        trim: true,
      },

      state: {
        type: String,
        required: true,
        trim: true,
      },

      pincode: {
        type: String,
        required: true,

        match:
          /^[0-9]{6}$/,
      },

      label: {
        type: String,

        enum: [
          "Home",
          "Office",
          "Other",
        ],

        default: "Home",
      },

      isDefault: {
        type: Boolean,
        default: false,
      },
    },
    {
      timestamps: true,
    }
  );

const userSchema =
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },

      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
      },

      password: {
        type: String,
      },

      role: {
        type: String,

        enum: [
          "admin",
          "user",
        ],

        default: "user",
      },

      authProvider: {
        type: String,

        enum: [
          "manual",
          "google",
        ],

        default: "manual",
      },

      auth0Id: {
        type: String,
      },

      addresses: [
        addressSchema,
      ],
    },
    {
      timestamps: true,
    }
  );

const User =
  mongoose.model(
    "User",
    userSchema
  );

export default User;