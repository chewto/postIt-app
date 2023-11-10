import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Note } from "../../interfaces/note.interface";

const initialState: Note = {
  id: "",
  title: "",
  content: "",
  userId: "",
};

export const NoteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    setNote: (state, action: PayloadAction<Note>) => {
      const { id, title, content, userId } = action.payload;
      state.id = id;
      state.title = title;
      state.content = content;
      state.userId = userId;
    },
    updateContent: (state, action: PayloadAction<string>) => {
      state.content = action.payload;
    },
    updateTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
  },
});

export const { setNote, updateContent, updateTitle } = NoteSlice.actions;

export default NoteSlice.reducer;
