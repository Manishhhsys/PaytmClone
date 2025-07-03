import Nav from '@/components/nav'
import { Input } from '@/components/ui/input'
import User from '@/components/user'
import useBalanceFetch from '@/hooks/UsebalanceFetch'
import useUserData from '@/hooks/useUserData'
import { Navigate, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'


function Dashboard() {
    const amount=useBalanceFetch();
    const [user,getuser]=useUserData();
    const navigator=useNavigate()
    console.log(user)
    if(!localStorage.getItem("token")){
        toast.error("Please Sign In")
        return <Navigate to={"/signin"}></Navigate>
    }else{
         return (
        <div>
            <Nav></Nav>
            <div>
                <div className='w-full h-10  shadow-md  my-5'>
                    <div className='px-4 text-md font-bold py-2'>Your Balance {amount}</div>
                </div>
                <div className='space-y-4 ml-5'>
                    <div>
                        Users
                    </div>
                    <Input placeholder='Search Users' ></Input>
                    <h2>User List</h2>
                    {user.map((e:any)=>(
                        <User onSend={()=>{
                            navigator("/send",{
                                state:{
                                receiverUserId:e.id,
                                    firstName:e.firstName,
                                    lastName:e.lastName
                                }
                            })
                        }} key={e.id} id={e.id} firstName={e.firstName} lastName={e.lastName} ></User>
                    ))
                    
                    }
                </div>
            </div>
        </div>
    )
    }
   
}

export default Dashboard
