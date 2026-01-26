import express from "express";
import { dpwIndex } from "../controllers/dpw_controller.js";

const r = express.Router();
r.post('',dpwIndex);

const routeDpw=r
export default routeDpw