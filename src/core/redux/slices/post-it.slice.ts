import { PostIt } from '../../interfaces/note.interface';
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const cellsInitialState:PostIt[] = [

]

export const PostItSlice = createSlice({
  name: 'cells',
  initialState: cellsInitialState,
  reducers: {
    setPostIts: (state, action:PayloadAction<PostIt[]>) => {

      return action.payload
    },
    addPostIt: (state, action:PayloadAction<PostIt>) => {
      state.push(action.payload)
    },
    updatePostItContent: (state, action:PayloadAction <{id:string, content:string}>) => {
      const {id, content} = action.payload

      const index = state.findIndex((cell) => cell.id === id);

      if(index !== -1) {
        state[index].content = content
      }
    },
    updatePostItEdit: (state, action: PayloadAction<PostIt>) => {
      
        const {id, content, type, tag, noteId} = action.payload
  
        const index = state.findIndex((cell) => cell.id === id);
  
        if(index !== -1) {
          state[index].content = content
          state[index].type = type
          state[index].tag = tag
          state[index].noteId = noteId
        }
    },
    updatePostItPosition: (state, action: PayloadAction<{id: string, x: number, y:number}>) => {
      const {id, x, y} = action.payload

      const index = state.findIndex((postIt) => postIt.id === id);

      if(index !== -1){
        state[index].x_position = x 
        state[index].y_position = y
      }
    }
    ,
    deletePostIt: (state, action: PayloadAction<string>) => {
      const id = action.payload

      const cellIndex = state.findIndex((cell) => cell.id === id)

      if(cellIndex !== -1){
        state.splice(cellIndex,1)
      }
    },
    clearPostIts: () => cellsInitialState
  }
})

export const {setPostIts, addPostIt, updatePostItContent, updatePostItEdit, updatePostItPosition, deletePostIt ,clearPostIts} = PostItSlice.actions;

export default PostItSlice.reducer;