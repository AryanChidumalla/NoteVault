import { useEffect, useState } from "react";
// import "../AddNoteBook/AddNote.css";
import { StyledButton } from "../../../Components/MuiComponents";
import { DeleteNote, UpdateNote } from "../../../Firebase/firebaseComponents";

export const EditNote = ({
  title,
  description,
  editNoteModal,
  setEditNoteModal,
  noteId,
}) => {
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const [titleLength, setTitleLength] = useState(title.length);
  const titleLimit = 100;
  const [descriptionLength, setDescriptionLength] = useState(
    description.length
  );
  const descriptionLimit = 500;

  const handleLoseFocus = () => {
    if (newTitle === title && newDescription === description) {
      setEditNoteModal(false);
    } else {
      handleSave();
    }
  };

  useEffect(() => {
    setNewTitle(title);
    setNewDescription(description);
    setTitleLength(title.length);
    setDescriptionLength(description.length);
  }, [title, description]);

  const handleSave = () => {
    const newNote = {
      title: newTitle,
      description: newDescription,
      id: noteId,
    };

    UpdateNote(newNote);

    setEditNoteModal(false);
  };

  return (
    <div className="overflow-hidden fixed">
      <div
        onClick={() => setEditNoteModal(false)}
        className={`fixed inset-0 bg-black ${
          editNoteModal ? "opacity-50 visible" : "opacity-0 invisible"
        } transition-opacity duration-500 ease-in-out z-100`}
      />
      <div
        className={`fixed top-0 bottom-0 left-[10%] md:left-[50%] lg:left-[60%] transform transition-transform duration-500 ease-in-out flex flex-col gap-10 justify-start items-start bg-SoftTeal border-l-2 border-SoftBlack w-[90%] md:w-[50%] lg:w-[40%] p-10 z-200 ${
          editNoteModal ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="font-bold text-Heading2 text-SoftBlack">Edit Note</div>
        <div className="flex flex-col gap-2 w-full items-end">
          <textarea
            className="border-2 border-SoftBlack rounded-md p-4 w-full bg-SoftWhite resize-none"
            value={newTitle}
            rows={2}
            maxLength={titleLimit}
            placeholder="Title..."
            onChange={(e) => {
              setNewTitle(e.target.value);
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
            value={newDescription}
            rows={10}
            maxLength={descriptionLimit}
            placeholder="Description..."
            onChange={(e) => {
              setNewDescription(e.target.value);
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
            disabled={newTitle === title && newDescription === description}
          />
          <StyledButton
            label="Delete"
            onClick={() => {
              DeleteNote(noteId);
              handleLoseFocus();
            }}
          />
          <StyledButton
            label="Cancel"
            onClick={() => setEditNoteModal(false)}
          />
        </div>
      </div>
    </div>
  );
};
