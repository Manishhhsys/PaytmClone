import { Button } from "./ui/button"


function Nav() {
  return (
    <div className="h-16 bg-vermilion-200 grid grid-cols-2 items-center shadow-sm">
        <div className=" text-2xl mx-2 font-bold font-sans ">
            Paytm
        </div>
        <div className="flex justify-end gap-4  items-center  mx-2">
            <div className="font-medium">
                UserName
            </div>
            <div>
                <Button className="rounded-full text-center" size={"icon"}>U</Button>
            </div>
        </div>
    </div>
  )
}

export default Nav
