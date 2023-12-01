import { useEffect } from 'react'
import { NotesPlayground } from "../../components/note-playground";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../core/redux/store";
import '../../styles/note.css'
import { urls } from '../../core/api-urls/urls';
import { setCells } from '../../core/redux/slices/cells.slice';

export const Note: React.FC = () => {
  const note = useSelector((state: RootState) => state.note);

  const dispatch = useDispatch();

  useEffect(()=> {
    const getCells = async () => {
      const res = await fetch(`${urls.getCells}/${note.id}`);
      const data = await res.json();
      dispatch(setCells(data))
    }

    getCells()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [note])

  return (
    <main className='note-side'
      // onContextMenu={(e) => {
      //   e.preventDefault()
      //   console.log('right clikc')
      // }}
    >
      <NotesPlayground/>
    </main>
  );
};
