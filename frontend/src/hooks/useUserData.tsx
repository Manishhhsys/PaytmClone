import axios, { type AxiosResponse } from "axios"
import { useEffect, useState } from "react"
import { toast } from "sonner"



const useUserData =()=>{
    const [user,setuser]=useState<any>([])
  function ToastNotifaction(res:AxiosResponse):void{
    if(res.status===200){
        setuser(res.data.data)
        return
    }

     const message =
    res.data?.messsage ||
    res.data?.message ||
    res.data?.error ||
    res.data?.msg ||
    res.statusText ||
    "Something went wrong";

  toast.error(` ${message}`);
}
    async function getuser(){
    try{
    let response=await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/user/getuser`,{
        headers:{
            Authorization:localStorage.getItem("token")
        }
    })
    ToastNotifaction(response)
}catch(e:any){
    if(axios.isAxiosError(e) && e.response){
        ToastNotifaction(e.response)
    }else{
        toast.error("Unexpected Error Occured")
    }
}
    }

    useEffect(()=>{
        getuser()
    },[])

    return [user ,getuser]
}


export default useUserData