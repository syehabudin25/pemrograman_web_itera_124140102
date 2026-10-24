import { useBooks } from '../context/BookContext';

function StatsPage() {
  const { stats } = useBooks();

  return (
    <section>
      <h2>Statistik Buku</h2>
      <ul>
        <li>Total buku: {stats.total}</li>
        <li>Milik: {stats.milik}</li>
        <li>Sedang dibaca: {stats.baca}</li>
        <li>Ingin dibeli: {stats.beli}</li>
      </ul>
    </section>
  );
}

export default StatsPage;
