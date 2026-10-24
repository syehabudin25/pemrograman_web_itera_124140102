import { useMemo } from 'react';

function useBookStats(books) {
  // Menghitung ulang statistik ketika daftar buku berubah.
  return useMemo(() => {
    const milik = books.filter((book) => book.status === 'milik').length;
    const baca = books.filter((book) => book.status === 'baca').length;
    const beli = books.filter((book) => book.status === 'beli').length;

    return {
      total: books.length,
      milik,
      baca,
      beli,
    };
  }, [books]);
}

export default useBookStats;