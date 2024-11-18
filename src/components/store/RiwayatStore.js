// useRiwayatStore.js
import { create } from 'zustand';

const useRiwayatStore = create((set) => ({
    RiwayatData: {
        setor: [],
        penukaran: []
    },
    isLoading: false,
    fetchRiwayatSetor: async (uuid, token) => {
        set({ isLoading: true });
        try {
            const response = await fetch(`http://localhost:8000/api/oil-transactions-byNIK?uuid=${uuid}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await response.json();
            const formattedSetorData = data.transactions.map((item) => {
                const volume = item.weight < 1000 ? `${item.weight} gram` : `${(item.weight / 1000).toFixed(1)} kg`;
                return {
                    id: item.id,
                    volume,
                    status: item.points_earned > 0 ? 'Sukses' : 'Proses',
                    points: `${item.points_earned} Poin`,
                    time: item.created_at
                };
            });
            set((state) => ({
                RiwayatData: { ...state.RiwayatData, setor: formattedSetorData },
                isLoading: false
            }));
        } catch (error) {
            console.error('Failed to fetch Setor data:', error);
            set({ isLoading: false });
        }
    },
    fetchRiwayatPenukaran: async (nik, token) => {
        set({ isLoading: true });
        try {
            const response = await fetch(`http://localhost:8000/api/reward-redemptions/${nik}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await response.json();
            const formattedPenukaranData = data.map((item) => ({
                id: item.id,
                name: item.nama_reward,
                status: item.points_ditukarkan < 0 ? 'Proses' : 'Sukses',
                points: `${item.points_ditukarkan} Poin`,
                time: item.waktu
            }));
            set((state) => ({
                RiwayatData: { ...state.RiwayatData, penukaran: formattedPenukaranData },
                isLoading: false
            }));
        } catch (error) {
            console.error('Failed to fetch Penukaran data:', error);
            set({ isLoading: false });
        }
    },
    clearRiwayatData: () => set({ RiwayatData: { setor: [], penukaran: [] } })
}));

export default useRiwayatStore;
