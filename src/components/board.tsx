import React, { useState, useEffect } from "react";
import { urls } from "../core/api-urls/urls";
import { useDispatch, useSelector } from "react-redux";
import { updateSize, updateTitle } from "../core/redux/slices/note.slice";
import { RootState } from "../core/redux/store";
import {
  PostIt as PostItType,
  Note as NoteType,
} from "../core/interfaces/note.interface";
import { Options } from "./shared/options";
import { updateTitleList } from "../core/redux/slices/notes.slice";
import { PostIt } from "./shared/post-it";
import { v4 as uuid4 } from "uuid";

export const Board: React.FC = () => {
  const note = useSelector((state: RootState) => state.note);

  const postIts = useSelector((state: RootState) => state.postIt);

  const dispatch = useDispatch();

  const [oldTitle, setOldTitle] = useState<string>("");

  const [edit, setEdit] = useState<boolean>(false);

  const [displayOption, setDisplayOption] = useState<boolean>(false);

  const [postItData, setPostItData] = useState<PostItType>({
    id: "",
    content: "",
    type: "text",
    tag: "",
    x_position: 0,
    y_position: 0,
    width:400,
    height:100,
    noteId: "",
  });

  const [newNoteTitle, setNoteTitle] = useState<string>("");
  const [noteSize, setNoteSize] = useState({
    width: 0,
    height: 0
  })

  useEffect(() => {
    setPostItData({
      ...postItData,
      noteId: note.id,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [note]);

  useEffect(()=> {
    console.log(postIts)
  }, [postIts])

  const handleEditClick = () => {
    setEdit((prev) => !prev);
    setOldTitle(note.title);
    setNoteSize({
      width: note.width,
      height: note.height
    })
  };

  const handleCancel = () => {
    setEdit((prev) => !prev);
    dispatch(updateTitle(oldTitle));
    dispatch(updateSize({width: noteSize.width, height: noteSize.height}))
  };

  const handleFinish = async () => {
    setEdit((prev) => !prev);

    const noteTitleUpdated: NoteType = {
      id: note.id,
      title: newNoteTitle,
      userId: note.userId,
      width: note.width,
      height: note.height
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

  const handleEditSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.currentTarget.value)

    setNoteSize({
      ...noteSize,
      [e.target.name]: value
    })
  }

  const save = () => {
    
    postIts.forEach((postIt:PostItType) => {
        fetch(`${urls.updatePostIt}`, {
          method: 'PUT',
          body: JSON.stringify(postIt),
          headers: {
            "Content-type": "application/json",
          }
        })
        .then(res => res.json())
        .then(data => console.log(data))
    })
  };

  return (
    <>
      <div className="note-title-container">
        {edit ? (
          <>
            <input type="number" onChange={handleEditSize} defaultValue={note.width} name="width"/>
            <input type="number" onChange={handleEditSize} defaultValue={note.height} name="height"/>
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
          setPostItData({
            ...postItData,
            id: uuid4()
          })
        }}>
          add cell
        </button>

        <button onClick={save}>save</button>
        {displayOption && (
          <Options
            postItData={postItData}
            setPostItData={setPostItData}
            setDisplayOption={setDisplayOption}
            use="add"
          />
        )}
      </div>
      <div className="board" style={{width: `${note.width}px`, height: `${note.height}px`}}>
        {postIts.map((postIt: PostItType) => (
          <PostIt postIt={postIt} key={postIt.id}/>
        ))}
      </div>
    </>
  );
};
