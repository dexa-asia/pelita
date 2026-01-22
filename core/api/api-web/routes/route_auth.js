import express from "express";
import { auCheckStatus, auRegister, auViewProcessed } from "../controllers/auth_controller.js";
import { uploadCard } from "#middlewares/upload.card.js";
import { convertToJpg } from "#middlewares/covert-to-jpg.js";

const r = express.Router();
r.post('/register',uploadCard,convertToJpg,auRegister);
r.post('/view-processed',auViewProcessed)
r.post('/check-status',auCheckStatus)

const routeAuth=r
export default routeAuth