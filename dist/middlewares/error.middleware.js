"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const appError_1 = require("../errors/appError");
const errorMiddleware = (err, req, res, _) => {
    if (err instanceof appError_1.AppError) {
        return res.status(err.statusCode).json({
            message: err.message,
        });
    }
    return res.status(500).json({
        message: "Internal server error"
    });
};
exports.errorMiddleware = errorMiddleware;
