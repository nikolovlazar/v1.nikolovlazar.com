export type BookState = 'Favorite' | 'Reading' | 'Wish' | 'Completed' | '';

export type Book = {
  id: string;
  title: string;
  author: string;
  cover: string;
  state: BookState;
  link?: string;
};
