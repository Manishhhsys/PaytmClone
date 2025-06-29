"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userUpdateschema = exports.userSchemaSignin = exports.UserSchema = void 0;
const zod_1 = require("zod");
exports.UserSchema = zod_1.z.object({
    firstName: zod_1.z.string(),
    lastName: zod_1.z.string(),
    password: zod_1.z.string().min(3, "The minimum of 3 character is needed"),
    email: zod_1.z.string().email(),
});
exports.userSchemaSignin = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(3, "The minimum of 3 character is needed")
});
exports.userUpdateschema = zod_1.z.object({
    firstName: zod_1.z.string().optional(),
    lastName: zod_1.z.string().optional(),
    email: zod_1.z.string().email().optional()
});
