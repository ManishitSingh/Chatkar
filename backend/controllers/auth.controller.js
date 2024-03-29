import { z } from "zod";
import User from "../models/user.model.js";
import { resolve } from "path";

//Zod Types

//for signup route
const userDetails = z.object({
  fullName: z.string().trim().min(3).max(30),
  username: z.string().trim().min(3).max(30),
  email: z.string().trim().email(),
  PasswordForm: z
    .object({
      password: z.string().trim().min(6).max(30),
      confirmPassword: z.string().trim().min(6).max(30),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }),
  gender: z
    .string()
    .trim()
    .min(4)
    .max(6)
    .refine(
      (value) => {
        return value === "male" || value === "female";
      },
      {
        message: 'Gender must be either "male" or "female"',
      }
    ),
});

//for login route
const loginSchema = z.object({
  credentials: z.union([
    z.object({
      username: z.string().trim().min(3).max(30),
      password: z.string().trim().min(6).max(30),
    }),
    z.object({
      email: z.string().trim().email(),
      password: z.string().trim().min(6).max(30),
    }),
  ]),
});

//Controllers
export const signup = async (req, res) => {
 
  try {
    const result = userDetails.safeParse(req.body);
    if (!result.success) {
      return res
        .status(400)
        .json({ Error: result.error.errors, success: false });
    }
    const data = result.data;
    // console.log("data",data);
    const user = await User.findOne({
      username: data.username,
      email: data.email,
    });
    if (user) {
      res.status(400).json({ Error: "User already exists", success: false });
      return;
    }
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${data.username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${data.username}`;
    const newUser = new User({
      fullName: data.fullName,
      username: data.username,
      email: data.email,
      password: data.PasswordForm.password,
      gender: data.gender,
      profilePicture: data.gender === "male" ? boyProfilePic : girlProfilePic,
    });

    if (newUser) {
      await newUser.save();
      res.status(201).json({
        User: {
          _id: newUser._id,
          fullName: newUser.fullName,
          username: newUser.username,
          email: newUser.email,
          gender: newUser.gender,
          profilePicture: newUser.profilePicture,
        },
        success: true,
      });
    } else {
      res.status(400).json({ Error: "Invalid User Data", success: false });
    }
  } catch (error) {
    console.log("Signup Route", error);
    return res
      .status(500)
      .json({ Error: "Internal Server Error", success: false });
  }
};

export const login = async (req, res) => {
  try {
    const result = loginSchema.safeParse(req.body);
    if (!result.success) {
      return res
        .status(400)
        .json({ Error: result.error.errors, success: false });
    }
    const data = result.data;
    let user;
    if (data.credentials.username) {
      user = await User.findOne({ username: data.credentials.username });
    } else {
      user = await User.findOne({ email: data.credentials.email });
    }
    if (!user) {
      return res.status(400).json({ Error: "Invalid email or username" });
    }

    const matchResult = await User.matchPassword(
      user.email,
      data.credentials.password,
      res
    );
    if (!matchResult.success) {
      return res.status(400).json({ Error: matchResult.message });
    }
    res.status(200).json({
      User: {
        _id: user._id,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture,
      },
      success: true,
    });
  } catch (error) {
    console.log("Login Route", error);
    return res
      .status(500)
      .json({ Error: "Internal Server Error", success: false });
  }
};

//logout route
export const logout = (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({message:"Logged out successfully" ,success: true });
  } catch (error) {
    console.log("Logout Route", error);
    return res
      .status(500)
      .json({ Error: "Internal Server Error", success: false });
  }
};
