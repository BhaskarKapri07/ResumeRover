import express from "express";
import { loginUser, registerUser, verifyEmail } from "../controllers/authController";

const router = express.Router();

router.post("/signup", registerUser);
router.get('/verify-email', verifyEmail);
router.post("/login", loginUser);

export default router;
