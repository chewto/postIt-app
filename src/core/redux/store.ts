import { configureStore } from "@reduxjs/toolkit";
import notesReducer from './slices/notes.slice'
import noteReducer from './slices/note.slice'
import tabsReducer from './slices/tabs.slice'
import displayReducer from './slices/display.slice'

export const store = configureStore({
  reducer: {
    notes: notesReducer,
    note: noteReducer,
    tabs: tabsReducer,
    display: displayReducer
  }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch