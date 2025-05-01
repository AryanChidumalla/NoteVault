import { useState, useEffect } from "react";
import "./Dashboard.css";
import NavBar from "../../Components/NavBar/NavBar";
import { AddNote } from "./AddNoteBook/AddNote";
import { font } from "../../Styles/Fonts";
import { Colors } from "../../Styles/Colors";
import { Masonry } from "@mui/lab";
import { EditNote } from "./EditNote/EditNote";
import { useSelector } from "react-redux";
import { TransitionGroup } from "react-transition-group";
import { CSSTransition } from "react-transition-group";
import useScreenSize from "../../Components/useScreenSize";

function Dashboard() {
  const [searchText, setSearchText] = useState("");
  return (
    <>
      <NavBar searchText={searchText} setSearchText={setSearchText} />
      <DashboardDisplay searchText={searchText} />
      <AddNote searchText={searchText} />
    </>
  );
}
function DashboardDisplay({ searchText }) {
  const fetchNotes = useSelector((state) => state.notes.notes);

  const [notes, setNotes] = useState(null);
  const [editNoteModal, setEditNoteModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [noteId, setNoteId] = useState("");

  const [debouncedSearch, setDebouncedSearch] = useState(searchText);

  const screenSize = useScreenSize();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchText);
    }, 300); // Adjust delay as needed

    return () => {
      clearTimeout(timer);
    };
  }, [searchText]);

  useEffect(() => {
    setNotes(fetchNotes);
    if (searchText !== "") {
      let temp = [];
      for (let i = 0; i < fetchNotes.length; i++) {
        if (
          fetchNotes[i].Title.toLowerCase().includes(
            searchText.toLowerCase()
          ) ||
          fetchNotes[i].Description.toLowerCase().includes(
            searchText.toLowerCase()
          )
        ) {
          temp.unshift(fetchNotes[i]);
        }
      }
      setNotes(temp);
    }
  }, [searchText, fetchNotes, debouncedSearch]);

  return (
    <div className="p-5 md:p-10 lg:p-20 flex justify-center">
      {notes && notes.length > 0 ? (
        <Masonry
          columns={screenSize.width > 1100 ? 3 : screenSize.width > 600 ? 2 : 1}
          spacing={4}
        >
          <TransitionGroup component={null}>
            {notes.map((note, index) => (
              <CSSTransition
                key={note.NoteId}
                timeout={300}
                classNames={{
                  enter: "enter",
                  enterActive: "enter-active",
                  exit: "exit",
                  exitActive: "exit-active",
                }}
              >
                <div
                  className="DashboardNoteItem"
                  onClick={() => {
                    setEditNoteModal(true);
                    setTitle(note.Title);
                    setDescription(note.Description);
                    setNoteId(note.NoteId);
                  }}
                >
                  <div style={{ ...font.BoldMedium, color: Colors.Black }}>
                    {note.Title}
                  </div>
                  <div style={{ ...font.RegularSmall, color: Colors.Black }}>
                    {note.Description}
                  </div>
                </div>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </Masonry>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            alignItems: "center",
          }}
        >
          <div style={{ ...font.BoldMedium, color: Colors.Black }}>
            {searchText === "" ? (
              <div> No Notes Yet!</div>
            ) : (
              <div>No Notes Found!</div>
            )}
          </div>
          <div style={{ ...font.RegularSmall, color: Colors.Black }}>
            {searchText === "" ? (
              <div>
                It looks like you haven't created any notes. Start capturing
                your thoughts, ideas, and important information today!
              </div>
            ) : (
              <div>
                It appears that we currently don’t have any notes containing the
                information you’re looking for.
              </div>
            )}
          </div>
        </div>
      )}
      <EditNote
        editNoteModal={editNoteModal}
        setEditNoteModal={setEditNoteModal}
        title={title}
        description={description}
        noteId={noteId}
      />
    </div>
  );
}

export default Dashboard;
