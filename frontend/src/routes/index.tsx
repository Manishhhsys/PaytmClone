import AddBalance from "@/features/AddBalance";
import SiginIn from "@/features/signin";
import SignUp from "@/features/signup";
import UpdateProfile from "@/features/UpdateProfile";
import Index from "@/pages";
import Page404 from "@/pages/404";
import Dashboard from "@/pages/Dashboard";
import { Send } from "lucide-react";

import { Route, Routes } from "react-router-dom";


export default function Approutes(){
    return (
      <Routes>
        <Route path='/signup'element={<SignUp></SignUp>}></Route>
        <Route path='/signin' element={<SiginIn></SiginIn>}></Route>
        <Route path='/dashboard'element={<Dashboard></Dashboard>}></Route>
        <Route path='/send' element={<Send></Send>}></Route>
        <Route path='addbalance' element={<AddBalance></AddBalance>}></Route>
        <Route path='/update-profile' element={<UpdateProfile></UpdateProfile>}></Route>
        <Route path='*'  element={<Page404></Page404>}></Route>
        <Route index path='/' element={<Index></Index>}></Route>
      </Routes>
    
    )
}