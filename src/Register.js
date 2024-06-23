import { useEffect, useState } from 'react'
import styles from './Register.module.css'
import { TextField, ThemeProvider, createTheme, useMediaQuery } from '@mui/material';
import { checkUserStatus } from './firebaseComponents';
import { useNavigate } from 'react-router-dom';

function Register() {

    const [containerClassname, setContainerClassname] = useState(`${styles.container}`)

    const navigate = useNavigate()

    const [username, setUsername] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()

    const theme = createTheme({
        palette: {
            primary: {
                main: '#323232'
            }
        }
    })

    const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

    useEffect(() => {
        checkUserStatus().then((isUserSignedIn) => {
            if (isUserSignedIn) 
                navigate('/dashboard')
            }
        )
    })

    function handleSignIn() {

    }

    function handleSignUp() {
        
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
                            <button className={`${styles.button} ${styles.type2}`} onClick={() => setContainerClassname(`${styles.container} ${styles.rightPanelActive}`)}>
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
                                <button className={`${styles.button} ${styles.type1}`} onClick={() => setContainerClassname(`${styles.container}`)}>
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
                                <button className={`${styles.button} ${styles.type2}`} onClick={() => setContainerClassname(`${styles.container} ${styles.rightPanelActive}`)}>
                                    <span className={styles.buttonText}>Sign In</span>
                                </button>
                                </p>
                            </form>
                            <div className={styles.redirect}>
                                <h3>Don’t have an Account?</h3>
                                <button className={`${styles.button} ${styles.type1}`} onClick={() => setContainerClassname(`${styles.container}`)}>
                                    <span className={styles.buttonText}>Sign Up</span>
                                </button>
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
                                <button className={`${styles.button} ${styles.type1}`} onClick={() => setContainerClassname(`${styles.container}`)}>
                                    <span className={styles.buttonText}>Sign Up</span>
                                </button>
                                </p>
                            </form>
                            
                            <div className={styles.redirect}>
                                <h3>Already have Account?</h3>
                                <button className={`${styles.button} ${styles.type2}`} onClick={() => setContainerClassname(`${styles.container} ${styles.rightPanelActive}`)}>
                                    <span className={styles.buttonText}>Sign In</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}


export default Register