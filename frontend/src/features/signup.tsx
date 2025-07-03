import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {  Link,  useNavigate } from "react-router";
import axios, { type AxiosResponse } from "axios"
import { toast } from "sonner"

const signupSchema = z.object({
    firstName: z.string().min(1, { message: "Please enter your first name" }),
    lastName: z.string().min(1, { message: "Please enter your last name" }),
    email: z.string().email({ message: "Please Enter A valid Email Id" }),
    password: z.string().min(3, "Password must be at least 3 characters long ").regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
        .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
        .regex(/[0-9]/, { message: 'Password must contain at least one number' })
        .regex(/[@$!%*?&]/, { message: 'Password must contain at least one special character' })
})






function SignUp() {
    const Navigate=useNavigate()
    const signupControl = useForm<z.infer<typeof signupSchema>>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            email: "",
            firstName: "",
            lastName: "",
            password: "",
        }
    })

    async function senddata(data: z.infer<typeof signupSchema>): Promise<void> {
try {
    const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/user/signup`, {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password
    });

    ToastNotifaction(res)
}catch(e:any){
    if(axios.isAxiosError(e) && e.response){
        ToastNotifaction(e.response)
    }else{
        toast.error("Unexpected Error Occured")
    }
}
   
}

function ToastNotifaction(res: AxiosResponse) {
    if (res.status === 200) {
        toast.success("Sign Up SuccessFull")
        Navigate("/signin")
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


    return (
        <div className="flex justify-center items-center h-screen w-screen">
            <Card className="md:w-[30%] w-[70%]">
                <CardHeader className="flex flex-col justify-center items-center">
                    <CardTitle className="text-2xl font-bold">Sign Up</CardTitle>
                    <CardDescription>Send Money To Your Frnds</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Form {...signupControl}>
                        <form className="space-y-4" onSubmit={signupControl.handleSubmit(senddata)}>
                            <FormField control={signupControl.control} name="firstName" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>First Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="John" type="text" required {...field}></Input>
                                    </FormControl>
                                    <FormMessage></FormMessage>
                                </FormItem>
                            )}
                            />
                            <FormField control={signupControl.control} name="lastName" render={({ field }) => (
                                <FormItem>
                                    <FormLabel >Last Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Dove" type="text" {...field} ></Input>
                                    </FormControl>
                                    <FormMessage></FormMessage>
                                </FormItem>
                            )} />
                            <FormField control={signupControl.control} name="email" render={({ field }) => (
                                <FormItem>
                                    <FormLabel >Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="johndove@yahoo.com" type="email" {...field} ></Input>
                                    </FormControl>
                                    <FormMessage></FormMessage>
                                </FormItem>
                            )} />
                            <FormField control={signupControl.control} name="password" render={({ field }) => (
                                <FormItem>
                                    <FormLabel >Password</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Password" type="password" {...field}></Input>
                                    </FormControl>
                                    <FormMessage></FormMessage>
                                </FormItem>

                            )} />
                            <div className="flex justify-center items-center">
                                <Button className="cursor-pointer  " type="submit" disabled={signupControl.formState.isSubmitting}>Sign Up</Button>
                            </div>
                            <p className="text-sm md:text-md text-center">
                                <label> Already Have A Account {" "} <Link to="/signin" className="text-blue-400">Sign In</Link></label>
                            </p>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}

export default SignUp
