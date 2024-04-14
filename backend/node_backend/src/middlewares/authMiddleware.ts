import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface AuthRequest extends Request {
  userId?: string; // Optional until authenticated
  token?: string;
}

interface JwtPayloadWithUserId extends jwt.JwtPayload {
  userId?: string;
}

// Middleware to authenticate and attach user ID to the request
export const authenticateToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

  if (token == null) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Failed to authenticate token" });
    }
    // Assuming the decoded JWT payload includes a userId field
    const payload = decoded as JwtPayloadWithUserId;
    if (!payload.userId) {
      return res
        .status(403)
        .json({ message: "Token is missing user information" });
    }
    req.userId = payload.userId;
    req.token = token;
    next();
  });
};
