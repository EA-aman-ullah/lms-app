export default interface Book {
  _id: string;
  name: string;
  autherName: string;
  bookId: string;
  location: string;
  numberInStock: number;
  returnableBooks: number;
  reservedNumber: number;
  imageURL: string;
  dateAdd: Date;
  requests: {
    studentId: string;
    studentName: string;
    studentPhone: string;
    studentImage: string;
  }[];
  borrows: {
    studentId: string;
    studentName: string;
    studentPhone: string;
    studentImage: string;
  }[];
}

export interface AddBook {
  name: string;
  autherName: string;
  location: string;
  numberInStock: number;
}
