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
exports.sendAmount = exports.addAmount = exports.balanceFetch = void 0;
const prismaClientConfig_1 = __importDefault(require("../utils/prismaClientConfig"));
const statusCodeenums_1 = require("../types/statusCodeenums");
const balanceFetch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const response = yield prismaClientConfig_1.default.account.findFirst({
            where: {
                userId
            },
            select: {
                balance: true
            }
        });
        if (!response) {
            res.status(statusCodeenums_1.StatusCode.NOT_FOUND).json({
                message: "InValid User Id"
            });
            return;
        }
        const final = (response.balance) / 100;
        res.status(statusCodeenums_1.StatusCode.OK).json({
            message: "Success",
            balance: final
        });
        return;
    }
    catch (e) {
        console.log(e);
        res.status(statusCodeenums_1.StatusCode.INTERNAL_SERVER_ERROR).json({
            message: "Internal Error While Getting the Balance"
        });
        return;
    }
});
exports.balanceFetch = balanceFetch;
const addAmount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const amount = parseInt(req.body.amount);
        if (isNaN(amount) || amount <= 0) {
            res.status(statusCodeenums_1.StatusCode.BAD_REQUEST).json({
                message: "Invalid amount",
            });
            return;
        }
        const response = yield prismaClientConfig_1.default.account.upsert({
            where: { userId: userId },
            update: {
                balance: {
                    increment: (amount * 100)
                }
            },
            create: {
                userId,
                balance: (amount * 100)
            }
        });
        if (!response) {
            res.status(statusCodeenums_1.StatusCode.UNAUTHORIZED).json({
                message: "Unable to Add Balance Invalid User ID"
            });
            return;
        }
        res.status(statusCodeenums_1.StatusCode.OK).json({
            message: "Success",
            balance: (response.balance) / 100
        });
        return;
    }
    catch (e) {
        console.log(e);
        res.status(statusCodeenums_1.StatusCode.INTERNAL_SERVER_ERROR).json({
            message: "Internal Error While Adding Balance"
        });
        return;
    }
});
exports.addAmount = addAmount;
const sendAmount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const senderuserId = req.userId;
        const receiverUserId = req.body.receiverUserId;
        const amount = Number((req.body.userbalance).toFixed(2));
        const amountInPaise = Math.round(amount * 100);
        if (senderuserId === receiverUserId) {
            res.status(statusCodeenums_1.StatusCode.BAD_REQUEST).json({
                message: "The Self Transfer Cant be Done"
            });
            return;
        }
        if (isNaN(amountInPaise) || amountInPaise <= 0) {
            res.status(statusCodeenums_1.StatusCode.BAD_REQUEST).json({
                message: "Invalid transfer amount",
            });
            return;
        }
        if (!receiverUserId) {
            res.status(statusCodeenums_1.StatusCode.UNPROCESSABLE_ENTITY).json({
                messsage: "Receiver UserId is Missing"
            });
            return;
        }
        const receiverUserIdRespone = yield prismaClientConfig_1.default.account.findFirst({
            where: {
                userId: receiverUserId
            }, select: {
                userId: true
            }
        });
        if (!receiverUserIdRespone) {
            res.status(statusCodeenums_1.StatusCode.NOT_FOUND).json({
                message: "Recevier Id Doesnt Exist"
            });
            return;
        }
        const senderuserIdResponse = yield prismaClientConfig_1.default.account.findFirst({
            where: {
                userId: senderuserId
            }, select: {
                balance: true
            }
        });
        if (!senderuserIdResponse || senderuserIdResponse.balance < amountInPaise) {
            res.status(statusCodeenums_1.StatusCode.BAD_REQUEST).json({
                message: "Insufficient balance"
            });
            return;
        }
        const response = yield prismaClientConfig_1.default.$transaction([
            prismaClientConfig_1.default.account.update({
                where: {
                    userId: senderuserId
                },
                data: {
                    balance: {
                        decrement: amountInPaise
                    }
                },
                select: {
                    balance: true
                }
            }),
            prismaClientConfig_1.default.account.update({
                where: {
                    userId: receiverUserId
                },
                data: {
                    balance: {
                        increment: amountInPaise
                    }
                }
            })
        ]);
        let finalbalance = response[0].balance;
        res.status(statusCodeenums_1.StatusCode.OK).json({
            message: "Success",
            balance: finalbalance / 100
        });
    }
    catch (e) {
        console.log(e);
        res.status(statusCodeenums_1.StatusCode.INTERNAL_SERVER_ERROR).json({
            message: "Internal Error while Sending The Money"
        });
    }
});
exports.sendAmount = sendAmount;
