import jwt from "jsonwebtoken";
import User from "../models/User.js";

const isUserLoggedIn = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

      const user = await User.findOne({ email: decoded.email });

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      res.status(200).json(user);
      next();
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  }
  if (!token) {
    return res.status(401).json({ message: "Unauthorized, missing token!" });
  }
};

export { isUserLoggedIn };
