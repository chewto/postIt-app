import React, { useCallback, useState, Dispatch, SetStateAction } from "react";
import { Cell as CellType } from "../../core/interfaces/note.interface";
import { useDispatch } from "react-redux";
import {
  deleteCell,
  updateCellContent,
} from "../../core/redux/slices/cells.slice";
import { urls } from "../../core/api-urls/urls";
import { Options } from "./options";
import "../../styles/cell.css";
import Draggable from "react-draggable";

interface Props {
  draggingCell: CellType;
  setDraggingCell: Dispatch<SetStateAction<CellType>>;
  cell: CellType;
}

export const Cell: React.FC<Props> = ({
  cell
}) => {

  const dispatch = useDispatch();

  // const [dragging, setDragging] = useState<boolean>(false);

  const [openOptions, setOpenOptions] = useState<boolean>(false);

  const [cellData, setCellData] = useState<CellType>({
    id: "",
    content: "",
    type: "",
    orderNumber: 0,
    tag: "",
    noteId: "",
  });

  const handleCellChange = useCallback(
    (e: React.ChangeEvent<HTMLDivElement>) => {
      const updatedContent = e.currentTarget.innerHTML;
      dispatch(
        updateCellContent({ id: e.currentTarget.id, content: updatedContent })
      );
    },
    [dispatch]
  );

  const openEditOptions = (cell: CellType) => {
    setOpenOptions((prev) => !prev);
    setCellData(cell);
  };

  const handleDeleteCell = async (cellId: string) => {
    const res = await fetch(`${urls.deleteCell}/${cellId}`, {
      method: "DELETE",
    });
    const data = await res.json();

    dispatch(deleteCell(cellId));

    console.log(data);
  };

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
      {cell.type === "text" && (

        <div className="cell-container">
          <div
            className="reposition-cell-container"
          >
            <div style={{ border: "1px solid #000" }}></div>
          </div>
          {cell.tag === "p" && (
            <p
              contentEditable
              style={{ border: "1px solid red", height: "70px" }}
              onBlur={handleCellChange}
              dangerouslySetInnerHTML={{ __html: cell.content }}
              id={cell.id}
              className="text-cell"
            ></p>
          )}
          {cell.tag === "h1" && (
            <h1
              contentEditable
              style={{ border: "1px solid red", height: "70px" }}
              onBlur={handleCellChange}
              dangerouslySetInnerHTML={{ __html: cell.content }}
              id={cell.id}
              className="text-cell"
            ></h1>
          )}
          {cell.tag === "h2" && (
            <h2
              contentEditable
              style={{ border: "1px solid red", height: "70px" }}
              onBlur={handleCellChange}
              dangerouslySetInnerHTML={{ __html: cell.content }}
              id={cell.id}
              className="text-cell"
            ></h2>
          )}
          {cell.tag === "h3" && (
            <h3
              contentEditable
              style={{ border: "1px solid red", height: "70px" }}
              onBlur={handleCellChange}
              dangerouslySetInnerHTML={{ __html: cell.content }}
              id={cell.id}
              className="text-cell"
            ></h3>
          )}
          {cell.tag === "h4" && (
            <h4
              contentEditable
              style={{ border: "1px solid red", height: "70px" }}
              onBlur={handleCellChange}
              dangerouslySetInnerHTML={{ __html: cell.content }}
              id={cell.id}
              className="text-cell"
            ></h4>
          )}
          {cell.tag === "h5" && (
            <h5
              contentEditable
              style={{ border: "1px solid red", height: "70px" }}
              onBlur={handleCellChange}
              dangerouslySetInnerHTML={{ __html: cell.content }}
              id={cell.id}
              className="text-cell"
            ></h5>
          )}

          {cell.tag === "h6" && (
            <h6
              contentEditable
              style={{ border: "1px solid red", height: "70px" }}
              onBlur={handleCellChange}
              dangerouslySetInnerHTML={{ __html: cell.content }}
              id={cell.id}
              className="text-cell"
            ></h6>
          )}

          <button onClick={() => openEditOptions(cell)}>edit cell</button>
          <button onClick={() => handleDeleteCell(cell.id)}>delete cell</button>
        </div>
      )}

      {cell.type === "image" && (
        <div className="cell-container">
          <div
            className="reposition-cell-container"
          >
            <div style={{ border: "1px solid #000" }}></div>
          </div>
          <div className="img-container">
            <img src={cell.content} className="cell-img" />
          </div>
          <button onClick={() => openEditOptions(cell)}>edit cell</button>
          <button onClick={() => handleDeleteCell(cell.id)}>delete cell</button>
        </div>
      )}

      {openOptions && (
        <Options
          cellData={cellData}
          setCellData={setCellData}
          setDisplayOption={setOpenOptions}
          use="edit"
        />
      )}
    </>
  );
};
