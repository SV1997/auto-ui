"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../controller/user"));
const userRoutes = express_1.default.Router();
userRoutes.post("/createUser", user_1.default.createUser);
userRoutes.post("/saveCode", user_1.default.saveCode);
userRoutes.post("/getuserdata", user_1.default.getUserData);
userRoutes.post("/createworkshop", user_1.default.createWorkshop);
userRoutes.post("/getworkshops", user_1.default.sendWorkshopsData);
userRoutes.post("/getelements", user_1.default.sendCodesData);
exports.default = userRoutes;
