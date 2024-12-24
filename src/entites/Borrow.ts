export interface Borrow {
  _id: string;
  isAssigned: boolean;
  isReturned: boolean;
  book: {
    _id: string;
    autherName: string;
    name: string;
    imageURL: string;
    bookId: string;
  };
  student: {
    _id: string;
    name: string;
    phone: string;
    studentId: string;
    imageURL: string;
  };
}
