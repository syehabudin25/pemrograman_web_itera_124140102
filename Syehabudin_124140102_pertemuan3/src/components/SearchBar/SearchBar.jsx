import PropTypes from 'prop-types';

function SearchBar({ value, onChange }) {
  return (
    <div>
      <label htmlFor="search">Cari buku</label>
      <input
        id="search"
        type="text"
        placeholder="Judul atau penulis"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SearchBar;
