import { Note } from "../../core/interfaces/note.interface";
import { urls } from "../../core/api-urls/urls";
import { useDispatch, useSelector } from "react-redux";
import { deleteNote } from "../../core/redux/slices/notes.slice";
import { clearNote, setNote } from "../../core/redux/slices/note.slice";
import { RootState } from "../../core/redux/store";
import { NewNote } from "../../components/new-note";
import "../../styles/note-list.css";
import { displayOn } from "../../core/redux/slices/display.slice";
import { clearCells } from "../../core/redux/slices/cells.slice";

interface Props {
  notesList: Note[];
}

export const NotesList: React.FC<Props> = ({ notesList }) => {
  const note = useSelector((state: RootState) => state.note);

  const dispatch = useDispatch();

  const openNote = (id: string | undefined) => {
    const [note] = notesList.filter((note) => note.id === id);

    dispatch(setNote(note));

    dispatch(displayOn())
  };

  const handleDeleteNote = async (id: string) => {

    dispatch(deleteNote(id));

    if (id === note.id) {
      dispatch(clearNote());
      dispatch(clearCells())
    }

    await fetch(`${urls.deleteNote}/${id}`, {
      method: "DELETE",
    });
    
    await fetch(`${urls.deleteAllCells}/${id}`, {
      method: "DELETE"
    })
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
              onClick={() => handleDeleteNote(note.id)}
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
