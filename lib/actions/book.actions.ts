"use server"

import { firestore } from '../firebaseConfig';
import { collection, addDoc, Timestamp, getDocs } from 'firebase/firestore';
import { Book } from '../models/book.model';

// Add a new book
export const addBook = async (book: Book) => {
  try {
    const docRef = await addDoc(collection(firestore, 'books'), {
      ...book,
      createdAt: Timestamp.now(),
    });
    console.log('Book added with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding book: ', e);
  }
};

// Get all books
export const getAllBooks = async () => {
  const booksCollection = collection(firestore, 'books');
  const booksSnapshot = await getDocs(booksCollection);
  const booksList = booksSnapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      // Convert Firestore Timestamp to plain JavaScript Date object
      createdAt: data.createdAt.toDate()
    };
  });
  return booksList;
};