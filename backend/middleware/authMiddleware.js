import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    console.log("TOKEN IN MIDDLEWARE:", token); // 🔥 ADD THIS

    if (!token) {
      return res.status(401).json({ message: "No token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.userId;

    next();
  } catch (error) {
    console.error("AUTH ERROR:", error.message); // 🔥 ADD THIS
    res.status(401).json({ message: "Invalid token" });
  }
};

