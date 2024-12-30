import express from "express";
import user from "../controller/user";
import verifyToken from "../authentication/jwt";
const userRoutes= express.Router();

userRoutes.post("/createUser",user.createUser);
userRoutes.post("/saveCode",verifyToken,user.saveCode);
userRoutes.post("/getuserdata",user.getUserData);
userRoutes.post("/createworkshop",verifyToken,user.createWorkshop);
userRoutes.post("/getworkshops",verifyToken,user.sendWorkshopsData);
userRoutes.post("/getelements",verifyToken,user.sendCodesData);
export default userRoutes;