import { useState } from "react";
import AddNoteIcon from "../../../img/AddNoteIcon.svg";
// import { Colors } from "../../../Styles/Colors"; // Replaced with Tailwind
// import { font } from "../../../Styles/Fonts"; // Replaced with Tailwind
import "./AddNote.css"; // You might need to check if any of these styles are still needed
import { StyledButton } from "../../../Components/MuiComponents";
import { AddNoteToDB } from "../../../Firebase/firebaseComponents";

export const AddNote = () => {
  const [addNoteModal, setAddNoteModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [titleLength, setTitleLength] = useState(0);
  const titleLimit = 100;
  const [descriptionLength, setDescriptionLength] = useState(0);
  const descriptionLimit = 500;

  const handleLoseFocus = () => {
    if (title === "" && description === "") {
      setAddNoteModal(false);
    } else {
      handleSave();
    }
  };

  const handleSave = () => {
    AddNoteToDB({ title, description });
    setTitle("");
    setDescription("");
    setAddNoteModal(false);
  };

  return (
    <div className="overflow-hidden relative">
      <button
        className="fixed bottom-10 right-10 bg-LightAqua border-2 border-SoftBlack rounded-md p-2 z-10"
        onClick={() => setAddNoteModal(true)}
      >
        <img src={AddNoteIcon} alt="Add Note" className="w-8 h-8" />{" "}
        {/*Added w-8 h-8 for image consistency*/}
      </button>
      <div
        onClick={handleLoseFocus}
        className={`fixed inset-0 bg-black ${
          addNoteModal ? "opacity-50 visible" : "opacity-0 invisible"
        } transition-opacity duration-500 ease-in-out z-100`}
      />
      <div
        className={`fixed top-0 bottom-0 left-[10%] md:left-[50%] lg:left-[60%] transform transition-transform duration-500 ease-in-out flex flex-col gap-10 justify-start items-start bg-SoftTeal border-l-2 border-SoftBlack w-[90%] md:w-[50%] lg:w-[40%] p-10 z-200 ${
          addNoteModal ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="font-bold text-Heading2 text-SoftBlack">
          Create Note
        </div>
        <div className="flex flex-col gap-2 w-full items-end">
          <textarea
            className="border-2 border-SoftBlack rounded-md p-4 w-full bg-SoftWhite resize-none"
            value={title}
            rows={2}
            maxLength={titleLimit}
            placeholder="Title..."
            onChange={(e) => {
              setTitle(e.target.value);
              setTitleLength(e.target.value.length);
            }}
          />
          <div className="text-CaptionText text-SoftBlack">
            {titleLength} / {titleLimit}
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full items-end">
          <textarea
            className="border-2 border-SoftBlack rounded-md p-4 w-full bg-SoftWhite resize-none"
            value={description}
            rows={10}
            maxLength={descriptionLimit}
            placeholder="Description..."
            onChange={(e) => {
              setDescription(e.target.value);
              setDescriptionLength(e.target.value.length);
            }}
          />
          <div className="text-CaptionText text-SoftBlack">
            {descriptionLength} / {descriptionLimit}
          </div>
        </div>
        <div className="flex gap-5 w-full justify-end">
          <StyledButton
            label="Save"
            onClick={handleSave}
            disabled={!title && !description}
          />
          <StyledButton label="Cancel" onClick={handleLoseFocus} />
        </div>
      </div>
    </div>
  );
};
