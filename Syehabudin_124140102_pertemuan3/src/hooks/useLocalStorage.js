import { useEffect, useState } from 'react';

function useLocalStorage(key, initialValue) {
  // Membaca data yang tersimpan saat aplikasi dibuka.
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved === null ? initialValue : JSON.parse(saved);
    } catch (error) {
      console.error('Gagal membaca data:', error);
      return initialValue;
    }
  });

  // Menyimpan data setiap kali nilainya berubah.
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Gagal menyimpan data:', error);
    }
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorage;
