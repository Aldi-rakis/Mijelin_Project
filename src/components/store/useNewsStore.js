// useBeritaStore.js
import { create } from 'zustand';

const useBeritaStore = create((set) => ({
  berita: [],
  isLoading: false,
  fetchBerita: async () => {
    set({ isLoading: true });
    try {
      const response = await fetch('https://backend-laravel.mijelin.my.id/api/news/'); // Ganti dengan URL API Anda
      const result = await response.json();

      // Jika data API dalam bentuk array di root
      const beritaArray = Array.isArray(result) ? result : result.data;

      // Mengurutkan berdasarkan tanggal terbaru
      const sortedBerita = beritaArray.sort((a, b) => new Date(b.date) - new Date(a.date));

      // Simpan semua berita yang telah diurutkan di Zustand (tanpa slicing)
      set({ berita: sortedBerita, isLoading: false });
    } catch (error) {
      console.error('Error fetching data:', error);
      set({ isLoading: false });
    }
  },
}));

export default useBeritaStore;
