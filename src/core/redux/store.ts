import { configureStore } from "@reduxjs/toolkit";
import notesReducer from './slices/notes.slice'
import noteReducer from './slices/note.slice'
import displayReducer from './slices/display.slice'
import postItsReducer from './slices/post-it.slice'

export const store = configureStore({
  reducer: {
    notes: notesReducer,
    note: noteReducer,
    display: displayReducer,
    postIt: postItsReducer
  }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch