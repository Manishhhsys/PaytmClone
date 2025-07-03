import bcrypt from "bcrypt"



export const hashPassword=async (password:string):Promise<string | null>=>{
    if(!password) {return null}
    try{
       
        const value= await bcrypt.hash(password,10) 
        return value
    }catch(e){
        console.log(e)
        return null
    }
}

export const unHashPassword=async (plainPassword:string,hasedPassword:string):Promise< null | boolean >=>{
    if(!hasedPassword || !plainPassword) return null
    try{
        return bcrypt.compare(plainPassword,hasedPassword)
    }catch(e){
        console.log(e)
        return false
    }
}