import { useEffect } from 'react'
import { Board } from "../../components/board";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../core/redux/store";
import '../../styles/note.css'
import { urls } from '../../core/api-urls/urls';
import { setPostIts } from '../../core/redux/slices/post-it.slice';

export const Note: React.FC = () => {
  const note = useSelector((state: RootState) => state.note);

  const dispatch = useDispatch();

  useEffect(()=> {
    const getPostIts = async () => {
      const res = await fetch(`${urls.getPostIts}/${note.id}`);
      const data = await res.json();
      dispatch(setPostIts(data))
    }

    getPostIts()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [note])

  return (
    <main className='note-side'
      // onContextMenu={(e) => {
      //   e.preventDefault()
      //   console.log('right clikc')
      // }}
    >
      <Board/>
    </main>
  );
};
