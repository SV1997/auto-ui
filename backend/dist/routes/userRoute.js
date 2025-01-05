"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../controller/user"));
const jwt_1 = __importDefault(require("../authentication/jwt"));
const userRoutes = express_1.default.Router();
userRoutes.post("/createUser", user_1.default.createUser);
userRoutes.post("/saveCode", jwt_1.default, user_1.default.saveCode);
userRoutes.post("/getuserdata", user_1.default.getUserData);
userRoutes.post("/createworkshop", jwt_1.default, user_1.default.createWorkshop);
userRoutes.post("/getworkshops", jwt_1.default, user_1.default.sendWorkshopsData);
userRoutes.post("/getelements", jwt_1.default, user_1.default.sendCodesData);
userRoutes.post("/delete", jwt_1.default, user_1.default.deleteElement);
userRoutes.post("/logout", jwt_1.default, user_1.default.logout);
exports.default = userRoutes;
