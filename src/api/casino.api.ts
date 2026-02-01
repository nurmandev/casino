import axios from 'utils/axios';

export const casinoApi = {
    getRecommendGames: async () => {
        const res = await axios.get('/api/casino/ag-recommend');
        return res.data;
    },
    getRecentBigWin: async () => {
        const res = await axios.get('/api/casino/ag-recent-big-win');
        return res.data;
    }
};
