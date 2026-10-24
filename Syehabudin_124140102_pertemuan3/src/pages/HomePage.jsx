import { useState } from 'react';
import { useBooks } from '../context/BookContext';
import BookForm from '../components/BookForm/BookForm';
import BookList from '../components/BookList/BookList';
import BookFilter from '../components/BookFilter/BookFilter';
import SearchBar from '../components/SearchBar/SearchBar';

function HomePage() {
  const { books, addBook, updateBook, deleteBook } = useBooks();
  const [statusFilter, setStatusFilter] = useState('semua');
  const [keyword, setKeyword] = useState('');

  // Menyaring buku berdasarkan status, lalu judul atau penulis.
  const visibleBooks = books.filter((book) => {
    const matchStatus = statusFilter === 'semua' || book.status === statusFilter;
    const key = keyword.trim().toLowerCase();
    const matchKeyword =
      key === '' ||
      book.title.toLowerCase().includes(key) ||
      book.author.toLowerCase().includes(key);
    return matchStatus && matchKeyword;
  });

  return (
    <section>
      <h2>Daftar Buku</h2>
      <BookForm onSubmit={addBook} />
      <hr />
      <SearchBar value={keyword} onChange={setKeyword} />
      <BookFilter value={statusFilter} onChange={setStatusFilter} />
      <BookList
        books={visibleBooks}
        onUpdate={updateBook}
        onDelete={deleteBook}
      />
    </section>
  );
}

export default HomePage;
