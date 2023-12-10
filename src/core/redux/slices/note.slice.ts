import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Note } from "../../interfaces/note.interface";

const initialState: Note = {
  id: "",
  title: "",
  width: 0,
  height: 0,
  userId: ""
};

export const NoteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    setNote: (state, action: PayloadAction<Note>) => {
      const { id, title, width, height, userId } = action.payload;

      state.id = id;
      state.title = title;
      state.width = width;
      state.height = height;
      state.userId = userId;
    },
    updateTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    updateSize: (state, action: PayloadAction<{width: number, height: number}>) => {
      const {width, height} = action.payload;

      state.width = width;
      state.height = height;
    },
    clearNote: () => initialState,
  },
});

export const { setNote, updateTitle, updateSize, clearNote } =
  NoteSlice.actions;

export default NoteSlice.reducer;
