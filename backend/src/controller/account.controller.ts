import { Response, Request } from "express"
import prisma from "../utils/prismaClientConfig"
import { StatusCode } from "../types/statusCodeenums"


export const balanceFetch = async (req: Request, res: Response) => {
    try {
        const userId = req.userId
        const response = await prisma.account.findFirst({
            where: {
                userId
            },
            select: {
                balance: true
            }
        })
        if (!response) {
            res.status(StatusCode.NOT_FOUND).json({
                message: "InValid User Id"
            })
            return
        }
        const final = (response.balance) / 100
        res.status(StatusCode.OK).json({
            message: "Success",
            balance: final
        })
        return

    } catch (e) {
        console.log(e)
        res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
            message: "Internal Error While Getting the Balance"
        })
        return
    }
}

export const addAmount = async (req: Request, res: Response) => {
    try {
        const userId = req.userId
        const amount = parseInt(req.body.amount)
        if (isNaN(amount) || amount <= 0) {
            res.status(StatusCode.BAD_REQUEST).json({
                message: "Invalid amount",
            });
            return
        }

        const response = await prisma.account.update({
            where: { userId: userId },
            data: {
                balance: {
                    increment: (amount * 100)
                }
            }
        })
        if (!response) {
            res.status(StatusCode.UNAUTHORIZED).json({
                message: "Unable to Add Balance Invalid User ID"
            })

            return
        }
        res.status(StatusCode.OK).json({
            message: "Success",
            balance: (response.balance) / 100
        })

        return
    } catch (e) {
        console.log(e)
        res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
            message: "Internal Error While Adding Balance"
        })
        return
    }
}

export const sendAmount = async (req: Request, res: Response) => {
    try {
        const senderuserId = req.userId
        const receiverUserId = req.body.receiverUserId
        const amount = Number((req.body.userbalance).toFixed(2));
        const amountInPaise = Math.round(amount * 100);
        if (senderuserId === receiverUserId) {
            res.status(StatusCode.BAD_REQUEST).json({
                message: "The Self Transfer Cant be Done"
            })
            return
        }
        if (isNaN(amountInPaise) || amountInPaise <= 0) {
            res.status(StatusCode.BAD_REQUEST).json({
                message: "Invalid transfer amount",
            });
            return
        }

        if (!receiverUserId) {
            res.status(StatusCode.UNPROCESSABLE_ENTITY).json({
                messsage: "Receiver UserId is Missing"
            })
            return
        }
        const receiverUserIdRespone = await prisma.account.findFirst({
            where: {
                userId: receiverUserId
            }, select: {
                userId: true
            }
        })
        if (!receiverUserIdRespone) {
            res.status(StatusCode.NOT_FOUND).json({
                message: "Recevier Id Doesnt Exist"
            })
            return
        }
        const senderuserIdResponse = await prisma.account.findFirst({
            where: {
                userId: senderuserId
            }, select: {
                balance: true
            }
        })
        if (!senderuserIdResponse || senderuserIdResponse.balance < amountInPaise) {
            res.status(StatusCode.BAD_REQUEST).json({
                message: "Insufficient balance"
            })
            return
        }

        const response = await prisma.$transaction([
            prisma.account.update({
                where: {
                    userId: senderuserId
                },
                data: {
                    balance: {
                        decrement: amountInPaise
                    }
                },
                select: {
                    balance: true
                }
            })
            ,
            prisma.account.update({
                where: {
                    userId: receiverUserId
                },
                data: {
                    balance: {
                        increment: amountInPaise
                    }
                }
            })
        ])
        let finalbalance = response[0].balance
        res.status(StatusCode.OK).json({
            message: "Success",
            balance: finalbalance / 100
        })

    } catch (e) {
        console.log(e)
        res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
            message: "Internal Error while Sending The Money"
        })
    }
}