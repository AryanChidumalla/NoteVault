import { useState } from 'react';
import { SignInUser } from './firebaseComponents';
import { CheckUser } from './firebaseComponents';

import Logo from './img/Logo.svg'
import BgImg from './img/BackgroundImage.png';

import './Register.css';

function SignIn({setSignUpChecker, setSignInChecker}) {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const [errorMsgText, setErrorMsgText] = useState('Error msg')
    const [errorMsgBool, setErrorMsgBool] = useState(false)

    function SubmitSignInForm(e) {
        e.preventDefault()
        setErrorMsgText(null)
        let flag = 0

        if (formData.email === '' || formData.password === '') {
            flag = 1
            setErrorMsgText('Please fill all the detatils')
            setErrorMsgBool(true)
        }

        if (flag === 0) {
            if (SignInUser(formData.email, formData.password)) {
                CheckUser(setSignInChecker)
            } else {
                setErrorMsgText('User does not exit')
                setErrorMsgBool(true)
            }

            // SignInUser(formData.email, formData.password)
            // CheckUser(setSignInChecker)
        }
    }

    function DisplayErrorMsg() {
        return (
            <div className={"DisplayErrorMsgContainer " + (errorMsgBool ? 'ErrorMsgVisible' : 'ErrorMsgNotVisible')}>
                {errorMsgText}
            </div>
        )
    }

    return (
        <div className="RegisterContainer">
            <div className='LogoContainer'>
                <img src={Logo}/> NoteValut
            </div>
            <div className='Split RegisterImageContainer'>
                <div className='Centered'>
                    <img src={BgImg} alt='Image' className='SingUpBackgroundImage'/>
                </div>
            </div>

            <div className='Split RegisterFormContainer'>
                <div className='Centered'>
                    <h1>Welcome Back</h1>
                    <form className='RegisterForm'>
                        <input placeholder='Email' type='email' value={formData.email} onChange={(e) => {setFormData({...formData, email: e.target.value})}}/>
                        <input placeholder='Password' type='password' value={formData.password} onChange={(e) => {setFormData({...formData, password: e.target.value})}}/>
                        <button className='RegisterFormSubmitBtn' type='Submit' onClick={(e) => {SubmitSignInForm(e)}}>
                            Submit
                        </button>
                    </form>

                    <div className='GoToSignUp'>
                        <div>
                            Don't have an account? <span onClick={() => {setSignUpChecker(true)}}>Sign Up</span>
                        </div>
                    </div>

                    <DisplayErrorMsg/>
                </div>
            </div>
        </div>
    )
}

export default SignIn