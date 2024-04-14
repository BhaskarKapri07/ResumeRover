import User from "../models/UserModel";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Request, Response } from "express";

import dotenv from "dotenv";
dotenv.config();

export const registerUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const user = new User({ email, password });
    await user.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error registering new user", error: error.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Email or password is incorrect" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });
    res.json({ message: "User logged in successfully", token });
  } catch (error:any) {
    res
      .status(500)
      .json({ message: "Error logging in user", error: error.message });
  }
};
