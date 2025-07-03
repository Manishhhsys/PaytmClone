import { Router } from "express";
import { getDetails, ProfileUpdate, siginInController, singUpController } from "../controller/user.controller";
import userAuthCheck from "../midddleware/userAuth";
import { filterUserByName, getUserById } from "../controller/account.controller";

const router=Router();

router.post("/signin",siginInController);
router.post("/signup",singUpController);
router.put("/updateprofile",userAuthCheck,ProfileUpdate);
router.get("/getuser",userAuthCheck,getDetails)
router.get("/getuserbyid",userAuthCheck,getUserById);
router.get("/filter",userAuthCheck,filterUserByName)


export default router