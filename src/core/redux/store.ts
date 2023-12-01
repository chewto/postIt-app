import { configureStore } from "@reduxjs/toolkit";
import notesReducer from './slices/notes.slice'
import noteReducer from './slices/note.slice'
import displayReducer from './slices/display.slice'
import cellsReducer from './slices/cells.slice'

export const store = configureStore({
  reducer: {
    notes: notesReducer,
    note: noteReducer,
    display: displayReducer,
    cells: cellsReducer
  }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch