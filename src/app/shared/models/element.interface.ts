export interface ElementObjectBase {
  name: string;
  dueDate: Date;
  description: string;
}

export interface ElementObject extends ElementObjectBase {
  id: string;
  creationDate: Date;
}
