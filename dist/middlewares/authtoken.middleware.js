"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const appError_1 = require("../errors/appError");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const authToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        throw new appError_1.AppError(401, "invalid token.");
    }
    const splitToken = token.split(" ");
    jsonwebtoken_1.default.verify(splitToken[1], process.env.SECRET_KEY, (error, decoded) => {
        if (error) {
            throw new appError_1.AppError(401, "Invalid token");
        }
        req.user = {
            id: decoded.id,
        };
        next();
    });
};
exports.default = authToken;
