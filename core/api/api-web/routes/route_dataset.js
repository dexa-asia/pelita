import express from "express";
import { dsDistrict, dsEducation, dsJob, dsMarital, dsProvince, dsSubdistrict, dsVillage } from "../controllers/dataset_controller.js";

const r = express.Router();
r.post('/province',dsProvince)
r.post('/district',dsDistrict)
r.post('/subdistrict',dsSubdistrict)
r.post('/village',dsVillage)
r.post('/job',dsJob)
r.post('/marital',dsMarital)
r.post('/education',dsEducation)


const routeDataset=r
export default routeDataset