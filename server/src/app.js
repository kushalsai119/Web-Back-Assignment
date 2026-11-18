import express from "express";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/posts", postRoutes);

// base route
app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});

export default app;
