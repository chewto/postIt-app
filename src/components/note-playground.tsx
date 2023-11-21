import React, { useCallback, useState } from "react";
import { urls } from "../core/api-urls/urls";
import { useDispatch, useSelector } from "react-redux";
import {
  updateContent,
  updateTitle,
} from "../core/redux/slices/note.slice";
import { RootState } from "../core/redux/store";
import {Note} from '../core/interfaces/note.interface'


export const NotesPlayground: React.FC = () => {
  const note = useSelector((state: RootState) => state.note);

  const [oldTitle, setOldTitle] = useState<string>("");

  const dispatch = useDispatch();

  const [edit, setEdit] = useState<boolean>(false);

  const [newNoteTitle, setNoteTitle] = useState<string>('')

  const handleEditClick = () => {
    setEdit((prev) => !prev);
    setOldTitle(note.title);
  };

  const handleCancel = () => {
    setEdit((prev) => !prev);
    dispatch(updateTitle(oldTitle));
  };

  const handleFinish = async () => {
    setEdit((prev) => !prev);

    const noteTitleUpdated:Note = {
      id: note.id,
      title: newNoteTitle,
      content: note.content,
      userId: note.userId
    }

    dispatch(updateTitle(newNoteTitle))

    const res = await fetch(`${urls.updateNote}/${note.id}`, {
      method: "PUT",
      body: JSON.stringify(noteTitleUpdated),
      headers: {
        "Content-type": "application/json",
      },
    });

    const data = await res.json();
    console.log(data);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNoteTitle(e.target.value)
  };

  const handleNoteChange = useCallback((e:React.ChangeEvent<HTMLDivElement>) => dispatch(updateContent(e.currentTarget.innerHTML)), [])

  const save = async () => {
    console.log(note.content);
    const res = await fetch(`${urls.updateNote}/${note.id}`, {
      method: "PUT",
      body: JSON.stringify(note),
      headers: {
        "Content-type": "application/json",
      },
    });

    const data = await res.json();
    console.log(data)
  };

  return (
    <>
      <div className="note-title-container">
        {edit ? (
          <>
            <input
              type="text"
              onChange={handleEditChange}
              defaultValue={note.title}
            />
            <button onClick={handleFinish} className="button">finish</button>
            <button onClick={handleCancel} className="button">cancel</button>
          </>
        ) : (
          <>
            <h3>{note.title}</h3>
            <button onClick={handleEditClick} className="button">edit</button>
          </>
        )}
      </div>
      <div contentEditable style={{border: '1px solid red'}} onBlur={handleNoteChange} dangerouslySetInnerHTML={{__html: note.content}}></div>
      <button onClick={save}>save</button>
    </>
  );
};
