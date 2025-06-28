"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtVerify = exports.jwtSign = void 0;
const dotenv_1 = require("dotenv");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
(0, dotenv_1.configDotenv)();
const jwtSign = (userId) => {
    try {
        return jsonwebtoken_1.default.sign({ userId }, process.env.JWT_SECERT, {
            expiresIn: "1h",
        });
    }
    catch (err) {
        console.error("JWT Sign Error:", err);
        throw new Error("Failed to sign JWT token");
    }
};
exports.jwtSign = jwtSign;
const jwtVerify = (token) => {
    if (!token || !process.env.JWT_SECERT)
        return null;
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECERT);
        if (typeof decoded === "object" && "userId" in decoded) {
            return decoded.userId;
        }
        return null;
    }
    catch (error) {
        console.error("JWT verification failed:", error);
        return null;
    }
};
exports.jwtVerify = jwtVerify;
