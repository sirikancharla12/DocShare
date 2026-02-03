import express from "express";
import { accessTransfer, getTransferBySlug } from "../controllers/transferController";

const router = express.Router();

router.get("/:slug", getTransferBySlug);
router.get("/:slug/access",accessTransfer)


export default router;