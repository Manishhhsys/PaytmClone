import React from 'react'
import { Button } from './ui/button'

function User() {
  return (
     <div className='grid grid-cols-[70%_30%]'>
                        <div className='flex justify-start items-center gap-2'>
                            <Button variant={"secondary"} size={"icon"} className='rounded-full '>{"H"}</Button>
                            <div>{"manish Kumar"}</div>
                        </div>
                        <div className="flex justify-end">
                            <Button className='mr-2' variant="default">Send Money</Button>
                        </div>

                    </div>
  )
}

export default User
