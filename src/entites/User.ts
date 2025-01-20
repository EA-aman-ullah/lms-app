export interface Person {
  _id?: string;
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  phone: string;
  message?: string;
}

export interface Student {
  _id: string;
  name: string;
  email: string;
  phone: string;
  studentId: string;
  imageURL: string;
  returnableBooks: number;
  borrows: {
    name: string;
    autherName: string;
    imageURL: string;
    bookId: string;
    dateBorrow: string;
    dateReturn: string;
  }[];
  overdueBooks: {
    name: string;
    imageURL: string;
    bookId: string;
    borrowDate: string;
    returnDate: string;
  }[];
}

export interface Me
  extends Pick<
    Student,
    "_id" | "name" | "email" | "imageURL" | "phone" | "studentId"
  > {
  isVarified: boolean;
}
