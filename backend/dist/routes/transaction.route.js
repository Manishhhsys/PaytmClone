"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userAuth_1 = __importDefault(require("../midddleware/userAuth"));
const account_controller_1 = require("../controller/account.controller");
const router = (0, express_1.Router)();
router.get("/getBalance", userAuth_1.default, account_controller_1.balanceFetch);
router.post("/send", userAuth_1.default, account_controller_1.sendAmount);
router.post("/add-balance", userAuth_1.default, account_controller_1.addAmount);
exports.default = router;
