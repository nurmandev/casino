import axios from 'utils/axios';

export const playerApi = {
    getPlayerGames: async () => {
        const res = await axios.get('/api/player/my-games');
        return res.data;
    }
};
