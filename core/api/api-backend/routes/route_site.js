import express from "express";
import { siteAuth,siteIndex } from "../controllers/site_controller.js";

const r = express.Router();
r.post('',siteIndex);
r.post('/auth',siteAuth);

const routeSite=r
export default routeSite