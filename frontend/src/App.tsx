
import './App.css'


import SiginIn from './features/signin'

import SignUp from './features/signup'
import {BrowserRouter, Route,  Routes} from "react-router-dom"
import Dashboard from './pages/Dashboard'
import { Toaster } from 'sonner'
import Send from './features/send'
function App() {
 return(
  <>
  <Toaster position="top-center"/>
    <BrowserRouter>
      <Routes>
        <Route path='/signup'element={<SignUp></SignUp>}></Route>
        <Route path='/signin' element={<SiginIn></SiginIn>}></Route>
        <Route path='/dashboard'element={<Dashboard></Dashboard>}></Route>
        <Route path='/send' element={<Send></Send>}></Route>
      </Routes>
    </BrowserRouter>
  </>
 ) 
 
}

export default App
