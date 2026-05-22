// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//     },

//     email: {
//       type: String,
//       required: true,
//       unique: true,
//     },

//     password: {
//       type: String,
//     },

//     role: {
//       type: String,
//       enum: ["admin", "user"],
//       default: "user",
//     },

//     authProvider: {
//       type: String,
//       enum: ["manual", "google"],
//       default: "manual",
//     },

//     auth0Id: {
//       type: String,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// const User = mongoose.model(
//   "User",
//   userSchema
// );

// export default User;

import mongoose from "mongoose";

const addressSchema =
  new mongoose.Schema(
    {
      fullName: {
        type: String,
        required: true,
      },

      phone: {
        type: String,
        required: true,
      },

      address: {
        type: String,
        required: true,
      },

      city: {
        type: String,
        required: true,
      },

      state: {
        type: String,
        required: true,
      },

      pincode: {
        type: String,
        required: true,
      },

      label: {
        type: String,
        enum: ["Home", "Office", "Other"],
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

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
    },

    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },

    authProvider: {
      type: String,
      enum: ["manual", "google"],
      default: "manual",
    },

    auth0Id: {
      type: String,
    },

    addresses: [addressSchema],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model(
  "User",
  userSchema
);

export default User;