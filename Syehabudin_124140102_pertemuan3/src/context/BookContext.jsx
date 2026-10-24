import { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import useLocalStorage from '../hooks/useLocalStorage';
import useBookStats from '../hooks/useBookStats';

const BookContext = createContext(null);

export function BookProvider({ children }) {
  const [books, setBooks] = useLocalStorage('syehab_books', []);
  const stats = useBookStats(books);

  // Menambah buku dengan ID unik.
  function addBook(data) {
    const newBook = {
      id: crypto.randomUUID(),
      title: data.title.trim(),
      author: data.author.trim(),
      status: data.status,
    };

    setBooks((previous) => [...previous, newBook]);
  }

  // Memperbarui buku tanpa mengubah ID-nya.
  function updateBook(id, data) {
    setBooks((previous) =>
      previous.map((book) =>
        book.id === id
          ? {
              ...book,
              title: data.title.trim(),
              author: data.author.trim(),
              status: data.status,
            }
          : book
      )
    );
  }

  function deleteBook(id) {
    setBooks((previous) => previous.filter((book) => book.id !== id));
  }

  return (
    <BookContext.Provider
      value={{ books, stats, addBook, updateBook, deleteBook }}
    >
      {children}
    </BookContext.Provider>
  );
}

BookProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Digunakan komponen untuk mengakses data dan fungsi buku.
export function useBooks() {
  const context = useContext(BookContext);

  if (context === null) {
    throw new Error('useBooks harus digunakan di dalam BookProvider.');
  }

  return context;
}