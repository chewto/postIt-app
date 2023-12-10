const baseURL = 'http://localhost:3000'

export const urls = {
  getUserNotes: `${baseURL}/get-user-notes`,
  getNote: `${baseURL}/get-note`,
  addNewNote: `${baseURL}/add-note`,
  updateNote: `${baseURL}/update-note`,
  deleteNote: `${baseURL}/delete-note`,
  getPostIts: `${baseURL}/get-post-its`,
  addPostIt: `${baseURL}/add-post-it`,
  updatePostIt: `${baseURL}/update-post-it`,
  deletePostIt: `${baseURL}/delete-post-it`,
  deleteAllPostIts: `${baseURL}/delete-all-post-its`,
  createUser: `${baseURL}/create-user`
}