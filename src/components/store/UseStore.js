// useUserStore.js
import { create } from 'zustand'; // Pastikan menggunakan curly braces
import axios from 'axios';

const useUserStore = create((set) => ({
  userData: {}, // State untuk menyimpan data user
  fetchUserData: async (token, navigate) => {
    try {
      const response = await axios.get('http://localhost:8000/api/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({ userData: response.data }); // Set data user dari API
    } catch (error) {
      console.error('Error fetching user data:', error);
      navigate('/login'); // Arahkan ke login jika terjadi error
    }
  },
}));



export default useUserStore;
