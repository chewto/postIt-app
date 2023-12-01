import React, { useState, useEffect } from "react";
import { urls } from "../core/api-urls/urls";
import { useDispatch, useSelector } from "react-redux";
import { updateTitle } from "../core/redux/slices/note.slice";
import { RootState } from "../core/redux/store";
import {
  Cell as CellType,
  Note as NoteType,
} from "../core/interfaces/note.interface";
import { Options } from "./shared/options";
import { updateTitleList } from "../core/redux/slices/notes.slice";
import { Cell } from "./shared/cell";
import { v4 as uuid4 } from "uuid";

export const NotesPlayground: React.FC = () => {
  const note = useSelector((state: RootState) => state.note);

  const cells = useSelector((state: RootState) => state.cells);

  const dispatch = useDispatch();

  const [oldTitle, setOldTitle] = useState<string>("");

  const [edit, setEdit] = useState<boolean>(false);

  const [displayOption, setDisplayOption] = useState<boolean>(false);

  const [cellData, setCellData] = useState<CellType>({
    id: "",
    content: "",
    type: "",
    orderNumber: 0,
    tag: "",
    noteId: "",
  });

  const [newNoteTitle, setNoteTitle] = useState<string>("");

  const [draggingCell, setDraggingCell] = useState<CellType>({
    id: '',
    content: '',
    orderNumber: 0,
    type: '',
    tag: '',
    noteId: ''
  })

  useEffect(() => {
    setCellData({
      ...cellData,
      noteId: note.id,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [note]);

  useEffect(() => {
    setCellData({
      ...cellData,
      orderNumber: cells.length,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cells]);

  useEffect(()=> {
    console.log(cells)
  }, [cells])

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

    const noteTitleUpdated: NoteType = {
      id: note.id,
      title: newNoteTitle,
      userId: note.userId,
    };

    dispatch(updateTitle(newNoteTitle));
    dispatch(updateTitleList(noteTitleUpdated));

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
    setNoteTitle(e.target.value);
  };

  const save = () => {
    
    cells.forEach((cell) => {

      if(cell.content.length >= 1){
        fetch(`${urls.updateCell}`, {
          method: 'PUT',
          body: JSON.stringify(cell),
          headers: {
            "Content-type": "application/json",
          }
        })
        .then(res => res.json())
        .then(data => console.log(data))
      }
    })
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
            <button onClick={handleFinish} className="button">
              finish
            </button>
            <button onClick={handleCancel} className="button">
              cancel
            </button>
          </>
        ) : (
          <>
            <h3>{note.title}</h3>
            <button onClick={handleEditClick} className="button">
              edit
            </button>
          </>
        )}
      </div>

      <div>
        <button onClick={() => {
          setDisplayOption((prev) => !prev);
          setCellData({
            ...cellData,
            id: uuid4()
          })
        }}>
          add cell
        </button>

        <button onClick={save}>save</button>
        {displayOption && (
          <Options
            cellData={cellData}
            setCellData={setCellData}
            setDisplayOption={setDisplayOption}
            use="add"
          />
        )}
      </div>
      <div className="note-playground">
        {cells.map((cell: CellType) => (
          <Cell cell={cell} key={cell.id} draggingCell={draggingCell} setDraggingCell={setDraggingCell}/>
        ))}
      </div>
    </>
  );
};
