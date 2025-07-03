import { BrowserRouter } from 'react-router-dom'
import './App.css'
import { Toaster } from 'sonner'
import Approutes from './routes'

function App() {
  return (
    <>
      <Toaster position="top-center" />
      <BrowserRouter>
        <Approutes></Approutes>
      </BrowserRouter>
    </>
  )

}

export default App
