import { useDispatch } from "react-redux";
import { useState } from "react";
import { addNote } from "../core/redux/slices/notes.slice";
import { Note } from "../core/interfaces/note.interface";
import { urls } from "../core/api-urls/urls";

export const NewNote: React.FC = () => {
  
  const dispatch = useDispatch()

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

  const addNewNote = async () => {
    dispatch(addNote(newNote));

    const res = await fetch(`${urls.addNewNote}`, {
      method: "POST",
      body: JSON.stringify(newNote),
      headers: {
        "Content-type": "application/json",
      },
    });

    const data = await res.json();

    console.log(data);
  };

  return (
    <>
      <div className="new-note-container">
        <input
          type="text"
          name="title"
          autoComplete="off"
          onChange={handleNewNote}
          className="new-note-input"
        />
        <button onClick={addNewNote}>new note</button>
      </div>
    </>
  );
};
