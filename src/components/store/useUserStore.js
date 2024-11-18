// useUserStore.js
import { create } from 'zustand'; // Pastikan menggunakan curly braces

const useUserStore = create((set) => ({
    userData: null,
    isLoading: false,
    fetchUserData: async (nik) => {
        set({ isLoading: true });
        try {
            const response = await fetch(`http://localhost:8000/api/user/${nik}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            const data = await response.json();
            set({ userData: data, isLoading: false });
        } catch (error) {
            console.error('Failed to fetch user data:', error);
            set({ isLoading: false });
        }
    },
    clearUserData: () => set({ userData: null }),

    updateUserData: (newData) => set((state) => ({ userData: { ...state.userData, ...newData } })),

}));

export default useUserStore;
