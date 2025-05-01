import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cors from "cors";

dotenv.config(); //config env

connectDB(); //database config

const app = express();
//middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);
app.get("/", (req, res) => {
  res.send("<h1>'Welcome to clickmart'</h1>");
});

const port = process.env.port || 2999;

app.listen(port, () => {
  console.log(
    `Server is running on ${process.env.Dev_mode} mode on port ${port}`.bgCyan
      .white
  );
});
