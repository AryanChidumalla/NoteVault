import { useState } from "react";
import "./Register.css";
import {
  StyledTextField,
  StyledTextFieldPassword,
} from "../../Components/MuiComponents";
import { StyledButton } from "../../Components/MuiComponents";
import useScreenSize from "../../Components/useScreenSize";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function Register() {
  const [signIn, setSignIn] = useState(true);

  if (useScreenSize().width > 900) {
    return <ForDesktop signIn={signIn} setSignIn={setSignIn} />;
  } else {
    return <ForMobile signIn={signIn} setSignIn={setSignIn} />;
  }
}

function ForDesktop({ signIn, setSignIn }) {
  return (
    <div className="RegisterContaienr">
      <div className="RegisterSubContainer">
        <div
          className={`RegisterFormSignUpContainer ${signIn ? "Hidden" : ""}`}
        >
          <SignUp />
        </div>
        <div
          className={`RegisterFormContentContainer ${
            signIn ? "Left" : "Right"
          }`}
        >
          <div
            className={`RegisterFormContentContainerSignInContent ${
              signIn ? "" : "GoLeft"
            }`}
          >
            <div className="RegisterFormTitle">Welcome, back!</div>
            <div className="RegisterFormWelcomeText">
              Welcome back to NoteVault. Sign in to access your notes,
              collaborate with others, and unlock your productivity. Your notes,
              your way.
            </div>
            <div className="RegisterFormLinkTo">
              Don’t have an Account?
              <span onClick={() => setSignIn(false)}>
                <b> Sign Up</b>
              </span>
            </div>
          </div>
          <div
            className={`RegisterFormContentContainerSignUpContent ${
              signIn ? "GoRight" : ""
            }`}
          >
            <div className="RegisterFormTitle">Welcome!</div>
            <div className="RegisterFormWelcomeText">
              Welcome to NoteVault, your digital note-taking companion. Capture,
              organize, and share your ideas with ease. Sign up now!
            </div>
            <div className="RegisterFormLinkTo">
              Already have an Account?
              <span onClick={() => setSignIn(true)}>
                <b> Sign In</b>
              </span>
            </div>
          </div>
        </div>
        <div
          className={`RegisterFormSignInContainer ${signIn ? "" : "Hidden"}`}
        >
          <SignIn />
        </div>
      </div>
    </div>
  );
}

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleSignIn = () => {
    if (!email || !password) {
      setSnackbarMessage("All fields must be filled out");
      setSnackbarOpen(true);
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setSnackbarMessage("Invalid email format");
      setSnackbarOpen(true);
      return;
    }

    if (password.length < 8) {
      setSnackbarMessage("Password must be at least 8 characters long");
      setSnackbarOpen(true);
      return;
    }

    // Perform sign-in action here
    console.log("Sign In Successful");
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="RegisterFormContainer">
      <div className="RegisterFormTitle">NoteVaule</div>
      <StyledTextField label="Email" setItem={setEmail} />
      <StyledTextFieldPassword label="Password" setItem={setPassword} />
      <StyledButton label="Sign In" onClick={handleSignIn} />

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleSignUp = () => {
    if (!email || !password || !confirmPassword) {
      setSnackbarMessage("All fields must be filled out");
      setSnackbarOpen(true);
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setSnackbarMessage("Invalid email format");
      setSnackbarOpen(true);
      return;
    }

    if (password.length < 8) {
      setSnackbarMessage("Password must be at least 8 characters long");
      setSnackbarOpen(true);
      return;
    }

    if (password !== confirmPassword) {
      setSnackbarMessage("Passwords do not match");
      setSnackbarOpen(true);
      return;
    }

    // Perform sign-up action here
    console.log("Sign Up Successful");
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="RegisterFormContainer">
      <div className="RegisterFormTitle">NoteVault</div>
      <StyledTextField label="Email" setItem={setEmail} />
      <StyledTextFieldPassword label="Password" setItem={setPassword} />
      <StyledTextFieldPassword
        label="Confirm Password"
        setItem={setConfirmPassword}
      />
      <StyledButton label="Sign Up" onClick={handleSignUp} />

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

function ForMobile({ signIn, setSignIn }) {
  return (
    <div className="MobileRegisterContainer">
      <div className="MobileRegisterSubContainer">
        <div className="MobileRegisterSubContainerTitle">NoteVault</div>
        <div className="MobileRegisterFormContainer">
          <SignUpFormForMobile signIn={signIn} setSignIn={setSignIn} />
          <SignInFormForMobile signIn={signIn} setSignIn={setSignIn} />
        </div>
      </div>
    </div>
  );
}

function SignUpFormForMobile({ signIn, setSignIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleSignUp = () => {
    if (!email || !password || !confirmPassword) {
      setSnackbarMessage("All fields must be filled out");
      setSnackbarOpen(true);
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setSnackbarMessage("Invalid email format");
      setSnackbarOpen(true);
      return;
    }

    if (password.length < 8) {
      setSnackbarMessage("Password must be at least 8 characters long");
      setSnackbarOpen(true);
      return;
    }

    if (password !== confirmPassword) {
      setSnackbarMessage("Passwords do not match");
      setSnackbarOpen(true);
      return;
    }

    // Perform sign-up action here
    console.log("Sign Up Successful");
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div
      className={`MobileRegisterSignUpFormContainer ${signIn ? "" : "GoLeft"}`}
    >
      <StyledTextField label="Email" setItem={setEmail} />
      <StyledTextFieldPassword label="Password" setItem={setPassword} />
      <StyledTextFieldPassword
        label="Confirm Password"
        setItem={setConfirmPassword}
      />
      <StyledButton label="Sign Up" onClick={handleSignUp} />
      <div className="RegisterFormLinkTo">
        Already have an Account?
        <span onClick={() => setSignIn(false)}>
          <b> Sign In</b>
        </span>
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

function SignInFormForMobile({ signIn, setSignIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleSignIn = () => {
    if (!email || !password) {
      setSnackbarMessage("All fields must be filled out");
      setSnackbarOpen(true);
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setSnackbarMessage("Invalid email format");
      setSnackbarOpen(true);
      return;
    }

    if (password.length < 8) {
      setSnackbarMessage("Password must be at least 8 characters long");
      setSnackbarOpen(true);
      return;
    }

    // Perform sign-in action here
    console.log("Sign In Successful");
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div
      className={`MobileRegisterSignInFormContainer ${signIn ? "GoRight" : ""}`}
    >
      <StyledTextField label="Email" setItem={setEmail} />
      <StyledTextFieldPassword label="Password" setItem={setPassword} />
      <StyledButton label="Sign In" onClick={handleSignIn} />
      <div className="RegisterFormLinkTo">
        Don't have an Account?
        <span onClick={() => setSignIn(true)}>
          <b> Sign Up</b>
        </span>
      </div>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
