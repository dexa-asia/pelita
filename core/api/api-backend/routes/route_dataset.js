import express from "express";
import { dsDistrict,dsProvince, dsSubdistrict, dsVillage } from "../controllers/dataset_controller.js";

const r = express.Router();
r.post('/province',dsProvince)
r.post('/district',dsDistrict)
r.post('/subdistrict',dsSubdistrict)
r.post('/village',dsVillage)
const routeDataset=r
export default routeDataset