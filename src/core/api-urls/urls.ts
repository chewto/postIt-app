const baseURL = 'http://localhost:3000'

export const urls = {
  getUserNotes: `${baseURL}/get-user-notes`,
  getNote: `${baseURL}/get-note`,
  addNewNote: `${baseURL}/add-note`,
  updateNote: `${baseURL}/update-note`,
  deleteNote: `${baseURL}/delete-note`,
  getCells: `${baseURL}/get-cells`,
  addCell: `${baseURL}/add-cell`,
  updateCell: `${baseURL}/update-cell`,
  deleteCell: `${baseURL}/delete-cell`,
  deleteAllCells: `${baseURL}/delete-all-cells`,
  createUser: `${baseURL}/create-user`
}