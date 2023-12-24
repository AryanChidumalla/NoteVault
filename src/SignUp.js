import { useState } from 'react';
import CreateUser from './firebaseComponents';
import { CheckUser } from './firebaseComponents';

import Logo from './img/Logo.svg'
import BgImg from './img/BackgroundImage.png';

import './Register.css';

function SignUp({setSignUpChecker, setSignInChecker}) {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPwd: ''
    })

    const [errorMsgText, setErrorMsgText] = useState('Error msg')
    const [errorMsgBool, setErrorMsgBool] = useState(false)

    function SubmitSignUpForm(e) {
        e.preventDefault()
        setErrorMsgText(null)
        let flag = 0

        if (formData.username === '' || formData.email === '' || formData.password === '' || formData.confirmPwd === '') {
            flag = 1
            setErrorMsgText('Please fill all the detatils')
            setErrorMsgBool(true)
        } else if (formData.password !== formData.confirmPwd) {
            flag = 1
            setErrorMsgText('Passwords do not match')
            setErrorMsgBool(true)
        }

        if (flag === 0) {
            CreateUser(formData.username, formData.email, formData.password)
            CheckUser(setSignInChecker)
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
                    <img src={BgImg} alt='Image'/>
                </div>
            </div>

            <div className='Split RegisterFormContainer'>
                <div className='Centered'>
                    <h1>Create Account</h1>
                    <form className='RegisterForm' onSubmit={SubmitSignUpForm}>
                        <input placeholder='Username' type='text' value={formData.username} onChange={(e) => {setFormData({...formData, username: e.target.value})}}/>
                        <input placeholder='Email' type='email' value={formData.email} onChange={(e) => {setFormData({...formData, email: e.target.value})}}/>
                        <input placeholder='Password' type='password' value={formData.password} onChange={(e) => {setFormData({...formData, password: e.target.value})}}/>
                        <input placeholder='Confirm Password' type='password' value={formData.confirmPwd} onChange={(e) => {setFormData({...formData, confirmPwd: e.target.value})}}/>
                        <button className='RegisterFormSubmitBtn' type='Submit' onClick={(e) => {SubmitSignUpForm(e)}}>
                            Submit
                        </button>
                    </form>

                    <div className='GoToSignIn'>
                        <div>
                            Already have an account? <span onClick={() => {setSignUpChecker(false)}}>Sign In</span>
                        </div>
                    </div>

                    <DisplayErrorMsg/>
                </div>
            </div>
        </div>
    )
}

export default SignUp