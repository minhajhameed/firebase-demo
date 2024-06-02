"use client"

import { useState } from 'react';
import { addBook } from '@/lib/actions/book.actions';
import { Book } from '@/lib/models/book.model';
import { Timestamp } from 'firebase/firestore';
import Link from 'next/link';

const AddBook = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publishedDate, setPublishedDate] = useState('');
    const [genre, setGenre] = useState('');
    const [summary, setSummary] = useState('');
    const [coverImageUrl, setCoverImageUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleAddBook = async () => {
        if (!title || !author || !publishedDate || !genre || !summary || !coverImageUrl) {
            setError('All fields are required');
            return;
        }

        setLoading(true);
        setError('');
        setSuccess('');

        const newBook: Book = {
            title,
            author,
            publishedDate: Timestamp.fromDate(new Date(publishedDate)),
            genre,
            summary,
            coverImageUrl,
            createdAt: Timestamp.now(),
        };

        try {
            await addBook(newBook);
            setSuccess('Book added successfully');
            setTitle('');
            setAuthor('');
            setPublishedDate('');
            setGenre('');
            setSummary('');
            setCoverImageUrl('');
        } catch (e) {
            if (e instanceof Error) {
                setError('Error adding book: ' + e.message);
            } else {
                setError('Error adding book: An unknown error occurred');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-4 bg-white shadow-md rounded-lg">

            <h2 className="text-2xl font-bold mb-4">Add a New Book</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {success && <p className="text-green-500 mb-4">{success}</p>}
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                className="w-full p-2 mb-4 border border-gray-300 rounded"
            />
            <input
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Author"
                className="w-full p-2 mb-4 border border-gray-300 rounded"
            />
            <input
                type="date"
                value={publishedDate}
                onChange={(e) => setPublishedDate(e.target.value)}
                placeholder="Published Date"
                className="w-full p-2 mb-4 border border-gray-300 rounded"
            />
            <input
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                placeholder="Genre"
                className="w-full p-2 mb-4 border border-gray-300 rounded"
            />
            <textarea
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="Summary"
                className="w-full p-2 mb-4 border border-gray-300 rounded"
            ></textarea>
            <input
                value={coverImageUrl}
                onChange={(e) => setCoverImageUrl(e.target.value)}
                placeholder="Cover Image URL"
                className="w-full p-2 mb-4 border border-gray-300 rounded"
            />
            <button
                onClick={handleAddBook}
                disabled={loading}
                className={`w-full p-2 bg-violet-500 text-white font-bold rounded ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-violet-600'}`}
            >
                {loading ? 'Adding...' : 'Add Book'}
            </button>
        </div>
    );
};

export default AddBook;
