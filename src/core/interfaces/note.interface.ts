export interface Note{
  id: string;
  title: string;
  userId: string;
}

export interface Cell{
  id: string;
  content: string;
  type: string;
  orderNumber: number;
  tag: string;
  noteId: string;
}