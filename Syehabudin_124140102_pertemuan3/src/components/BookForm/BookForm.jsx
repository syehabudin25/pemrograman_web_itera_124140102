import './BookForm.css';
import { useState } from 'react';
import PropTypes from 'prop-types';

function BookForm({ initialBook = null, onSubmit, onCancel }) {
  const [title, setTitle] = useState(initialBook?.title ?? '');
  const [author, setAuthor] = useState(initialBook?.author ?? '');
  const [status, setStatus] = useState(initialBook?.status ?? 'milik');
  const [error, setError] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    // Menolak kolom kosong, termasuk yang hanya berisi spasi.
    if (!title.trim() || !author.trim()) {
      setError('Judul dan penulis wajib diisi.');
      return;
    }

    setError('');
    onSubmit({ title, author, status });

    // Saat menambah buku baru, kosongkan form setelah berhasil.
    if (!initialBook) {
      setTitle('');
      setAuthor('');
      setStatus('milik');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="book-form">
      <div>
        <label htmlFor="title">Judul</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="author">Penulis</label>
        <input
          id="author"
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="status">Status</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="milik">Milik</option>
          <option value="baca">Baca</option>
          <option value="beli">Beli</option>
        </select>
      </div>

      {error && (
        <p role="alert" className="form-error">
          {error}
        </p>
      )}

      <button type="submit">{initialBook ? 'Simpan' : 'Tambah Buku'}</button>
      {onCancel && (
        <button type="button" onClick={onCancel}>
          Batal
        </button>
      )}
    </form>
  );
}

BookForm.propTypes = {
  initialBook: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    author: PropTypes.string,
    status: PropTypes.oneOf(['milik', 'baca', 'beli']),
  }),
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
};

export default BookForm;
