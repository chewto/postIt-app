import { useEffect, useState } from 'react'
import { NotesPlayground } from "../../components/note-playground";
import { useSelector } from "react-redux";
import { Tabs } from "../../components/tabs";
import { RootState } from "../../core/redux/store";
import '../../styles/note.css'
import {Note as NoteInterface} from '../../core/interfaces/note.interface'

export const Note: React.FC = () => {
  const note = useSelector((state: RootState) => state.note);
  
  const displayNote = useSelector((state: RootState) => state.display);

  useEffect(() => {
    console.log(displayNote)
  }, [displayNote])

  return (
    <main className='note-side'>
      <Tabs/>

      <NotesPlayground/>
    </main>
  );
};
