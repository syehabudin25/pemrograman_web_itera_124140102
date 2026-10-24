import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import BookItem from '../components/BookItem/BookItem';

const book = { id: '1', title: 'Bumi', author: 'Tere Liye', status: 'beli' };

describe('BookItem', () => {
  it('menampilkan judul, penulis, dan status', () => {
    render(<BookItem book={book} onEdit={vi.fn()} onDelete={vi.fn()} />);
    expect(screen.getByText('Bumi')).toBeInTheDocument();
    expect(screen.getByText('Tere Liye')).toBeInTheDocument();
    expect(screen.getByText('beli')).toBeInTheDocument();
  });

  it('memanggil onDelete saat tombol Hapus diklik', () => {
    const handleDelete = vi.fn();
    render(<BookItem book={book} onEdit={vi.fn()} onDelete={handleDelete} />);
    fireEvent.click(screen.getByRole('button', { name: 'Hapus' }));
    expect(handleDelete).toHaveBeenCalledWith('1');
  });
});
