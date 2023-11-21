import { NotesList } from "../components/notes-list";
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
      const res = await fetch(`${urls.getUserNotes}/271657c1-26d3-4251-b050-f05c1c5a7adc`)
      const data = await res.json()

      dispatch(setNotes(data))
    }

    getNotes()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notesList]);

  return (
    <div className="notes">
      <NotesList notesList={notesList} />
      <Note/>
    </div>
  );
};
