import dotenv from "dotenv";
dotenv.config();

import app from "../src/app.js"
import { startCleanup } from "./cron/cleanup.js";

startCleanup();

const PORT = process.env.BASE_URL.split(":")[2] || 8000;

app.listen(PORT, () => {
  console.log(`Auth Server running on port ${PORT} `);
});
