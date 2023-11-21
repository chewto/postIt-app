import { Note } from "../core/interfaces/note.interface";
import { urls } from "../core/api-urls/urls";
import { useDispatch, useSelector } from "react-redux";
import { setNotes } from "../core/redux/slices/notes.slice";
import { addTab, deleteTab } from "../core/redux/slices/tabs.slice";
import { clearNote, setNote } from "../core/redux/slices/note.slice";
import { RootState } from "../core/redux/store";
import { NewNote } from "./new-note";
import "../styles/note-list.css";
import { displayOn } from "../core/redux/slices/display.slice";

interface Props {
  notesList: Note[];
}

export const NotesList: React.FC<Props> = ({ notesList }) => {
  const note = useSelector((state: RootState) => state.note);

  const tabs = useSelector((state: RootState) => state.tabs);

  const dispatch = useDispatch();

  const openNote = (id: string | undefined) => {
    const [note] = notesList.filter((note) => note.id === id);

    const [tab] = tabs.filter((tab) => tab.id === id);

    if (tab === undefined) {
      dispatch(addTab(note));
    }

    dispatch(setNote(note));

    dispatch(displayOn())
  };

  const deleteNote = async (id: string | undefined) => {
    const deletedNote = notesList.filter((notes) => notes.id !== id);

    const deletedTab = tabs.filter((tab) => tab.id !== id);

    dispatch(deleteTab(deletedTab));

    dispatch(setNotes(deletedNote));

    if (id === note.id) {
      dispatch(clearNote());
    }

    const res = await fetch(`${urls.deleteNote}/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    console.log(data);
  };

  return (
    <aside className="notelist-aside">
      <NewNote />
      <ul className="list-container">
        {notesList.map((note) => (
          <li key={note.id} className="list-element" >
            <button
              onClick={() => openNote(note.id)}
              className="note-list-button"
            >
              {note.title}
            </button>
            <button
              onClick={() => deleteNote(note.id)}
              className="delete-note-button"
            >
              <span className="material-symbols-outlined">delete</span>
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};
