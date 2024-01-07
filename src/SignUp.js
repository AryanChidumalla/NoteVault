import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { CreateUser, checkUserStatus } from './firebaseComponents';

import './Register.css';

import Logo from './img/Logo.svg'
import BgImg from './img/BackgroundImage.png';

function SignUp() {
    const [showSignUpPage, setShowSignUpPage] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        checkUserStatus().then((isUserSignedIn) => {
            if (isUserSignedIn) {
                navigate('/dashboard')
            } else {
                setShowSignUpPage(true)
            }
        })   
    }, [navigate])

    if (showSignUpPage) {
        return (
            <SignUpDisplay/>
        )
    }
}

function SignUpDisplay() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPwd: ''
    })

    const [errorMsg, setErrorMsg] = useState({bool: false, text: 'Error'})

    const navigate = useNavigate()

    function SubmitSignUpForm(e) {
        e.preventDefault()
        let flag = 0

        if (formData.username === '' || formData.email === '' || formData.password === '' || formData.confirmPwd === '') {
            flag = 1

            setErrorMsg({bool: true, text: 'Please fill all the detatils'})
        } else if (formData.password !== formData.confirmPwd) {
            flag = 1

            setErrorMsg({bool: true, text: 'Passwords do not match'})
        }

        if (flag === 0) {
            if (CreateUser(formData.username, formData.email, formData.password)) {
                navigate('/dashboard')
            }

            CreateUser(formData.username, formData.email, formData.password)
                .then(function(bool) {
                    if (bool) {
                        navigate('/dashboard')
                    } else {
                        setErrorMsg({bool: true, text: 'Error Occurred'})
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
                <img alt='Logo' src={Logo}/> NoteValut
            </div>
            <div className='Split RegisterImageContainer'>
                <div className='Centered'>
                    <img alt='Background Img' src={BgImg}/>
                </div>
            </div>

            <div className='Split RegisterFormContainer'>
                <div className='Centered'>
                    <h2>Create Account</h2>
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
                            Already have an account? <span onClick={() => {navigate('/signin')}}>Sign In</span>
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

export default SignUp