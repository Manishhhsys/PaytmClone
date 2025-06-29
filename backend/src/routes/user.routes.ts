import { Router } from "express";
import { getDetails, ProfileUpdate, siginInController, singUpController } from "../controller/user.controller";
import userAuthCheck from "../midddleware/userAuth";

const router=Router();

router.post("/signin",siginInController);
router.post("/signup",singUpController);
router.put("/updateprofile",userAuthCheck,ProfileUpdate);
router.get("/getuser",userAuthCheck,getDetails)


export default router