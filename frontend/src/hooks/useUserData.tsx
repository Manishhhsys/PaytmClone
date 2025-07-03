import axios, { type AxiosResponse } from "axios"
import { useEffect, useState } from "react"
import { toast } from "sonner"

const useUserData = () => {
  const [user, setUser] = useState<any[]>([])
  const [username, setUsername] = useState<string>("")

  function ToastNotifaction(res: AxiosResponse, updateState?: () => void): void {
    if (res.status === 200) {
      updateState?.()
      
      return
    }

    const message =
      res.data?.messsage ||
      res.data?.message ||
      res.data?.error ||
      res.data?.msg ||
      res.statusText ||
      "Something went wrong"

    toast.error(message)
  }

  async function getuser() {
    try {
      const [userListRes, userNameRes] = await axios.all([
        axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/user/getuser`, {
          headers: { Authorization: localStorage.getItem("token") }
        }),
        axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/user/getuserbyid`, {
          headers: { Authorization: localStorage.getItem("token") }
        })
      ])

      
      ToastNotifaction(userListRes, () => setUser(userListRes.data.data))
      ToastNotifaction(userNameRes, () => setUsername(userNameRes.data.data || ""))
    } catch (e: any) {
      if (axios.isAxiosError(e) && e.response) {
        ToastNotifaction(e.response)
      } else {
        toast.error("Unexpected Error Occurred")
      }
    }
  }

  useEffect(() => {
    getuser()
  }, [])
  
  return [user, getuser, username] as const
}

export default useUserData
