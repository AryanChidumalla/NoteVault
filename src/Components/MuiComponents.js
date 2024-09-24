import {
  Button,
  colors,
  IconButton,
  InputAdornment,
  styled,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";

const TextFieldStyle = styled(TextField)(() => ({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderRadius: "5px",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#323232",
    },
    "& input": {
      fontFamily: "Poppins, sans-serif",
      fontWeight: 400,
      fontSize: "14px",
    },
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#323232",
  },
}));

export const StyledTextField = ({ label, setItem }) => {
  return (
    <TextFieldStyle
      fullWidth
      id="outlined-basic"
      label={label}
      variant="outlined"
      size="small"
      onChange={(e) => setItem(e.target.value)}
    />
  );
};

export const StyledTextFieldPassword = ({ label, setItem }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <TextFieldStyle
      fullWidth
      id="outlined-basic"
      label={label}
      variant="outlined"
      size="small"
      type={showPassword ? "text" : "password"}
      onChange={(e) => setItem(e.target.value)}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleTogglePasswordVisibility} edge="end">
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

const ButtonStyle = styled(Button)(() => ({
  textTransform: "none",
  backgroundColor: "#323232",
  color: "#eaf1fb",
  borderRadius: "5px",
  fontWeight: 600,
  fontSize: "14px",
  fontFamily: "Poppins",
  border: "2px solid #323232",
  "&:hover": {
    backgroundColor: "#9ef2eb",
    color: "#323232",
    boxShadow: "none",
  },
}));

export function StyledButton({ label, onClick }) {
  return (
    <ButtonStyle
      variant="contained"
      disableElevation
      disableFocusRipple
      disableRipple
      onClick={onClick}
    >
      {label}
    </ButtonStyle>
  );
}
