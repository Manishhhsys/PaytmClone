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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unHashPassword = exports.hashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    if (!password) {
        return null;
    }
    try {
        console.log(password);
        const value = yield bcrypt_1.default.hash(password, 10);
        return value;
    }
    catch (e) {
        console.log(e);
        return null;
    }
});
exports.hashPassword = hashPassword;
const unHashPassword = (plainPassword, hasedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    if (!hasedPassword || !plainPassword)
        return null;
    try {
        return bcrypt_1.default.compare(plainPassword, hasedPassword);
    }
    catch (e) {
        console.log(e);
        return false;
    }
});
exports.unHashPassword = unHashPassword;
