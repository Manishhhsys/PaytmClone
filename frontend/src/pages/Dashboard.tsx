import Nav from '@/components/nav'
import { Input } from '@/components/ui/input'
import User from '@/components/user'


function Dashboard() {
    return (
        <div>
            <Nav></Nav>
            <div>
                <div className='w-full h-10  shadow-md  my-5'>
                    <div className='px-4 text-md font-bold py-2'>Your Balance {"hi"}</div>
                </div>
                <div className='space-y-4 ml-5'>
                    <div>
                        Users
                    </div>
                    <Input placeholder='Search Users' ></Input>
                    <h2>User List</h2>
                    <User></User>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
