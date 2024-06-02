"use client"

import { useEffect, useState } from 'react';
import { getAllBooks } from '@/lib/actions/book.actions';

const Books = () => {
    const [books, setBooks] = useState<any[]>([]);

    useEffect(() => {
        const fetchBooks = async () => {
            const booksList = await getAllBooks();
            setBooks(booksList);
        };

        fetchBooks();
    }, []);

    return (
        <div className='container mx-auto p-6'>
    <h1 className='text-violet-500 font-bold text-3xl mb-6'>All Books</h1>
    <div className='flex flex-wrap gap-5'>
        {books.map((book) => (
            <div key={book.id} className='bg-white shadow-md rounded-lg p-4 w-[300px]'>
                <img className='w-full h-[300px] object-cover rounded-t-lg mb-4' src={book.coverImageUrl} alt={`${book.title} cover`} />
                <div className='px-2'>
                    <h2 className='text-xl font-semibold text-gray-800 mb-2'>{book.title}</h2>
                    <p className='text-gray-600 mb-1'><span className='font-medium'>Author:</span> {book.author}</p>
                    <p className='text-gray-600 mb-1'><span className='font-medium'>Published:</span> {new Date(book.publishedDate.seconds * 1000).toDateString()}</p>
                    <p className='text-gray-600 mb-1'><span className='font-medium'>Genre:</span> {book.genre}</p>
                    <p className='text-gray-600 mb-4'><span className='font-medium'>Summary:</span> {book.summary}</p>
                    <p className='text-gray-500 text-sm'><span className='font-medium'>Added:</span> {new Date(book.createdAt.seconds * 1000).toDateString()}</p>
                </div>
            </div>
        ))}
    </div>
</div>

    );
};

export default Books;
