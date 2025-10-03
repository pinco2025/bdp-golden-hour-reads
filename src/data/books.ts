import books from "../data/books.json";

export type Book = {
  id: string;
  title: string;
  desc: string;
  img: string;
  link: string;
};

export default books as Book[];
