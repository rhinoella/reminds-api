import { connectToDatabase } from "./db";
import dotenv from "dotenv";
import express from "express";
import routes from "./routes";
import cors from "cors";
dotenv.config();

connectToDatabase().catch((err) => {
  console.error("Failed to connect to MongoDB:", err);
  process.exit(1);
});

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

app.use(routes);
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
