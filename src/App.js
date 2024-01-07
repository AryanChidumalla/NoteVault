import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import SignUp from './SignUp';
import SignIn from './SignIn';
import Dashboard from './Dashboard';

import './App.css';
import ErrorPage from './ErrorPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<ErrorPage/>} />
        <Route path='/' element={<Navigate to="/dashboard"/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/signup' element={<SignUp/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
