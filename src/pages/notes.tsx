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
      const res = await fetch(`${urls.getUserNotes}/c7bc692b-64c0-4f2c-8baa-e5a609da9524`)
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
