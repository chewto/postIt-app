import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { addNote } from "../core/redux/slices/notes.slice";
import { Note } from "../core/interfaces/note.interface";
import { urls } from "../core/api-urls/urls";
import {v4 as uuid4} from "uuid";

export const NewNote: React.FC = () => {
  const dispatch = useDispatch();

  const [newNote, setNewNote] = useState<Note>({
    id: "",
    title: "",
    userId: "c7bc692b-64c0-4f2c-8baa-e5a609da9524",
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
          onClick={() => {
            setNewNote({
              ...newNote,
              id: uuid4()
            })
          }}
        />
        <button onClick={addNewNote}>new note</button>
      </div>
    </>
  );
};
