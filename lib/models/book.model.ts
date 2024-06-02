import { Timestamp } from "firebase/firestore";

export interface Book {
    title: string;
    author: string;
    publishedDate: Timestamp;
    genre: string;
    summary: string;
    coverImageUrl: string;
    createdAt: Timestamp;
}
