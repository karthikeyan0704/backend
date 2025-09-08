import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import songRouter from './src/routes/songRoute.js';
import connectDB from './src/config/mongodb.js';
import connectCloudinary from './src/config/cloudinary.js';
import albumRouter from './src/routes/albumRoute.js';

const app = express();
const PORT = process.env.PORT || 3000;

// DB + Cloudinary connections
connectDB();
connectCloudinary();

// ✅ FIX: Allow frontend domain
app.use(cors({
  origin: "https://user-4-i8dy.onrender.com",  // frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// Middleware
app.use(express.json());

// Routes
app.use("/api/song", songRouter);
app.use("/api/album", albumRouter);

app.get("/", (req, res) => res.send("API Working"));

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
