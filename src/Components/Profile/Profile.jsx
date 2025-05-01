import { useSelector } from "react-redux";
import { StyledButton } from "../MuiComponents";
import CancelIcon from "@mui/icons-material/Cancel";
import { LogOutUser } from "../../Firebase/firebaseComponents";

export default function Profile({ setProfileModal, profileModal }) {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="overflow-hidden fixed">
      <div
        className={`fixed inset-0 bg-black ${
          profileModal ? "opacity-50 visible" : "opacity-0 invisible"
        } transition-opacity duration-500 ease-in-out z-100`}
        onClick={() => setProfileModal(false)}
      />
      <div
        className={`fixed top-0 bottom-0 left-[10%] md:left-[50%] lg:left-[60%] transform transition-transform duration-500 ease-in-out flex flex-col gap-10 justify-start items-start bg-SoftTeal border-l-2 border-SoftBlack w-[90%] md:w-[50%] lg:w-[40%] p-10 z-20 ${
          profileModal ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end w-full">
          <button onClick={() => setProfileModal(false)} className="p-0">
            <CancelIcon />
          </button>
        </div>
        <div className="font-bold text-Heading2 text-SoftBlack">
          Account Information
        </div>
        <div className="flex gap-5 items-center">
          <div className="font-bold text-BodyText text-SoftBlack">Name:</div>
          <div className="font-normal text-BodyText bg-SoftWhite p-2 rounded-md text-SoftBlack">
            {user.displayName}
          </div>
        </div>
        <div>
          <StyledButton label={"Log Out"} onClick={() => LogOutUser()} />
        </div>
      </div>
    </div>
  );
}
