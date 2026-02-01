import { useEffect, useState } from 'react';
import { getGamesBySearch } from 'api';
import { Box } from '@mui/material';

import CustomSwiper from 'components/swiper';
import GameCard from 'components/game-card';
import { ASSETS } from 'utils/axios';

interface CustomSwiperProps {
    category: string;
    categoryName: string;
    viewCount?: number;
}

export const SlotGames = ({ category, categoryName, viewCount }: CustomSwiperProps) => {
    const [games, setGames] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const getGameList = async () => {
        try {
            setLoading(true);

            let gameType = category;
            if (category === 'slots') gameType = 'SLOT';
            if (category === 'fish') gameType = 'FISHING';
            if (category === 'poker') gameType = 'POKER';
            if (category === 'hot') gameType = ''; // 'hot' isn't a type, treat as generic or handle differently

            const gameList = await getGamesBySearch('', gameType, 1, 30);

            if (gameList && gameList.data) {
                setGames(gameList.data);
            } else if (gameList) {
                // handle if response array is directly returned in some cases?
                // searchGames returns { data, count } usually.
                setGames(gameList.data || []);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getGameList();
    }, [category]); // Depend on category

    return (
        <CustomSwiper
            index={category}
            category={category}
            loading={loading}
            data={
                Array.isArray(games)
                    ? games.map((item: any, index: number) => (
                          <Box
                              key={index}
                              sx={{
                                  borderRadius: 2,
                                  overflow: 'hidden'
                              }}
                          >
                              <GameCard
                                  key={index}
                                  image={item.ownImg ? ASSETS(item.ownImg) : item.image_url}
                                  name={item.game_name}
                                  href={`/game/${item.game_code}`}
                              />
                          </Box>
                      ))
                    : []
            }
            title={categoryName}
            viewCount={viewCount ? viewCount : 6}
        />
    );
};
