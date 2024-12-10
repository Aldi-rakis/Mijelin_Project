import { create } from 'zustand';
import axios from 'axios';

const useRewardStore = create((set) => ({
  rewards: [], // State untuk menyimpan data rewards
  fetchRewards: async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/rewards');
      set({ rewards: response.data }); // Update state rewards dengan data dari API
      console.log(response.data);
    } catch (error) {
      console.error('Failed to fetch rewards:', error);
    }
  },
}));

export default useRewardStore;
