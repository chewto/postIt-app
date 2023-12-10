import { NotesList } from "./layout/notes-list";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNotes } from "../core/redux/slices/notes.slice";
import { RootState } from "../core/redux/store";
import { urls } from "../core/api-urls/urls";
import { Note } from "./layout/note";

export const Notes: React.FC = () => {

  const notesList = useSelector((state: RootState) => state.notes);

  const dispatch = useDispatch();

  useEffect(() => {

    const getNotes = async () =>{
      const res = await fetch(`${urls.getUserNotes}/a0139992-f6d3-44de-b8b3-01b5b86c9304`)
      const data = await res.json()

      dispatch(setNotes(data))
    }

    getNotes()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="notes">
      <NotesList notesList={notesList} />
      <Note/>
    </div>
  );
};
