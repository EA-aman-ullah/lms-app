export interface Request {
  _id: string;
  isApproved: boolean;
  isAssigned: boolean;
  isReturned: boolean;
  dateAssign: Date;
  dateReturn: Date;
  book: {
    _id: string;
    name: string;
    autherName: string;
    language: string;
    location: string;
    imageURL: string;
    bookId: string;
  };

  user: {
    _id: string;
    name: string;
    phone: string;
    emai: string;
    studentId: string;
    imageURL: string;
  };
}
