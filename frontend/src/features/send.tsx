import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import axios, { type AxiosResponse } from 'axios'
import { useForm } from 'react-hook-form'
import {  useLocation } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from "zod"

const sendSchema = z.object({
  receiverUserId: z.string(),
  userbalance: z.preprocess(
    (val) => Number(val),
    z.number({
      required_error: "Amount is required",
      invalid_type_error: "Must be a number",
    }).min(1, "Amount must be greater than 0")
  ),
});

function ToastNotifaction(res:AxiosResponse){
        if(res.status===200){
            toast.success(res.data.message)
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


function Send() {
    const location=useLocation();
     type SendFormType = z.infer<typeof sendSchema>;
    const {firstName = "", lastName = "",receiverUserId="" } = location.state || {};
    const sendControl = useForm({
  resolver: zodResolver(sendSchema),
  defaultValues: {
    receiverUserId,
    userbalance: 0,
  },
});
   
    async function sendtrans(data:SendFormType){
        try{
        const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/transaction/send`,{
                receiverUserId:data.receiverUserId,
                userbalance:data.userbalance
        },{
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

    return (
        <div className='flex  items-center justify-center h-screen '>
            <Card className='md:w-[30%] w-[70%]'>
                <CardHeader>
                    <CardTitle>Send Money To Your dost</CardTitle>
                    <CardDescription>Fake It Till You make It</CardDescription>
                </CardHeader>
                <CardContent className='space-y-4'>
                    <div className='flex  justify-start gap-2 md:gap-4 items-center'>
                        <Button size={'icon'} className='rounded-full md:px-7 md:py-7 px-4 py-4'>{firstName.slice(0,1)}</Button>
                        <div>{firstName} {lastName}</div>
                    </div>
                    <Form {...sendControl}>
                        <form className="space-y-4" onSubmit={sendControl.handleSubmit(sendtrans)}>
                            <FormField
                                control={sendControl.control}
                                name="userbalance"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Enter the Amount</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='Enter the Amount'
                                                type='number'
                                                {...field}
                                                value={field.value as number | undefined}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField control={sendControl.control} name='receiverUserId' render={({field})=>(
                                <FormItem>
                                    <FormControl>
                                        <Input  type='hidden' {...field}></Input>    
                                    
                                    </FormControl>
                                </FormItem>
                            )}></FormField>
                            <div className='flex justify-center items-center'>
                                <Button type="submit" className='hover:cursor-pointer' disabled={sendControl.formState.isSubmitting}>{sendControl.formState.isSubmitting ? "Transfering the Money" : "Initate Transfer"}</Button>
                            </div>


                        </form>
                    </Form>
                </CardContent>

            </Card>
        </div>
    )
}

export default Send
