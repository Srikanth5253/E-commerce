import bcrypt from "bcryptjs";
import User from "../../models/User.js";
import generateToken from "../../utils/generateToken.js";


export const registerUser = async (
  req,
  res,
  next
) => {
  try {
    const {
      name,
      email,
      password,
      role,
    } = req.body;


    const existingUser =
      await User.findOne({ email });

    if (existingUser) {
      res.status(400);

      throw new Error(
        "User already exists"
      );
    }

    if (role === "admin") {
      const adminExists =
        await User.findOne({
          role: "admin",
        });

      if (adminExists) {
        res.status(400);

        throw new Error(
          "Admin already exists"
        );
      }
    }

    const salt =
      await bcrypt.genSalt(10);

    const hashedPassword =
      await bcrypt.hash(
        password,
        salt
      );

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "user",
    });


    const token = generateToken(
      user._id
    );

    res.status(201).json({
      success: true,
      message: `${user.role} registered successfully`,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (
  req,
  res,
  next
) => {
  try {
    const { email, password } =
      req.body;

    const user = await User.findOne({
      email,
    });

    if (!user) {
      res.status(404);

      throw new Error(
        "User not found"
      );
    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
      res.status(400);

      throw new Error(
        "Invalid credentials"
      );
    }

    const token = generateToken(
      user._id
    );

    res.status(200).json({
      success: true,
      message:
        "Login successful",
      token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const googleLogin = async (
  req,
  res,
  next
) => {
  try {
    const {
      name,
      email,
      auth0Id,
    } = req.body;

    let user = await User.findOne({
      email,
    });

    if (!user) {
      user = await User.create({
        name,
        email,
        auth0Id,
        authProvider: "google",
        role: "user",
      });
    }

    if (user.role === "admin") {
      res.status(403);

      throw new Error(
        "Admin cannot login with Google"
      );
    }

    const token = generateToken(
      user._id
    );

    res.status(200).json({
      success: true,
      message:
        "Google login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateProfile =
  async (
    req,
    res,
    next
  ) => {

    try {

      const user =
        await User.findById(
          req.user._id
        );

      if (!user) {

        res.status(404);

        throw new Error(
          "User not found"
        );
      }

      user.name =
        req.body.name ||
        user.name;

      const updatedUser =
        await user.save();

      res.status(200).json({
        success: true,
        message:
          "Profile updated",

        user: {
          id:
            updatedUser._id,

          name:
            updatedUser.name,

          email:
            updatedUser.email,

          role:
            updatedUser.role,
        },
      });

    } catch (error) {

      next(error);
    }
  };