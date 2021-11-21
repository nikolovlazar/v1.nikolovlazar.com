export type BookState = 'Favorite' | 'Reading' | 'Wish' | '';

export type Book = {
  id: string;
  title: string;
  author: string;
  cover: string;
  state: BookState;
  link?: string;
};
