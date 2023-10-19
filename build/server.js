"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("config"));
const connect_1 = __importDefault(require("./db/connect"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
(0, connect_1.default)(config_1.default.get("database"));
app.listen(config_1.default.get("PORT"), () => {
    console.log("server started on port", config_1.default.get("PORT"));
});