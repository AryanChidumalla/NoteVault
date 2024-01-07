import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { SignInUser, checkUserStatus } from './firebaseComponents';

import './Register.css';

import Logo from './img/Logo.svg'
import BgImg from './img/BackgroundImage.png';

function SignIn() {
    const [showSignInPage, setShowSignInPage] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        checkUserStatus().then((isUserSignedIn) => {
            if (isUserSignedIn) {
                navigate('/dashboard')
            } else {
                setShowSignInPage(true)
            }
        })   
    }, [navigate])

    if (showSignInPage) {
        return (
            <SignInDisplay/>
        )
    }
}

function SignInDisplay() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const [errorMsg, setErrorMsg] = useState({bool: false, text: 'Error'})

    const navigate = useNavigate()

    function SubmitSignInForm(e) {
        e.preventDefault()
        let flag = 0

        if (formData.email === '' || formData.password === '') {
            flag = 1
            setErrorMsg({bool: true, text: 'Please fill all the detatils'})
        }

        if (flag === 0) {
            SignInUser(formData.email, formData.password)
                .then(function(bool) {
                    if (bool) {
                        navigate('/dashboard')
                    } else {
                        setErrorMsg({bool: true, text: 'User does not exit'})
                    }
                })
                .catch(function(error) {
                    console.log(error)
                })
        }
    }

    return (
        <div className="RegisterContainer">
            <div className='LogoContainer'>
                <img alt='logo' src={Logo}/> NoteValut
            </div>
            <div className='Split RegisterImageContainer'>
                <div className='Centered'>
                    <img alt='Background Img' src={BgImg} className='SingUpBackgroundImage'/>
                </div>
            </div>

            <div className='Split RegisterFormContainer'>
                <div className='Centered'>
                    <h2>Welcome Back</h2>
                    <form className='RegisterForm'>
                        <input placeholder='Email' type='email' value={formData.email} onChange={(e) => {setFormData({...formData, email: e.target.value})}} required/>
                        <input placeholder='Password' type='password' value={formData.password} onChange={(e) => {setFormData({...formData, password: e.target.value})}} required/>
                        <button className='RegisterFormSubmitBtn' type='Submit' onClick={(e) => {SubmitSignInForm(e)}}>
                            Submit
                        </button>
                    </form>

                    <div className='GoToSignUp'>
                        <div>
                            Don't have an account? <span onClick={() => {navigate('/signup')}}>Sign Up</span>
                        </div>
                    </div>

                    <div className={"DisplayErrorMsgContainer " + (errorMsg.bool ? 'ErrorMsgVisible' : 'ErrorMsgNotVisible')}>
                        {errorMsg.text}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignIn