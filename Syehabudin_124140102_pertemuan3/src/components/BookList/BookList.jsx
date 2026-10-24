import './BookList.css';
import { useState } from 'react';
import PropTypes from 'prop-types';
import BookItem from '../BookItem/BookItem';
import BookForm from '../BookForm/BookForm';

function BookList({ books, onUpdate, onDelete }) {
  // Menyimpan ID buku yang sedang diedit (null = tidak ada).
  const [editingId, setEditingId] = useState(null);

  if (books.length === 0) {
    return <p>Belum ada buku yang cocok.</p>;
  }

  return (
    <ul className="book-list">
      {books.map((book) =>
        book.id === editingId ? (
          <li key={book.id}>
            <BookForm
              initialBook={book}
              onSubmit={(data) => {
                onUpdate(book.id, data);
                setEditingId(null);
              }}
              onCancel={() => setEditingId(null)}
            />
          </li>
        ) : (
          <BookItem
            key={book.id}
            book={book}
            onEdit={setEditingId}
            onDelete={onDelete}
          />
        )
      )}
    </ul>
  );
}

BookList.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
    })
  ).isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default BookList;
