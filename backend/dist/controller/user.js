"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const jwt = require('jsonwebtoken');
const prisma = new client_1.PrismaClient();
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = req.body;
        console.log(userData);
        const email = userData.email;
        const isPresent = yield prisma.user.findFirst({
            where: {
                email: userData.email
            }
        });
        if (isPresent) {
            res.json({ message: 'User already exists' });
            return;
        }
        const response = yield prisma.user.create({
            data: {
                name: userData.name,
                email: userData.email,
            }
        });
        console.log(response);
        req.session.userId = Number(response.id);
        const token = jwt.sign({ email }, 'svautoui');
        res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'none' });
        res.json({ message: 'User created successfully' });
    }
    catch (err) {
        console.log(err);
        res.json({ message: 'Error in creating user' });
    }
});
const sendWorkshopsData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("workshop data");
        console.log(req.session, req.cookies);
        const user = req.session.userId;
        console.log(user);
        const response = yield prisma.user.findFirst({
            where: {
                id: Number(user)
            },
            include: {
                workshops: true
            }
        });
        console.log(response);
        res.json(response === null || response === void 0 ? void 0 : response.workshops);
    }
    catch (err) {
        console.log(err);
        res.json({ message: 'Error in fetching workshops' });
    }
});
const createWorkshop = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const workshopData = req.body;
        const name = workshopData.name;
        console.log(req.session, req.cookies);
        const userId = String(req.session.userId);
        const response = yield prisma.workshop.create({
            data: {
                name: name,
                userId: Number(userId)
            }
        });
        res.json(response);
    }
    catch (err) {
        console.log(err);
        res.json({ message: 'Error in creating workshop' });
    }
});
const saveCode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const codeData = req.body.elements;
        const workshopId = req.body.workShopId;
        const workshopName = req.body.name;
        console.log(codeData);
        const codeDataRefined = codeData.map((element) => {
            return {
                name: element.name,
                width: element.width,
                height: element.height,
                x: element.x,
                y: element.y
            };
        });
        const response = yield prisma.workshop.upsert({
            where: {
                id: Number(workshopId)
            },
            update: {
                component: {
                    create: codeDataRefined
                }
            },
            create: {
                id: Number(workshopId),
                name: workshopName,
                userId: Number(req.session.userId),
                component: {
                    create: codeDataRefined
                }
            }
        });
        console.log(response);
        res.json({ message: 'Code saved successfully' });
    }
    catch (err) {
        console.log(err);
        res.json({ message: 'Error in saving code' });
    }
});
const getUserData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userMail = req.body.email;
        console.log(userMail);
        const response = yield prisma.user.findFirst({
            where: {
                email: userMail
            }
        });
        const userId = response === null || response === void 0 ? void 0 : response.id;
        console.log(userId);
        req.session.userId = Number(userId);
        req.session.save();
        const token = jwt.sign({ userMail }, 'svautoui');
        res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'none' });
        res.json({ msg: "user found", userId: userId });
    }
    catch (err) {
        console.log(err);
        res.json({ message: 'Error in fetching user' });
    }
});
const sendCodesData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const workshopId = req.body.workshopId;
        const userId = req.session.userId;
        if (userId !== req.session.userId) {
            res.json({ message: 'User not authenticated' });
            return;
        }
        console.log(workshopId);
        const elements = yield prisma.workshop.findFirst({
            where: {
                id: Number(workshopId)
            },
            include: {
                component: true
            }
        });
        console.log(elements);
        res.json(elements === null || elements === void 0 ? void 0 : elements.component);
    }
    catch (err) {
        console.log(err);
        res.json({ message: 'Error in fetching user' });
    }
});
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("logout");
        res.clearCookie('token');
        req.session.destroy((err) => {
            if (err) {
                console.log(err);
                res.json({ message: 'Error in logging out' });
                return;
            }
        });
        res.json({ message: 'Logged out successfully' });
    }
    catch (err) {
        console.log(err);
        res.json({ message: 'Error in logging out' });
    }
});
const deleteElement = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const workshopId = req.body.workshopId;
        const elementId = req.body.elementId;
        console.log(workshopId, elementId);
        const response = yield prisma.components.delete({
            where: {
                workshopId: Number(workshopId),
                id: Number(elementId)
            }
        });
        console.log(response);
        res.json({ message: 'Element deleted successfully' });
    }
    catch (error) {
        console.log(error);
    }
});
const userFunctions = { saveCode, createUser, createWorkshop, getUserData, sendWorkshopsData, sendCodesData, logout, deleteElement };
exports.default = userFunctions;
