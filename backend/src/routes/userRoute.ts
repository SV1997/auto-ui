import express from "express";
import user from "../controller/user";
const userRoutes= express.Router();

userRoutes.post("/createUser",user.createUser);
userRoutes.post("/saveCode",user.saveCode);
userRoutes.post("/getuserdata",user.getUserData);
userRoutes.post("/createworkshop",user.createWorkshop);
userRoutes.post("/getworkshops",user.sendWorkshopsData);
userRoutes.post("/getelements",user.sendCodesData);
export default userRoutes;