import { useState, useEffect } from "react";
import {
  addNoteBook,
  getUserNoteBooks,
} from "../../../Firebase/firebaseComponents";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { StyledButton } from "../../../Components/MuiComponents";
import "./UserNoteBooks.css";

const MAX_CHAR_LIMIT = 20; // Set your character limit here

function UserNoteBooks() {
  const [noteBooks, setNoteBooks] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(null); // State for selected button

  const fetchNoteBooks = () => {
    getUserNoteBooks(setNoteBooks);
  };

  useEffect(() => {
    fetchNoteBooks();
  }, []);

  const handleAddButton = () => {
    setNoteBooks((prev) => [...prev, { isEditing: true, name: "" }]);
  };

  const handleNameChange = async (index, newName) => {
    if (!newName || newName.length > MAX_CHAR_LIMIT) {
      setSnackbarMessage("Invalid name. Please try again.");
      setSnackbarOpen(true);
      return;
    }

    if (
      noteBooks.some(
        (item) => item.name.toLowerCase() === newName.toLowerCase()
      )
    ) {
      setSnackbarMessage("This name is already taken. Please choose another.");
      setSnackbarOpen(true);
      return;
    }

    setNoteBooks((prev) => {
      const updated = [...prev];
      updated[index].name = newName;
      updated[index].isEditing = false;
      return updated;
    });

    try {
      await addNoteBook(newName);
    } catch (error) {
      setSnackbarMessage("Failed to add notebook. Please try again.");
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleButtonClick = (index) => {
    setSelectedIndex(index); // Set the selected button index
  };

  return (
    <div className="UserNoteBookContainer">
      <div className="UserNoteBooks">
        {noteBooks.map((item, index) => (
          <div key={index} className="UserNoteBookButton">
            {item.isEditing ? (
              <input
                type="text"
                autoFocus
                maxLength={MAX_CHAR_LIMIT}
                onBlur={(e) => handleNameChange(index, e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleNameChange(index, e.target.value);
                  }
                }}
                placeholder="Enter button name"
              />
            ) : (
              <button
                className={`NoteBookButton ${
                  selectedIndex === index ? "selected" : ""
                }`}
                onClick={() => handleButtonClick(index)} // Set selected index on click
              >
                {item.name || "Unnamed Button"}
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="UserNoteBooksAddButton">
        <StyledButton label="Add" onClick={handleAddButton} />
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

export default UserNoteBooks;
