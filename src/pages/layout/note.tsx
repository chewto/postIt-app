import { useState, useEffect } from "react";
import { NotesPlayground } from "../../components/note-playground";
import { setNote } from "../../core/redux/reducers/note.slice";
import { urls } from "../../core/api-urls/urls";
import { useDispatch } from "react-redux";

interface Props {
  noteId: string;
}

export const Note: React.FC<Props> = ({ noteId }) => {
  const [showNote, setShowNote] = useState<boolean>(false);

  const dispatch = useDispatch()

  useEffect(() => {
    const getNote = async () => {
      try {
        const res = await fetch(`${urls.getNote}/${noteId}`);
        const data = await res.json();
        
        console.log(res.status);

        setShowNote(true)
        dispatch(setNote(data));
      } catch (e) {
        setShowNote(false)
        console.log(e);
      }
    };

    getNote();

  }, [noteId]);


  return (
    <>
      {
        showNote ? (
          <NotesPlayground/>
        ) : (
          <>
            select a note
          </>
        )
      }
    </>
  );
};
