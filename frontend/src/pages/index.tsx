import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"


function Index() {
    const navigator=useNavigate()
  return (
    <div className="flex justify-center items-center h-screen flex-col space-y-2">
        <h1 className="md:text-5xl text-4xl font-semibold ">FakeTM</h1>
        <h2 className="md:text-xl text-xs italic ">"Totally legit. We swear. Please don't sue us."</h2>
        <div className="mx-2 my-10 flex flex-col gap-4 md:flex-row">
            <Button size={"lg"} onClick={()=>navigator("/signup")}>Create Your Fake™ Wallet</Button>
            <Button size={"lg"}onClick={()=>navigator("/signin")}>Return of the Spender</Button>
        </div>
    </div>
  )
}

export default Index
