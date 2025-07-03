import Nav from '@/components/nav'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FormControl, FormField, FormItem, FormLabel,Form } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import axios, { type AxiosResponse } from 'axios'

import {  useForm } from 'react-hook-form'
import { toast } from 'sonner'


function toastNotifcation(res:AxiosResponse){
    if(res.status===200) {
        toast.success("Profile Updated")
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

function UpdateProfile() {
    async function updatePR(data:{
        firstName:string | "",
        lastName:string | "",
        email:string | ""
    }):Promise<void> {
        try{
            const response=await axios.put(`${import.meta.env.VITE_BASE_URL}/api/v1/user/updateprofile`,{
                firstName:data.firstName,
                lastName:data.lastName,
                email:data.email,
            },{
                headers:{
                    Authorization:localStorage.getItem("token")
                }
            })
            toastNotifcation(response)
        }catch(e:any){
            if(axios.isAxiosError(e)&& e.response){
                toastNotifcation(e.response)
            }else{
                toast.error("An error occured")
            }
        }
    }

    const updatecontrol=useForm({
          defaultValues: { firstName: "",
            lastName: "",
            email: ""
           },
    })
  return (
    <div>
        <Nav></Nav>
    
    <div className='flex justify-center items-center h-screen'>
      <Card className='w-[70%] md:w-[30%] space-y-4'>
        <CardHeader>
            <CardTitle>
               Update Your Profile
            </CardTitle>
            <CardDescription>
                Give Your Self An New Identity
            </CardDescription>
            </CardHeader>
            <CardContent>
            <Form {...updatecontrol}>
                <form className="space-y-4"onSubmit={updatecontrol.handleSubmit(updatePR)}>
                <FormField control={updatecontrol.control} name='firstName' render={({field})=>(
                    <FormItem>
                        <FormLabel>FirstName </FormLabel>
                        <FormControl>
                            <Input type='text' placeholder='Enter the FirstName' {...field}></Input>
                        </FormControl>
                    </FormItem>
                )}/>
                 <FormField control={updatecontrol.control} name='lastName' render={({field})=>(
                    <FormItem>
                        <FormLabel>LastName </FormLabel>
                        <FormControl>
                            <Input type='text' placeholder='Enter the LastName' {...field}></Input>
                        </FormControl>
                    </FormItem>
                )}/>
                 <FormField control={updatecontrol.control} name='email' render={({field})=>(
                    <FormItem>
                        <FormLabel>Email </FormLabel>
                        <FormControl>
                            <Input type='email' placeholder='Enter the Email' {...field}></Input>
                        </FormControl>
                    </FormItem>
                )}/>
                <div className='flex items-center justify-center'>
                    <Button type='submit' disabled={updatecontrol.formState.isSubmitting}>{updatecontrol.formState.isSubmitting  ? "Updating the Profile": "Update Profile"}</Button>
                </div>
                </form>
            </Form>
           </CardContent>     
      </Card>
    </div>
    </div>
  )
}

export default UpdateProfile
