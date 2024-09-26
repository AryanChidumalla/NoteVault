import { useState } from "react";
import "./NavBar.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Profile from "../Profile/Profile";

export default function NavBar() {
  const [profileModal, setProfileModal] = useState(false);

  return (
    <div className="NavBarContainer">
      <div className="NavBarTitle">
        {/* <img alt="Logo" src={Logo} /> */}
        NoteVault
      </div>
      <button onClick={() => setProfileModal(true)}>
        <AccountCircleIcon fontSize="large" />
      </button>

      {profileModal ? <Profile setProfileModal={setProfileModal} /> : null}
    </div>
  );
}
