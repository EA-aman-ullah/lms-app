export interface Request {
  _id: string;
  isApproved: boolean;
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
