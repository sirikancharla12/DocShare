import express from "express";
import { getTransferBySlug } from "../controllers/transferController";

const router = express.Router();

router.get("/:slug", getTransferBySlug);


export default router;