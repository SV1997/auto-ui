"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const files_1 = __importDefault(require("../controller/files"));
const fileRoutes = express_1.default.Router();
fileRoutes.post("/download", files_1.default.fileDownload);
exports.default = fileRoutes;
