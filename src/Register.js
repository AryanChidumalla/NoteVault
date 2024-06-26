import { useEffect, useState } from 'react'
import styles from './Register.module.css'
import { Alert, TextField, ThemeProvider, createTheme, useMediaQuery } from '@mui/material';
import CreateUser, { SignInUser, checkUserStatus } from './firebaseComponents';
import { useNavigate } from 'react-router-dom';

function Register() {

    const [containerClassname, setContainerClassname] = useState(`${styles.container}`)

    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const theme = createTheme({
        palette: {
            primary: {
                main: '#323232'
            }
        }
    })

    const [errorMsg, setErrorMsg] = useState({bool: false, type: 'error', text: 'Error'})

    const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

    const [open, setOpen] = useState(false);


    useEffect(() => {
        checkUserStatus().then((isUserSignedIn) => {
            if (isUserSignedIn) 
                navigate('/dashboard')
            }
        )      
    }, [navigate])

    function handleSignIn(e) {
        e.preventDefault()

        let flag = 0

        if (email === '' || password === '') {
            flag = 1
            setErrorMsg({bool: true, type: 'warning', text: 'Please fill all the detatils'})
            setOpen(true)
        }

        if (flag === 0) {
            SignInUser(email, password)
                .then(function(bool) {
                    if (bool) {
                        navigate('/dashboard')
                    } else {
                        setErrorMsg({bool: true, type: 'error', text: 'User does not exit'})
                        setOpen(true)
                    }
                })
                .catch(function(error) {
                    console.log(error)
                })
        }
    }

    function handleSignUp(e) {
        e.preventDefault()

        let flag = 0

        if (username === '' || email === '' || password === '' || confirmPassword === '') {
            flag = 1

            setErrorMsg({bool: true, type: 'warning', text: 'Please fill all the detatils'})
            setOpen(true)
        } else if (password !== confirmPassword) {
            flag = 1

            setErrorMsg({bool: true, type: 'error', text: 'Passwords do not match'})
            setOpen(true)
        }

        if (flag === 0) {
            if (CreateUser(username, email, password)) {
                navigate('/dashboard')
            }

            CreateUser(username, email, password)
            .then(function(bool) {
                if (bool) {
                    navigate('/dashboard')
                } else {
                    setErrorMsg({bool: true, type: 'error', text: 'Error Occurred'})
                    setOpen(true)
                }
            })
            .catch(function(error) {
                console.log(error)
            })
        }
    }

    return (
        <div>
            {isDesktop ? (
                <div className={styles.body}>
                    <div className={`${containerClassname}`}>
                        <div className={`${styles.formContainer} ${styles.signUpContainer}`}>
                        <h1>NoteVault</h1>

                        <form>
                            <ThemeProvider theme = {theme}>
                                <TextField
                                    className={styles.textField}
                                    label="Email"
                                    sx={{ m: 1 }}
                                    size="small"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <TextField
                                    className={styles.textField}
                                    label="Password"
                                    sx={{ m: 1 }}
                                    size="small"
                                    onChange={(e) => setPassword(e.target.value)}
                                />                                                                                    
                            </ThemeProvider>
                            <p>
                            <button className={`${styles.button} ${styles.type2}`} onClick={(e) => handleSignIn(e)}>
                                <span className={styles.buttonText}>Sign In</span>
                            </button>
                            </p>
                        </form>
                        </div>
                        <div className={`${styles.formContainer} ${styles.signInContainer}`}>
                            <h1>NoteVault</h1>

                            <form>
                                <ThemeProvider theme = {theme}>
                                    <TextField
                                        className={styles.textField}
                                        label="Username"
                                        sx={{ m: 1 }}
                                        size="small"
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                    <TextField
                                        className={styles.textField}
                                        label="Email"
                                        sx={{ m: 1 }}
                                        size="small"
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <TextField
                                        className={styles.textField}
                                        label="Password"
                                        sx={{ m: 1 }}
                                        size="small"
                                        onChange={(e) => setPassword(e.target.value)}
                                    />                  
                                    <TextField
                                        className={styles.textField}
                                        label="Confirm Password"
                                        sx={{ m: 1 }}
                                        size="small"
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />                                                                  
                                </ThemeProvider>
                                <p>
                                <button className={`${styles.button} ${styles.type1}`} onClick={(e) => handleSignUp(e)}>
                                    <span className={styles.buttonText}>Sign Up</span>
                                </button>
                                </p>
                            </form>
                        </div>
                        <div className={styles.overlayContainer}>
                            <div className={styles.overlay}>
                                <div className={`${styles.overlayPanel} ${styles.overlayLeft}`}>
                                    <div className={styles.overlayPanelContainer}>
                                        <h1>Welcome, back</h1>
                                        <p>Welcome back to NoteVault. Sign in to access your notes, collaborate with others, and unlock your productivity. Your notes, your way.</p>

                                        <h3>Don’t have an Account?</h3>
                                        <button className={`${styles.button} ${styles.type1}`} onClick={() => setContainerClassname(`${styles.container}`)}>
                                            <span className={styles.buttonText}>Sign Up</span>
                                        </button>
                                    </div>
                                </div>

                                <div className={`${styles.overlayPanel} ${styles.overlayRight}`}>
                                    <div className={styles.overlayPanelContainer}>
                                        <h1>Welcome</h1>
                                        <p>Welcome to NoteVault, your digital note-taking companion. Capture, organize, and share your ideas with ease. Sign up now!</p>

                                        <h3>Already have Account?</h3>
                                        <button className={`${styles.button} ${styles.type2}`} onClick={() => setContainerClassname(`${styles.container} ${styles.rightPanelActive}`)}>
                                            <span className={styles.buttonText}>Sign In</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        {errorMsg.bool && open && (
                            <Alert
                            className={`${styles.alert} ${!errorMsg.bool ? styles.hidden : ''}`}
                            severity={errorMsg.type}
                            onClose={() => {setOpen(false)}}>
                                {errorMsg.text}
                            </Alert>
                        )}
                    </div>
                </div>
            ) : (
                <div className={styles.body}>
                    <div className={`${containerClassname}`}>
                        <div className={`${styles.formContainer} ${styles.signUpContainer}`}>
                            <h1>NoteVault</h1>

                            <form>
                                <ThemeProvider theme = {theme}>
                                    <TextField
                                        className={styles.textField}
                                        label="Email"
                                        sx={{ m: 1 }}
                                        size="small"
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <TextField
                                        className={styles.textField}
                                        label="Password"
                                        sx={{ m: 1 }}
                                        size="small"
                                        onChange={(e) => setPassword(e.target.value)}
                                    />                                                                                    
                                </ThemeProvider>
                                <p>
                                <button className={`${styles.button} ${styles.type2}`} onClick={(e) => handleSignIn(e)}>
                                    <span className={styles.buttonText}>Sign In</span>
                                </button>
                                </p>
                            </form>
                            <div className={styles.redirect}>
                                <h3>Don’t have an Account?</h3>
                                <span className={styles.buttonText} onClick={() => setContainerClassname(`${styles.container}`)}>Sign Up</span>
                            </div>
                        </div>
                        <div className={`${styles.formContainer} ${styles.signInContainer}`}>
                            <h1>NoteVault</h1>

                            <form>
                                <ThemeProvider theme = {theme}>
                                    <TextField
                                        className={styles.textField}
                                        label="Username"
                                        sx={{ m: 1 }}
                                        size="small"
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                    <TextField
                                        className={styles.textField}
                                        label="Email"
                                        sx={{ m: 1 }}
                                        size="small"
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <TextField
                                        className={styles.textField}
                                        label="Password"
                                        sx={{ m: 1 }}
                                        size="small"
                                        onChange={(e) => setPassword(e.target.value)}
                                    />                  
                                    <TextField
                                        className={styles.textField}
                                        label="Confirm Password"
                                        sx={{ m: 1 }}
                                        size="small"
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />                                                                  
                                </ThemeProvider>
                                <p>
                                <button className={`${styles.button} ${styles.type1}`} onClick={(e) => handleSignUp(e)}>
                                    <span className={styles.buttonText}>Sign Up</span>
                                </button>
                                </p>
                            </form>
                            
                            <div className={styles.redirect}>
                                <h3>Already have Account?</h3>
                                <span className={styles.buttonText} onClick={() => setContainerClassname(`${styles.container} ${styles.rightPanelActive}`)}>Sign In</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        {errorMsg.bool && open && (
                            <Alert
                            className={`${styles.alert} ${!errorMsg.bool ? styles.hidden : ''}`}
                            severity={errorMsg.type}
                            onClose={() => {setOpen(false)}}>
                            {errorMsg.text}
                            </Alert>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}


export default Register