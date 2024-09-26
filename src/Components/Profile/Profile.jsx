import { useSelector } from "react-redux";
import "./Profile.css";
import { StyledButton } from "../MuiComponents";
import CancelIcon from "@mui/icons-material/Cancel";
import { LogOutUser } from "../../Firebase/firebaseComponents";
import { useState } from "react";

export default function Profile({ setProfileModal }) {
  const user = useSelector((state) => state.auth.user);
  const [buttonLoading, setButtonLoading] = useState(false);

  console.log(user);

  return (
    <div className="ProfileContainer">
      <div className="ProfileOverlay" onClick={() => setProfileModal(false)} />
      <div className="ProfileSubContainer">
        <div className="ProfileSubContainerExitBar">
          <button onClick={() => setProfileModal(false)}>
            <CancelIcon />
          </button>
        </div>
        <div className="ProfileSubCotainerTitle">Profile</div>
        <div className="ProfileSubCotainerGreetings">
          Hi {user.displayName}!
        </div>
        <StyledButton
          label={buttonLoading ? "Loggin Out..." : "Log Out"}
          onClick={() => LogOutUser()}
          disabled={buttonLoading}
        />
      </div>
    </div>
  );
}
