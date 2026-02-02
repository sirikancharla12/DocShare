import express from "express";
import cors from "cors";
import router from "./routes/authRoutes.js";
import fileRoutes from "./routes/fileRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth",router );
app.use("/api/files", fileRoutes);

export default app;
