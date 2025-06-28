import {Router,Request,Response} from "express"
import { UserSchema, userSchemaSignin } from "../schema/userSchema";
import { StatusCode } from "../types/statusCodeenums";
import { hashPassword, unHashPassword } from "../utils/hashPassword";
import prisma from "../utils/prismaClientConfig";
import { jwtSign } from "../utils/jwtGenAndSign";
const router=Router();

export const singUpController=async (req:Request,res:Response)=>{
    try{
        const parserdata=UserSchema.safeParse(req.body);
        if(!parserdata.success){
            res.status(StatusCode.UNPROCESSABLE_ENTITY).json({
                message:parserdata.error.message
            })
            return
        }
        const {firstName,lastName,email,password}=parserdata.data
        const findUniqueEmail=await prisma.user.findUnique({
            where:{
                email
            }
        })
        if(findUniqueEmail?.email===email){
            res.status(StatusCode.FORBIDDEN).json({
                messsage:"Email Already Exists Try an New Email Id"
            })
            return
        }
        const hasedvalue=await hashPassword(password);
        if(hasedvalue===null){
            res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
                message:"Unable to Hash the Password"
            })
            return
        }
        const response=await prisma.user.create({
            data:{
                firstName,
                lastName,
                email,
                password:hasedvalue
            }
        })
       if(!response){
        res.status(StatusCode.CREATED).json({
            message:"Unable to Create the Account"
        })
       }else{
        res.status(StatusCode.OK).json({
            message:"Success"
        })
       }
    }catch(e){
        console.log(e)
        res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
            message:"Internal Error"
        })
    }
}


export const siginInController=async (req:Request,res:Response)=>{
    try{
        const parserdata=userSchemaSignin.safeParse(req.body)
        if(!parserdata.success){
            res.status(StatusCode.UNPROCESSABLE_ENTITY).json({
                message:parserdata.error.message
            })
            return
        }
        const {email,password}=parserdata.data;
        const response=await prisma.user.findUnique({
            where:{
                email
            }
        })
        if(!response){
            res.status(StatusCode.NOT_FOUND).json({
                message:"Account Doesnt Exists"
            })
            return
        }
        const unhashedvalue=await unHashPassword(password,response?.password)
        if(!unhashedvalue){
            res.status(StatusCode.FORBIDDEN).json({
                message:"Invalid Password"
            })
            return
        }
        const token=await jwtSign(response.id)
        if(!token){
            res.status(StatusCode.UNPROCESSABLE_ENTITY).json({
                message:"Unable to Create The Jwt Token"
            })
            return
        }
        res.status(StatusCode.OK).json({
            message:"Bearer " + token
        })

    }catch(e){
        console.log(e)
        res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
            message:"Internal Server Error "
        })
    }
}

