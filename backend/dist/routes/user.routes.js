"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controller/user.controller");
const userAuth_1 = __importDefault(require("../midddleware/userAuth"));
const router = (0, express_1.Router)();
router.post("/signin", user_controller_1.siginInController);
router.post("/signup", user_controller_1.singUpController);
router.put("/updateprofile", userAuth_1.default, user_controller_1.ProfileUpdate);
router.get("/getuser", userAuth_1.default, user_controller_1.getDetails);
exports.default = router;
