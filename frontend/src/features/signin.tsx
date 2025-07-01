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
import { Link } from "react-router";

const signinSchema = z.object({
    email: z.string().email({ message: "Please Enter A valid Email Id" }),
    password: z.string().min(3, "Password must be at least 3 characters long ").regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
        .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
        .regex(/[0-9]/, { message: 'Password must contain at least one number' })
        .regex(/[@$!%*?&]/, { message: 'Password must contain at least one special character' })
})

function SiginIn() {
    
    const signupControl = useForm<z.infer<typeof signinSchema>>({
        resolver: zodResolver(signinSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })


    return (
        <div className="flex justify-center items-center h-screen w-screen">
            <Card className="md:w-[30%] w-[70%]">
                <CardHeader className="flex flex-col justify-center items-center">
                    <CardTitle className="text-2xl font-bold">Sign Up</CardTitle>
                    <CardDescription>Send Money To Your Frnds</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Form {...signupControl}>
                        <form className="space-y-4" onSubmit={signupControl.handleSubmit((data) => {
                            console.log(data)
                        })}>
                            
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
                                <label> Don't have an account? {" "} <Link to="/signup" className="text-blue-400 cursor-pointer">Sign Up</Link></label>
                            </p>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}

export default SiginIn
