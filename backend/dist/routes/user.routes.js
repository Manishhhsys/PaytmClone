"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controller/user.controller");
const router = (0, express_1.Router)();
router.post("/signin", user_controller_1.siginInController);
router.post("/signup", user_controller_1.singUpController);
// router.put("/updateprofile",ProfileUpdate);
// router.get("/getuser",getDetails)
exports.default = router;
