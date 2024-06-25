import User from "../models/UserModel";
import UserTemp from "../models/UserTempModel";
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
      return res.status(400).json({ message: "User already exists" });
    }

    // Generate verufication token
    const token = jwt.sign({ email }, process.env.JWT_SECRET!, { expiresIn: '1h' });


    // Save user to temporary collection
    const expiration = new Date(Date.now() + 3600000);
    const newUserTemp = new UserTemp({ email, password, token, expiration });
    await newUserTemp.save();

    // Send verification email
    res.status(200).json({ message: 'Verification email sent. Please check your inbox.', token });


    // const user = new User({ email, password });
    // await user.save();

    // res.status(201).json({ message: "User created successfully" });
  } catch (error: any) {
    console.error('Error during registration:', error);
    res
      .status(500)
      .json({ message: "Error registering new user", error: error.message });
  }
};

export const verifyEmail = async (req: Request, res: Response) => {
  const { token } = req.query;

  try {
    const decoded: any = jwt.verify(token as string, process.env.JWT_SECRET!);
    const { email } = decoded;

    // Find user in temporary collection
    const userTemp = await UserTemp.findOne({ email, token });
    if (!userTemp) {
      return res.status(400).json({ message: 'Invalid or expired token.' });
    }

    // Check if token is expired
    if (userTemp.expiration < new Date()) {
      await UserTemp.deleteOne({ email });
      return res.status(400).json({ message: 'Token expired.' });
    }

    // Create new user and save to main user collection
    const newUser = new User({ email: userTemp.email, password: userTemp.password, isVerified: true });
    await newUser.save();

    // Remove user from temporary collection
    await UserTemp.deleteOne({ email });

    res.status(200).json({ message: 'Email verified successfully. You can now log in.' });
  } catch (error) {
    res.status(400).json({ message: 'Invalid or expired token.' });
  }
}


export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    console.log(user)
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch)
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
