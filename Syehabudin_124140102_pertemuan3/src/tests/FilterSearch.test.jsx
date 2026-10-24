import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import BookFilter from '../components/BookFilter/BookFilter';
import SearchBar from '../components/SearchBar/SearchBar';

describe('BookFilter dan SearchBar', () => {
  it('BookFilter mengirim status yang dipilih', () => {
    const handleChange = vi.fn();
    render(<BookFilter value="semua" onChange={handleChange} />);
    fireEvent.change(screen.getByLabelText('Filter status'), { target: { value: 'baca' } });
    expect(handleChange).toHaveBeenCalledWith('baca');
  });

  it('SearchBar mengirim kata kunci yang diketik', () => {
    const handleChange = vi.fn();
    render(<SearchBar value="" onChange={handleChange} />);
    fireEvent.change(screen.getByLabelText('Cari buku'), { target: { value: 'bumi' } });
    expect(handleChange).toHaveBeenCalledWith('bumi');
  });
});
