import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js"; // Ensure correct path

dotenv.config();

export const authenticateUser = async (req, res, next) => {
  try {
    // Get the token from the request headers
    const authHeader = req.headers.authorization;
    console.log("Received Authorization Header:", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided. Please log in." });
    }

    // Extract the token
    const token = authHeader.split(" ")[1];
    console.log("Extracted Token:", token);

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token Data:", decoded);

    // Fetch the user (admin or student) from the database
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User not found. Unauthorized access." });
    }

    // Attach user details to request
    req.user = user;
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error.message);

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token. Please log in again." });
    }
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired. Please log in again." });
    }

    return res.status(401).json({ message: "Authentication failed." });
  }
};

// Authorization middleware to check if user is an admin
export const authorizeAdmin = (req, res, next) => {
  console.log("Authenticated User:", req.user);
  console.log("User Role:", req.user?.role);

  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access required." });
  }

  next();
};
