import { Router } from "express";
import { siginInController, singUpController } from "../controller/user.controller";

const router=Router();

router.post("/signin",siginInController);
router.post("/signup",singUpController);
// router.put("/updateprofile",ProfileUpdate);
// router.get("/getuser",getDetails)


export default router