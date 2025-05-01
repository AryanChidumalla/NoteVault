import { useState } from "react";
import Profile from "../Profile/Profile";
import ProfileIcon from "../../img/ProfileIcon.svg";

export default function NavBar({ searchText, setSearchText }) {
  const [profileModal, setProfileModal] = useState(false);

  return (
    <div className="flex flex-wrap justify-between items-center p-5 lg:px-10 gap-4 md:gap-20 lg:gap-60 bg-LightAqua border-b-2 border-SoftBlack">
      <div className="flex items-center justify-between w-full sm:w-auto order-1">
        <div className="font-bold text-Heading1">NoteVault</div>
        <div className="sm:hidden">
          <button
            onClick={() => setProfileModal(true)}
            className="bg-none outline-none border-none"
          >
            <img src={ProfileIcon} alt="Profile" className="w-8 h-8" />
          </button>
        </div>
      </div>
      <input
        placeholder="Search"
        className="flex-1 text-BodyText p-2 border-2 border-SoftBlack rounded-md w-full sm:w-1/2 order-3 sm:order-2"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      <div className="hidden sm:block order-2 sm:order-3">
        <button
          onClick={() => setProfileModal(true)}
          className="bg-none outline-none border-none"
        >
          <img src={ProfileIcon} alt="Profile" className="w-8 h-8" />
        </button>
      </div>
      <Profile setProfileModal={setProfileModal} profileModal={profileModal} />
    </div>
  );
}
