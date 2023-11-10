import { Dispatch, SetStateAction, useState } from "react";
import { Note } from "../core/interfaces/note.interface";
import { urls } from "../core/api-urls/urls";
import { useDispatch } from "react-redux";
import { addNote, setNotes } from "../core/redux/reducers/notes.slice";

interface Props {
  setNoteId: Dispatch<SetStateAction<string>>;
  notesList: Note[];
}

export const NotesList: React.FC<Props> = ({ setNoteId, notesList }) => {
  const dispatch = useDispatch();

  const [newNote, setNewNote] = useState<Note>({
    title: "",
    content: "",
    userId: "271657c1-26d3-4251-b050-f05c1c5a7adc",
  });

  const handleNewNote = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewNote({
      ...newNote,
      [e.target.name]: e.target.value,
    });
  };

  const openNote = (id: string | undefined) => {
    if (typeof id === "string") {
      setNoteId(id);
    }
  };

  const deleteNote = (id: string | undefined) => {

    dispatch(setNotes(notesList.filter((notes) => notes.id !== id)));

    fetch(`${urls.deleteNote}/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
  };

  const addNewNote = async () => {
    dispatch(addNote(newNote));

    const res = await fetch(`${urls.addNewNote}`, {
      method: "POST",
      body: JSON.stringify(newNote),
      headers: {
        "Content-type": "application/json"
      }
    })
    
    const data = await res.json()

    console.log(data)
  };

  return (
    <>
      <div>
        <input type="text" name="title" onChange={handleNewNote} />
        <button onClick={addNewNote}>add new note</button>
      </div>
      {notesList.map((note) => (
        <div key={note.id}>
          <button onClick={() => openNote(note.id)}>{note.title}</button>{" "}
          <button onClick={() => deleteNote(note.id)}>delete</button>
        </div>
      ))}
    </>
  );
};
