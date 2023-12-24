import { useEffect, useState } from 'react';
import './App.css';
import SignUp from './SignUp';
import SignIn from './SignIn';
import { CheckUser } from './firebaseComponents';
import Dashboard from './Dashboard';

function App() {
  const [SignUpChecker, setSignUpChecker] = useState(true)
  const [SignInChecker, setSignInChecker] = useState(false)

  console.log()

  useEffect(() => {
    CheckUser(setSignInChecker)
  }, [])

  if (SignInChecker) {
    return (
      <Dashboard/>
    )
  } else {
    if (SignUpChecker) {
      return (
        <SignUp setSignUpChecker={setSignUpChecker} setSignInChecker={setSignInChecker}/>
      )
    } else {
      return (
        <SignIn setSignUpChecker={setSignUpChecker} setSignInChecker={setSignInChecker}/>
      )
    }
  }
}

export default App;
