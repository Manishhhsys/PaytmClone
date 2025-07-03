import Nav from '@/components/nav'
import { Input } from '@/components/ui/input'
import User from '@/components/user'
import useBalanceFetch from '@/hooks/UsebalanceFetch'
import useUserData from '@/hooks/useUserData'
import axios from 'axios'
import { useEffect,  useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'



function Dashboard() {
    const amount = useBalanceFetch();
    const [user, ] = useUserData();
    const navigator = useNavigate();
    const [filter, setfilteruser] = useState<string[]>([])
    const [searchTerm, setSearchTerm] = useState<string>("");

    useEffect(() => {
        const delay = setTimeout(() => {
            getfilteruser(searchTerm);
        }, 500);

        return () => clearTimeout(delay);
    }, [searchTerm]);

    async function getfilteruser(searchterm: string) {
        try {
            const value = searchterm.split(" ") || [];
            const firstName = value[0] || "";
            const lastName = value[1] || "";
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/user/filter`, {
                params: {
                    firstName,
                    lastName
                },
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            },)
            setfilteruser(response.data.data)
        } catch (e) {
            console.log(e)
        }
    }

    if (!localStorage.getItem("token")) {
        toast.error("Please Sign In")
        return <Navigate to={"/signin"}></Navigate>
    } else {
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
                        <Input placeholder='Search Users' onChange={(e) => setSearchTerm(e.target.value)}></Input>
                        <h2>User List</h2>
                        {(searchTerm.trim() && filter.length === 0) ? (
                            <div className="text-gray-500 font-semibold">No users found for that search.</div>
                        ) : (
                            (filter.length > 0 ? filter : user).map((e: any) => (
                                <User
                                    key={e.id}
                                    onSend={() => {
                                        navigator("/send", {
                                            state: {
                                                receiverUserId: e.id,
                                                firstName: e.firstName,
                                                lastName: e.lastName,
                                            },
                                        });
                                    }}
                                    id={e.id}
                                    firstName={e.firstName}
                                    lastName={e.lastName}
                                />
                            ))
                        )}
                    </div>
                </div>
            </div>
        )
    }

}

export default Dashboard
