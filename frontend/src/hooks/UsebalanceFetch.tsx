import axios, { type AxiosResponse } from "axios";
import { useEffect, useState } from "react"
import { toast } from "sonner";



const useBalanceFetch=()=>{
    const [amount,setamount]=useState(0);
    function ToastNotifaction(res:AxiosResponse):void{
    if(res.status===200){
        setamount(res.data.balance)
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


    async function getbalance(){
    try{
    let response=await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/transaction/getBalance`,{
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
        getbalance()
    },[])
    return amount
}

export default useBalanceFetch