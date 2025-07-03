import {Router,Request,Response, json} from "express"
import { UserSchema, userSchemaSignin, userUpdateschema } from "../schema/userSchema";
import { StatusCode } from "../types/statusCodeenums";
import { hashPassword, unHashPassword } from "../utils/hashPassword";
import prisma from "../utils/prismaClientConfig";
import { jwtSign } from "../utils/jwtGenAndSign";
import { OK } from "zod";
import { off } from "npm";
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
                message:"Email Already Exists Try an New Email Id"
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
       }
       const responseaccount=await prisma.account.create({
            data:{
                userId:response.id,
                balance:0
            }
        })
        if(!responseaccount){
            res.status(StatusCode.UNPROCESSABLE_ENTITY).json({
                message:"Unable To create The Account Balance"
            })
        }
        res.status(StatusCode.OK).json({
            message:"Success"
        })
       

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
            message:"Success",
            token:"Bearer " + token
        })

    }catch(e){
        console.log(e)
        res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
            message:"Internal Server Error "
        })
    }
}


export const ProfileUpdate=async(req:Request,res:Response)=>{
    try{
        const parserdata=userUpdateschema.safeParse(req.body)
        if(!parserdata.success){
            res.status(StatusCode.UNPROCESSABLE_ENTITY).json({
                message:parserdata.error.message
            })
            return
        }
        const {firstName,lastName,email}=parserdata.data;
        const updateData: Record<string, any> = {};
            if (firstName !== undefined) updateData.firstName = firstName;
            if (lastName !== undefined) updateData.lastName = lastName;
            if (email !== undefined) updateData.email = email;

           
            if (Object.keys(updateData).length === 0) {
             res.status(StatusCode.BAD_REQUEST).json({
                message: "No update fields provided",
            });
            return
            }

       
        const response=await prisma.user.update({
            where:{
                id:req.userId
            },
            data:updateData
        })
        if(!response){
            res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
                message:"Unable to Update the Details"
            })
            return
        }
        res.status(StatusCode.OK).json({
            message:"Details Updated"
        })
        return
    }catch(e){
        console.log(e)
        res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
            message:"Internal Error While Updating the Details"
        })
    }
}


export const getDetails=async(req:Request,res:Response)=>{
    try{
       const limit = parseInt(req.query.limit as string) || 10;
       const offset = parseInt(req.query.offset as string) || 0;
        const response=await prisma.user.findMany({
            select:{
                firstName:true,
                lastName:true,
                id:true
            },
            skip:offset,
            take:limit
            
        })
        if(!response){
            res.status(StatusCode.FORBIDDEN)
            return
        }
        res.status(StatusCode.OK).json({
            data:response
        })
    }catch(e){
        console.log(e)
        res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
            message:"Internal Error"
        })
    }
}