import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import songRouter from './src/routes/songRoute.js';
import albumRouter from './src/routes/albumRoute.js';
import connectDB from './src/config/mongodb.js';
import connectCloudinary from './src/config/cloudinary.js';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

// Connect database & Cloudinary
connectDB();
connectCloudinary();

// ✅ Enable CORS for all origins (safe for testing)
app.use(cors({
  origin: "*",   // allow any frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// Middleware
app.use(express.json());

// API Routes
app.use("/api/song", songRouter);
app.use("/api/album", albumRouter);

// Root endpoint
app.get('/', (req, res) => res.send("API Working ✅"));

// Optional: Serve frontend build (if you want to serve React from backend)
// const __dirname = path.resolve();
// app.use(express.static(path.join(__dirname, 'build')));
// app.get('*', (req,res) => res.sendFile(path.join(__dirname, 'build','index.html')));

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
