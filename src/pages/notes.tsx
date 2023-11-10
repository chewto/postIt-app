import { NotesPlayground } from "../components/note-playground";
import { NotesList } from "../components/notes-list";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNotes } from "../core/redux/reducers/notes.slice";
import { RootState } from "../core/redux/store";
import { urls } from "../core/api-urls/urls";
import { Note } from "./layout/note";

export const Notes: React.FC = () => {
  const notesList = useSelector((state: RootState) => state.notes);
  const dispatch = useDispatch();

  const [noteId, setNoteId] = useState<string>("");
  

  useEffect(() => {
    console.log(notesList);
  }, [notesList]);

  useEffect(() => {
    fetch(`${urls.getUserNotes}/271657c1-26d3-4251-b050-f05c1c5a7adc`)
      .then((res) => res.json())
      .then((res) => dispatch(setNotes(res)));
  }, [dispatch, notesList]);

  return (
    <>
      <NotesList setNoteId={setNoteId} notesList={notesList} />
      <Note noteId={noteId}/>
    </>
  );
};
