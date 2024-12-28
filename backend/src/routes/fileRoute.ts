import express from "express";
import user from "../controller/user";
import files from "../controller/files";
const fileRoutes= express.Router();

fileRoutes.post("/download",files.fileDownload);

export default fileRoutes;