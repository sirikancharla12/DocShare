import express from "express";
import { downloadFile, previewFile } from "../controllers/file.controller.js";

const router = express.Router();

router.get("/download/:fileId", downloadFile);
router.get("/preview/:fileId", previewFile);

export default router;
