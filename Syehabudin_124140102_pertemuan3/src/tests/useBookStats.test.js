import { renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import useBookStats from '../hooks/useBookStats';

describe('useBookStats', () => {
  it('menghitung total dan jumlah per status', () => {
    const books = [
      { id: '1', title: 'A', author: 'X', status: 'milik' },
      { id: '2', title: 'B', author: 'Y', status: 'baca' },
      { id: '3', title: 'C', author: 'Z', status: 'baca' },
    ];
    const { result } = renderHook(() => useBookStats(books));
    expect(result.current).toEqual({ total: 3, milik: 1, baca: 2, beli: 0 });
  });
});
