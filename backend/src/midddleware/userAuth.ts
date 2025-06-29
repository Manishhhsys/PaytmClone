import express, { json, NextFunction,Request,Response } from "express"
import { StatusCode } from "../types/statusCodeenums";
import { jwtVerify } from "../utils/jwtGenAndSign";

declare global{
    namespace Express{
        interface Request{
            userId:string
        }
    }
}



async function userAuthCheck(req:Request,res:Response,next:NextFunction){
    try{
        const token=req.headers.authorization;
        if(!token){
            res.status(StatusCode.UNAUTHORIZED).json({
                message:"Token Is missing"
            })
            return 
        }
        let jwt=token?.split(" ",)[1]
        const userId=await jwtVerify(jwt)
        if(!userId){
            res.status(StatusCode.UNAUTHORIZED).json({
                message:"The Token Is Invalid Or Invalid Format"
            })
            return
        }
        req.userId=userId
        next()
    }catch(e){
        res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
            message:"Internal server error during auth check"
        })
        return
    }
}

export default userAuthCheck;