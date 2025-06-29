import { Router } from "express";
import userAuthCheck from "../midddleware/userAuth";
import { addAmount, balanceFetch, sendAmount } from "../controller/account.controller";

const router=Router();

router.get("/getBalance",userAuthCheck,balanceFetch);
router.post("/send",userAuthCheck,sendAmount);
router.post("/add-balance",userAuthCheck,addAmount)


export default router