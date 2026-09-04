export type Quote = {
  _id: string;
  text: string;
  author: string;
  category: string;
  likesCount: number;
  createdAt: string;
  userId?: string;
};

export const categories = [
  "Inspiration",
  "Humor",
  "Literature",
  "Life",
  "Wisdom",
  "Love",
  "Art",
  "Motivation",
  "Philosophy",
  "Science",
  "Success",
  "Friendship",
  "Movies",
  "Music",
];

export interface User {
  _id: string;
  email: string;
  username: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
  url:string
}
