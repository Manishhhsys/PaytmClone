
import { Button } from './ui/button'
interface Userprops{
    firstName:string,
    lastName:string,
    id?:string,
    onSend:()=>void
}
function User({firstName,lastName,id,onSend}:Userprops) {
  return (
     <div className='grid grid-cols-[70%_30%] ' id={id}>
                        <div className='flex justify-start items-center gap-2'>
                            <Button variant={"secondary"} size={"icon"} className='rounded-full '>{firstName.slice(0,1)}</Button>
                            <div>{firstName} {lastName}</div>
                        </div>
                        <div className="flex justify-end">
                            <Button className='mr-2' variant="default" onClick={onSend}>Send Money</Button>
                        </div>

                    </div>
  )
}

export default User
