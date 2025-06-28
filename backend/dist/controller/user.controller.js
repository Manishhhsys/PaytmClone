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
exports.siginInController = exports.singUpController = void 0;
const express_1 = require("express");
const userSchema_1 = require("../schema/userSchema");
const statusCodeenums_1 = require("../types/statusCodeenums");
const hashPassword_1 = require("../utils/hashPassword");
const prismaClientConfig_1 = __importDefault(require("../utils/prismaClientConfig"));
const jwtGenAndSign_1 = require("../utils/jwtGenAndSign");
const router = (0, express_1.Router)();
const singUpController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parserdata = userSchema_1.UserSchema.safeParse(req.body);
        if (!parserdata.success) {
            res.status(statusCodeenums_1.StatusCode.UNPROCESSABLE_ENTITY).json({
                message: parserdata.error.message
            });
            return;
        }
        const { firstName, lastName, email, password } = parserdata.data;
        const findUniqueEmail = yield prismaClientConfig_1.default.user.findUnique({
            where: {
                email
            }
        });
        if ((findUniqueEmail === null || findUniqueEmail === void 0 ? void 0 : findUniqueEmail.email) === email) {
            res.status(statusCodeenums_1.StatusCode.FORBIDDEN).json({
                messsage: "Email Already Exists Try an New Email Id"
            });
            return;
        }
        const hasedvalue = yield (0, hashPassword_1.hashPassword)(password);
        if (hasedvalue === null) {
            res.status(statusCodeenums_1.StatusCode.INTERNAL_SERVER_ERROR).json({
                message: "Unable to Hash the Password"
            });
            return;
        }
        const response = yield prismaClientConfig_1.default.user.create({
            data: {
                firstName,
                lastName,
                email,
                password: hasedvalue
            }
        });
        if (!response) {
            res.status(statusCodeenums_1.StatusCode.CREATED).json({
                message: "Unable to Create the Account"
            });
        }
        else {
            res.status(statusCodeenums_1.StatusCode.OK).json({
                message: "Success"
            });
        }
    }
    catch (e) {
        console.log(e);
        res.status(statusCodeenums_1.StatusCode.INTERNAL_SERVER_ERROR).json({
            message: "Internal Error"
        });
    }
});
exports.singUpController = singUpController;
const siginInController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parserdata = userSchema_1.userSchemaSignin.safeParse(req.body);
        if (!parserdata.success) {
            res.status(statusCodeenums_1.StatusCode.UNPROCESSABLE_ENTITY).json({
                message: parserdata.error.message
            });
            return;
        }
        const { email, password } = parserdata.data;
        const response = yield prismaClientConfig_1.default.user.findUnique({
            where: {
                email
            }
        });
        if (!response) {
            res.status(statusCodeenums_1.StatusCode.NOT_FOUND).json({
                message: "Account Doesnt Exists"
            });
            return;
        }
        const unhashedvalue = yield (0, hashPassword_1.unHashPassword)(password, response === null || response === void 0 ? void 0 : response.password);
        if (!unhashedvalue) {
            res.status(statusCodeenums_1.StatusCode.FORBIDDEN).json({
                message: "Invalid Password"
            });
            return;
        }
        const token = yield (0, jwtGenAndSign_1.jwtSign)(response.id);
        if (!token) {
            res.status(statusCodeenums_1.StatusCode.UNPROCESSABLE_ENTITY).json({
                message: "Unable to Create The Jwt Token"
            });
            return;
        }
        res.status(statusCodeenums_1.StatusCode.OK).json({
            message: "Bearer " + token
        });
    }
    catch (e) {
        console.log(e);
        res.status(statusCodeenums_1.StatusCode.INTERNAL_SERVER_ERROR).json({
            message: "Internal Server Error "
        });
    }
});
exports.siginInController = siginInController;
