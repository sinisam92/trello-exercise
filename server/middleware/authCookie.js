import User from "../models/User.js";
import jwt from "jsonwebtoken";

const authCookie = async (req, res, next) => {
  // console.log("AuthCookie Middleware", req.cookies);

  // try {
  //   const token =
  //     req.cookies.accessToken || req.header("Authorization")?.replace("Bearer ", "");
  //   if (!token) {
  //     throw new Error();
  //   }

  //   const decoded = jwt.verify(token, process.env.JWT_SECRET);
  //   req.userId = decoded.userId;
  //   console.log(`User ID DECODED: ${req.userId}`);

  //   next();
  // } catch (err) {
  //   res.status(401).send("Please authenticate");
  // }
  try {
    const token = req.cookies.accessToken;
    console.log(`Incoming token: ${token}`);

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided." });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Forbidden: Invalid token." });
      }

      const user = await User.findById(decoded._id).select("-password");
      console.log(`User: ${user}`);

      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }

      req.user = user;
      console.log(`Authenticated User: ${req.user}`);

      next();
    });
  } catch (err) {
    console.error("Authentication error:", err);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export default authCookie;
