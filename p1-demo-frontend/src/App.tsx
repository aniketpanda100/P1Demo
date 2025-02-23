import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login } from './Components/LoginRegister/Login'
import 'bootstrap/dist/css/bootstrap.css'
import { Register } from './Components/LoginRegister/Register'
import { UserTable } from './Components/User/UserTable'
import { ReimbursementTable } from './Components/Reimbursements/ReimbursementTable'
import { CreateReimbursement } from './Components/Reimbursements/CreateReimbursement'
//^THIS IS A REQUIRED MANUAL IMPORT FOR BOOTSTRAP TO WORK!!!

function App() {

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      
      <BrowserRouter>
        <Routes>
          {/* empty string or / for path makes the component render at startup */}
          <Route path="" element={<Login/>}/>
          <Route path="register" element={<Register/>}/>
          <Route path="users" element={<UserTable/>}/>
          <Route path="reimbursements" element={<ReimbursementTable/>}/>
          <Route path="create-reimbursement" element={<CreateReimbursement/>}/>
        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App