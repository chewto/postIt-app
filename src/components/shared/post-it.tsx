import React, { useCallback, useState } from "react";
import { PostIt as PostItType } from "../../core/interfaces/note.interface";
import { useDispatch } from "react-redux";
import {
  deletePostIt,
  updatePostItContent,
  updatePostItPosition,
} from "../../core/redux/slices/post-it.slice";
import { urls } from "../../core/api-urls/urls";
import { Options } from "./options";
import "../../styles/post-it.css";
import Draggable from "react-draggable";

interface Props {
  postIt: PostItType;
}

export const PostIt: React.FC<Props> = ({ postIt }) => {
  const dispatch = useDispatch();

  // const [dragging, setDragging] = useState<boolean>(false);

  const [openOptions, setOpenOptions] = useState<boolean>(false);

  const [postItData, setPostItData] = useState<PostItType>({
    id: "",
    content: "",
    type: "",
    tag: "",
    x_position: postIt.x_position,
    y_position: postIt.y_position,
    width: 0,
    height: 0,
    noteId: "",
  });

  const handlePostItChange = useCallback(
    (e: React.ChangeEvent<HTMLDivElement>) => {
      const updatedContent = e.currentTarget.innerHTML;
      dispatch(
        updatePostItContent({ id: e.currentTarget.id, content: updatedContent })
      );
    },
    [dispatch]
  );

  const openEditOptions = (postIt: PostItType) => {
    setOpenOptions((prev) => !prev);
    setPostItData(postIt);
  };

  const handleDeletePostIt = async (postItId: string) => {
    const res = await fetch(`${urls.deletePostIt}/${postItId}`, {
      method: "DELETE",
    });
    const data = await res.json();

    dispatch(deletePostIt(postItId));

    console.log(data);
  };

  const handleStop = (e:MouseEvent, id:string) => {
    e.stopPropagation();

  }

  const handleDrag = (e, id:string) => {
    e.stopPropagation();


    const pageX = e.pageX - 350 ;
    const pageY = e.pageY - 150;


    dispatch(updatePostItPosition({id: id, x: pageX, y: pageY}))
  }

  const handleStart = (e) => {
    e.stopPropagation();
  }

  // const handleDragStart = (e:React.DragEvent<HTMLDivElement> ,cellDrag: CellType) => {
  //   e.dataTransfer.setData()
  //   setDragging(true);
  //   setDraggingCell(cellDrag);
  // };

  // const handleDragEnd = () => {
  //   reorderCells()
  // };

  // const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
  //   e.preventDefault();

  //   console.log("drag over");
  // };

  // const handleDrop = (e: React.DragEvent<HTMLDivElement>, incomingCell:CellType, exchangedCell:CellType) => {
  //   e.preventDefault();

  //   console.log("2")
  //   setDragging(false);
  //   dispatch(changeCellOrder([incomingCell, exchangedCell]))
  // };

  return (
    <>
      {postIt.type === "text" && (
        <Draggable
          onStart={(e) => handleStart(e)}
          onStop={(e) => handleStop(e, postIt.id)}
          onDrag={(e) => handleDrag(e, postIt.id)}
          position={{x: postIt.x_position, y: postIt.y_position}}
        >
          <div className="postit-container" style={{width: postIt.width}}>
            {postIt.tag === "p" && (
              <p
                contentEditable
                style={{ border: "1px solid red", height: "70px" }}
                onBlur={handlePostItChange}
                dangerouslySetInnerHTML={{ __html: postIt.content }}
                id={postIt.id}
                className="text-postit"
              ></p>
            )}
            {postIt.tag === "h1" && (
              <h1
                contentEditable
                style={{ border: "1px solid red", height: "70px" }}
                onBlur={handlePostItChange}
                dangerouslySetInnerHTML={{ __html: postIt.content }}
                id={postIt.id}
                className="text-postit"
              ></h1>
            )}
            {postIt.tag === "h2" && (
              <h2
                contentEditable
                style={{ border: "1px solid red", height: "70px" }}
                onBlur={handlePostItChange}
                dangerouslySetInnerHTML={{ __html: postIt.content }}
                id={postIt.id}
                className="text-postit"
              ></h2>
            )}
            {postIt.tag === "h3" && (
              <h3
                contentEditable
                style={{ border: "1px solid red", height: "70px" }}
                onBlur={handlePostItChange}
                dangerouslySetInnerHTML={{ __html: postIt.content }}
                id={postIt.id}
                className="text-postit"
              ></h3>
            )}
            {postIt.tag === "h4" && (
              <h4
                contentEditable
                style={{ border: "1px solid red", height: "70px" }}
                onBlur={handlePostItChange}
                dangerouslySetInnerHTML={{ __html: postIt.content }}
                id={postIt.id}
                className="text-postit"
              ></h4>
            )}
            {postIt.tag === "h5" && (
              <h5
                contentEditable
                style={{ border: "1px solid red", height: "70px" }}
                onBlur={handlePostItChange}
                dangerouslySetInnerHTML={{ __html: postIt.content }}
                id={postIt.id}
                className="text-postit"
              ></h5>
            )}

            {postIt.tag === "h6" && (
              <h6
                contentEditable
                style={{ border: "1px solid red", height: "70px" }}
                onBlur={handlePostItChange}
                dangerouslySetInnerHTML={{ __html: postIt.content }}
                id={postIt.id}
                className="text-postit"
              ></h6>
            )}

            <button onClick={() => openEditOptions(postIt)}>edit cell</button>
            <button onClick={() => handleDeletePostIt(postIt.id)}>
              delete cell
            </button>
          </div>
        </Draggable>
      )}

      {postIt.type === "image" && (
        <Draggable
        onStop={(e) => handleStop(e, postIt.id)}
        >
          <div className="postit-container">
            <div className="img-container">
              <img src={postIt.content} className="postit-img" style={{width: postIt.width}} />
            </div>
            <button onClick={() => openEditOptions(postIt)}>edit cell</button>
            <button onClick={() => handleDeletePostIt(postIt.id)}>
              delete cell
            </button>
          </div>
        </Draggable>
      )}

      {openOptions && (
        <Options
          postItData={postItData}
          setPostItData={setPostItData}
          setDisplayOption={setOpenOptions}
          use="edit"
        />
      )}
    </>
  );
};
