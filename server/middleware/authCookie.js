import User from "../models/User.js";

const authCookie = async (req, res, next) => {
  try {
    //grab the token
    const token = req.cookies.token;
    console.log(`Incoming token: ${token}`);
    // Decode token and find user
    const user = await User.findByToken(token);

    console.log(`User: ${user}`);
    if (!user) next(new Error("Couldn't find user"));

    //if the token was valid
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

export default authCookie;
