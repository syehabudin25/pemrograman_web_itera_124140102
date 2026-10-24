import PropTypes from 'prop-types';

function BookItem({ book, onEdit, onDelete }) {
  return (
    <li className="book-item">
      <div>
        <strong>{book.title}</strong>
        <p>{book.author}</p>
        <span className={`badge badge-${book.status}`}>{book.status}</span>
      </div>
      <div>
        <button type="button" onClick={() => onEdit(book.id)}>
          Edit
        </button>
        <button type="button" onClick={() => onDelete(book.id)}>
          Hapus
        </button>
      </div>
    </li>
  );
}

BookItem.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    status: PropTypes.oneOf(['milik', 'baca', 'beli']).isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default BookItem;
