export interface Request {
  _id: string;
  isApproved: boolean;
  isAssigned: boolean;
  isReturned: boolean;
  dateAssign: Date;
  dateReturn: Date;

  book: {
    _id: string;
    autherName: string;
    name: string;
    imageURL: string;
    bookId: string;
    location: string;
  };
  student: {
    _id: string;
    name: string;
    phone: string;
    studentId: string;
    imageURL: string;
  };
}
