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
        toast.success("Amount Added ")
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

function AddBalance() {
    async function addamount(data:{
        amount:number
    }):Promise<void> {
        try{
            const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/transaction/add-balance`,{
                amount:data.amount
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

    const addamountcontrol=useForm({
          defaultValues: { amount: 0 },
    })
  return (
    <div>
        <Nav></Nav>
    
    <div className='flex justify-center items-center h-screen'>
      <Card className='w-[70%] md:w-[30%] space-y-4'>
        <CardHeader>
            <CardTitle>
                Add Amount To Account
            </CardTitle>
            <CardDescription>
                Put An End to Your berozgar Life
            </CardDescription>
            </CardHeader>
            <CardContent>
            <Form {...addamountcontrol}>
                <form className="space-y-4"onSubmit={addamountcontrol.handleSubmit(addamount)}>
                <FormField control={addamountcontrol.control} name='amount' render={({field})=>(
                    <FormItem>
                        <FormLabel>Add Money </FormLabel>
                        <FormControl>
                            <Input type='number' placeholder='enter the Amount' {...field}></Input>
                        </FormControl>
                    </FormItem>
                )}/>
                <div className='flex items-center justify-center'>
                    <Button type='submit' disabled={addamountcontrol.formState.isSubmitting}>{addamountcontrol.formState.isSubmitting  ? "Adding balance": "Add balance"}</Button>
                </div>
                </form>
            </Form>
           </CardContent>     
      </Card>
    </div>
    </div>
  )
}

export default AddBalance
