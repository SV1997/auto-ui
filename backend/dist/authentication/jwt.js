"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require('jsonwebtoken');
const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
    jwt.verify(token, 'svautoui', (error, decoded) => {
        if (error) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        next();
    });
};
exports.default = verifyToken;
