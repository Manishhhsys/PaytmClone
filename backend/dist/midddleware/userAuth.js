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
Object.defineProperty(exports, "__esModule", { value: true });
const statusCodeenums_1 = require("../types/statusCodeenums");
const jwtGenAndSign_1 = require("../utils/jwtGenAndSign");
function userAuthCheck(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = req.headers.authorization;
            if (!token) {
                res.status(statusCodeenums_1.StatusCode.UNAUTHORIZED).json({
                    message: "Token Is missing"
                });
                return;
            }
            let jwt = token === null || token === void 0 ? void 0 : token.split(" ")[1];
            const userId = yield (0, jwtGenAndSign_1.jwtVerify)(jwt);
            if (!userId) {
                res.status(statusCodeenums_1.StatusCode.UNAUTHORIZED).json({
                    message: "The Token Is Invalid Or Invalid Format"
                });
                return;
            }
            req.userId = userId;
            next();
        }
        catch (e) {
            res.status(statusCodeenums_1.StatusCode.INTERNAL_SERVER_ERROR).json({
                message: "Internal server error during auth check"
            });
            return;
        }
    });
}
exports.default = userAuthCheck;
