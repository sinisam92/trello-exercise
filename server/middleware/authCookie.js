import User from "../models/User.js";
import jwt from "jsonwebtoken";

const authCookie = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided." });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Forbidden: Invalid token." });
      }

      const user = await User.findById(decoded._id).select("-password");

      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }

      req.user = user;

      next();
    });
  } catch (err) {
    console.error("Authentication error:", err);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export default authCookie;
