import { Cell } from './../../interfaces/note.interface';
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const cellsInitialState:Cell[] = [

]

export const CellsSlice = createSlice({
  name: 'cells',
  initialState: cellsInitialState,
  reducers: {
    setCells: (state, action:PayloadAction<Cell[]>) => {

      const copy = [...action.payload]

      copy.sort((a,b) => a.orderNumber - b.orderNumber)

      return copy
    },
    addCell: (state, action:PayloadAction<Cell>) => {
      state.push(action.payload)
    },
    updateCellContent: (state, action:PayloadAction <{id:string, content:string}>) => {
      const {id, content} = action.payload

      const index = state.findIndex((cell) => cell.id === id);

      if(index !== -1) {
        state[index].content = content
      }
    },
    updateCellEdit: (state, action: PayloadAction<Cell>) => {
      
        const {id, content, type, tag, orderNumber, noteId} = action.payload
  
        const index = state.findIndex((cell) => cell.id === id);
  
        if(index !== -1) {
          state[index].content = content
          state[index].type = type
          state[index].tag = tag
          state[index].orderNumber = orderNumber
          state[index].noteId = noteId
        }
    },
    changeCellOrder: (state, action:PayloadAction <Cell[]>) => {
      const [incomingCell, exchangedCell] = action.payload

      const indexComingCell = state.findIndex((cell) => cell.id === incomingCell.id)
      const indexExchangedCell = state.findIndex((cell) => cell.id === exchangedCell.id)

      if(indexComingCell !== -1){
        state[indexComingCell].orderNumber = exchangedCell.orderNumber
        state[indexExchangedCell].orderNumber = incomingCell.orderNumber
      }
    },
    reorderCells: (state) => {
      return state.sort((a,b) => a.orderNumber - b.orderNumber)
    },
    deleteCell: (state, action: PayloadAction<string>) => {
      const id = action.payload

      const cellIndex = state.findIndex((cell) => cell.id === id)

      if(cellIndex !== -1){
        state.splice(cellIndex,1)
      }
    },
    clearCells: () => cellsInitialState
  }
})

export const {setCells, addCell, updateCellContent, updateCellEdit, changeCellOrder,deleteCell , reorderCells,clearCells} = CellsSlice.actions;

export default CellsSlice.reducer;