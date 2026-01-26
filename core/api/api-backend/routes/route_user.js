import express from "express";
import { userIndex, userView, usrRoleAdd, usrRoleList, usrRoleRemove, usrSetAccess, usrSetAdminStatus, usrSetPassword, usrSetStaffStatus } from "../controllers/user_controller.js";

const r = express.Router();
r.post('',userIndex);
r.post('/view',userView);
r.post('/set-admin-status',usrSetAdminStatus);
r.post('/set-staff-status',usrSetStaffStatus);
r.post('/set-access-status',usrSetAccess)
r.post('/password',usrSetPassword);
r.post('/role-list',usrRoleList);
r.post('/role-add',usrRoleAdd);
r.post('/role-remove',usrRoleRemove);


const routeUser=r
export default routeUser