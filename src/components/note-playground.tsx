import { useEffect, useState } from "react";
import { urls } from "../core/api-urls/urls";
import { useDispatch, useSelector } from "react-redux";
import {
  updateContent,
  updateTitle,
} from "../core/redux/reducers/note.slice";
import { RootState } from "../core/redux/store";


export const NotesPlayground: React.FC = () => {
  const note = useSelector((state: RootState) => state.note);

  const [oldTitle, setOldTitle] = useState<string>("");

  const dispatch = useDispatch();

  const [edit, setEdit] = useState<boolean>(false);

  useEffect(() => {
    console.log(note);
  }, [note]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      console.log("key down:", e.key);
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

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
    const res = await fetch(`${urls.updateNote}/${note.id}`, {
      method: "PUT",
      body: JSON.stringify(note),
      headers: {
        "Content-type": "application/json",
      },
    });

    const data = await res.json();
    console.log(data);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateTitle(e.target.value));
  };

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(updateContent(e.target.value));
  };

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
    console.log(data);
  };

  return (
    <>
      <div>
        {edit ? (
          <>
            <input
              type="text"
              onChange={handleEditChange}
              defaultValue={note.title}
            />
            <button onClick={handleFinish}>finish</button>
            <button onClick={handleCancel}>cancel</button>
          </>
        ) : (
          <>
            <h3>{note.title}</h3>
            <button onClick={handleEditClick}>edit</button>
          </>
        )}
      </div>
      <textarea value={note.content} onChange={handleNoteChange}></textarea>
      <button onClick={save}>save</button>
    </>
  );
};
