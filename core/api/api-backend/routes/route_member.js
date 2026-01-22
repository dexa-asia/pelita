import express from "express";
import { mbIndex, mbView } from "../controllers/member_controller.js";

const r = express.Router();
r.post('',mbIndex);
r.post('/view',mbView);


const routeMember=r
export default routeMember