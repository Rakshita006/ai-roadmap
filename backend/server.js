
import express from 'express'
import cors from 'cors'
import roadmapRoutes from "./routes/roadmapRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import dotenv from "dotenv";
import mongoose from 'mongoose';

dotenv.config();

const app = express();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Mongodb connected');
  } catch (error) {
    console.error("MongoDB Error", error);
    process.exit(1);
  }
};

connectDB();

// ✅ CORS FIX
const allowedOrigins = [
  "http://localhost:5173",
  "https://ai-roadmap-iota.vercel.app"
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(express.json());

app.use('/api', roadmapRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('backend is running');
});

// ✅ PORT FIX
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});