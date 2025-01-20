import { Student } from "./User";

export interface AddBook {
  name: string;
  autherName: string;
  location: string;
  numberInStock: number;
}

export interface Book {
  _id: string;
  name: string;
  autherName: string;
  bookId: string;
  location: string;
  language: string;
  description: string;
  numberInStock: number;
  returnableBooks: number;
  reservedNumber: number;
  imageURL: string;
}

interface Students
  extends Pick<Student, "_id" | "name" | "studentId" | "phone" | "imageURL"> {
  dateBorrow: string;
  dateReturn: string;
}

export interface BorrowedBooks
  extends Pick<
    Book,
    | "_id"
    | "name"
    | "autherName"
    | "bookId"
    | "language"
    | "returnableBooks"
    | "imageURL"
  > {
  students: Students[];
  lateStudentsQuantity: Student[];
}
