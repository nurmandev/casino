import { useEffect, useState } from 'react';
import { getProviderGameList } from 'api';
import { Box } from '@mui/material';

import CustomSwiper from 'components/swiper';
import GameCard from 'components/game-card';

import { ASSETS } from 'utils/axios';

interface CustomSwiperProps {
    category: any; // Allow string (from swiperArray) or array (productIds)
    categoryName: string;
    viewCount?: number;
    gameType?: string;
}

export const GSCGames = ({ category, categoryName, viewCount, gameType = 'SLOT' }: CustomSwiperProps) => {
    const [games, setGames] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const getGameList = async () => {
        try {
            setLoading(true);

            const query: any = {
                currentPage: 1,
                perPage: 30,
                gameType: gameType,
                productIds: Array.isArray(category) ? category : []
            };

            const gameList = await getProviderGameList(query);

            if (gameList && gameList.data) {
                setGames(gameList.data);
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
            index={categoryName}
            category={categoryName}
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
