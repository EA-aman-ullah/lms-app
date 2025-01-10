export interface Person {
  _id?: string;
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  phone: string;
  message?: string;
}

export interface student {
  name: string;
  phone: string;
  studentId: string;
  imageURL: string;
  studentWithBorrowed: number;
  overdueBooks: number;
  lastBookReturnDate: string;
}
