import axios from 'utils/axios';

/**
 * Play CoinFlip game
 * @param betAmount - Amount to bet
 * @param choice - User's choice ('heads' or 'tails')
 * @returns Game result
 */
export const playCoinFlip = async (betAmount: number, choice: 'heads' | 'tails') => {
    const res = await axios.post('/api/offline-game/coinflip/play', { betAmount, choice });
    return res.data;
};

/**
 * Play Dice game
 * @param betAmount - Amount to bet
 * @param rollOver - Target roll value (2-98)
 * @returns Game result
 */
export const playDice = async (betAmount: number, rollOver: number) => {
    const res = await axios.post('/api/offline-game/dice/play', { betAmount, rollOver });
    return res.data;
};

/**
 * Play HiLo game
 * @param betAmount - Amount to bet
 * @param choice - User's choice ('higher', 'lower', or 'skip')
 * @param currentCardNumber - Current card number (1-13)
 * @returns Game result
 */
export const playHiLo = async (betAmount: number, choice: 'higher' | 'lower' | 'skip', currentCardNumber: number) => {
    const res = await axios.post('/api/offline-game/hilo/play', { betAmount, choice, currentCardNumber });
    return res.data;
};

/**
 * Get bet history for a specific game type
 * @param gameType - Type of game
 * @param limit - Number of records to return
 * @returns Array of bet records
 */
export const getGameHistory = async (gameType: string, limit: number = 5) => {
    const res = await axios.get(`/api/offline-game/${gameType}/history`, {
        params: { limit }
    });
    return res.data;
};

/**
 * Get all bet history across all games
 * @param limit - Number of records to return
 * @returns Array of bet records
 */
export const getAllGameHistory = async (limit: number = 10) => {
    const res = await axios.get('/api/offline-game/history', {
        params: { limit }
    });
    return res.data;
};

export const startMines = async (betAmount: number, mineCount: number) => {
    const res = await axios.post('/api/offline-game/mines/start', { betAmount, mineCount });
    return res.data;
};

export const clickMinesTile = async (tileIndex: number) => {
    const res = await axios.post('/api/offline-game/mines/click', { tileIndex });
    return res.data;
};

export const cashoutMines = async () => {
    const res = await axios.post('/api/offline-game/mines/cashout');
    return res.data;
};

export const getActiveMinesGame = async () => {
    const res = await axios.get('/api/offline-game/mines/active');
    return res.data;
};

export const playRoulette = async (bets: Record<string, number>) => {
    const res = await axios.post('/api/offline-game/roulette/play', { bets });
    return res.data;
};
