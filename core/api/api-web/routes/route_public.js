import express from "express";
import { dsDistrict, dsJob, dsMarital, dsProvince, dsSubdistrict, dsVillage } from "../controllers/dataset_controller.js";

const r = express.Router();
r.post('/get-province',dsProvince);
r.post('/get-district',dsDistrict);
r.post('/get-subdistrict',dsSubdistrict);
r.post('/get-village',dsVillage);
r.post('/get-job',dsJob)
r.post('/get-marital',dsMarital)


const routePublic=r
export default routePublic