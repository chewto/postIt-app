export interface Note{
  id: string;
  title: string;
  width: number;
  height: number;
  userId: string;
}

export interface PostIt{
  id: string;
  content: string;
  type: string;
  tag: string;
  x_position: number;
  y_position: number;
  width: number;
  height: number;
  noteId: string;
}