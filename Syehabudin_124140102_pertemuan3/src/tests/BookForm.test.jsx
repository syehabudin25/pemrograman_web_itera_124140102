import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import BookForm from '../components/BookForm/BookForm';

describe('BookForm', () => {
  it('menampilkan pesan error jika kolom kosong', () => {
    render(<BookForm onSubmit={vi.fn()} />);
    fireEvent.click(screen.getByRole('button', { name: 'Tambah Buku' }));
    expect(screen.getByRole('alert')).toHaveTextContent('wajib diisi');
  });

  it('memanggil onSubmit jika data valid', () => {
    const handleSubmit = vi.fn();
    render(<BookForm onSubmit={handleSubmit} />);
    fireEvent.change(screen.getByLabelText('Judul'), { target: { value: 'Laskar Pelangi' } });
    fireEvent.change(screen.getByLabelText('Penulis'), { target: { value: 'Andrea Hirata' } });
    fireEvent.click(screen.getByRole('button', { name: 'Tambah Buku' }));
    expect(handleSubmit).toHaveBeenCalledWith({
      title: 'Laskar Pelangi',
      author: 'Andrea Hirata',
      status: 'milik',
    });
  });
});
