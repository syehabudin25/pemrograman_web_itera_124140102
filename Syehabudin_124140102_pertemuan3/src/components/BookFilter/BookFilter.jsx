import './BookFilter.css';
import PropTypes from 'prop-types';

function BookFilter({ value, onChange }) {
  return (
    <div>
      <label htmlFor="filter">Filter status</label>
      <select
        id="filter"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="semua">Semua</option>
        <option value="milik">Milik</option>
        <option value="baca">Baca</option>
        <option value="beli">Beli</option>
      </select>
    </div>
  );
}

BookFilter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default BookFilter;
