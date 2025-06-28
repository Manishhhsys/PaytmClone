"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
const jwtGenAndSign_1 = require("./utils/jwtGenAndSign");
(0, dotenv_1.configDotenv)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const value = (0, jwtGenAndSign_1.jwtSign)("3131233231321");
console.log("sfsfhsfhsbfbsf");
const value2 = (0, jwtGenAndSign_1.jwtVerify)(value);
if (value2) {
    console.log(value2);
}
else {
    console.log("Invalid jwt Token");
}
app.listen(process.env._PORT, () => {
    console.log("Server is Running");
});
