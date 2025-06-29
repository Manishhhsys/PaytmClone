import {z} from "zod"


export const UserSchema=z.object({
    firstName:z.string(),
    lastName:z.string(),
    password:z.string().min(3,"The minimum of 3 character is needed"),
    email:z.string().email(),

})

export const userSchemaSignin=z.object({
    email:z.string().email(),
    password:z.string().min(3,"The minimum of 3 character is needed")
})

export const userUpdateschema=z.object({
    firstName:z.string().optional(),
    lastName:z.string().optional(),
    email:z.string().email().optional()
})