import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter , Route , Routes } from 'react-router-dom'
import Admin from './features/admin-panel/pages/Admin'
import SubAdmin from './features/sub-admin-panel/pages/SubAdmin'
import Employee from './features/employee-panel/pages/Employee'
import RootLayout from './component/RootLayout'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <BrowserRouter>
        <Routes>
          <Route path='/' element={<RootLayout/>}>
            <Route index element={<Admin/>}/>
            <Route path='sub-admin' element={<SubAdmin/>}/>
            <Route path='employee' element={<Employee/>}/>
          </Route>
        </Routes>
        </BrowserRouter>
    </>
  )   
}

export default App
