import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Note } from "../../interfaces/note.interface";

const initialState: Note = {
  id: "",
  title: "",
  userId: ""
};

export const NoteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    setNote: (state, action: PayloadAction<Note>) => {
      const { id, title, userId } = action.payload;

      state.id = id;
      state.title = title;
      state.userId = userId;
    },
    updateTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    clearNote: () => initialState,
  },
});

export const { setNote, updateTitle, clearNote } =
  NoteSlice.actions;

export default NoteSlice.reducer;
