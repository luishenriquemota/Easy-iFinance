"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const error_middleware_1 = require("./middlewares/error.middleware");
const routes_1 = require("./routes");
const app = (0, express_1.default)();
app.use(express_1.default.json());
(0, routes_1.appRoutes)(app);
app.use(error_middleware_1.errorMiddleware);
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log("Rodando na porta " + port);
});
