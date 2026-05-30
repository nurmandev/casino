import { useEffect, useState } from 'react';
import { getSlotGames } from 'api';
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
            const query: any = {
                currentPage: 1,
                perPage: 30,
                categories: category
            };

            const gameList = await getSlotGames(query);
            setGames(gameList.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getGameList();
    }, []);
    return (
        <CustomSwiper
            index={category}
            category={category}
            loading={loading}
            data={games.map((item: any, index: number) => (
                <Box
                    key={index}
                    sx={{
                        borderRadius: 2,
                        overflow: 'hidden'
                    }}
                >
                    <GameCard key={index} image={item.image} name={item.name} href={`/ag-game/${item.id}`} />
                </Box>
            ))}
            title={categoryName}
            viewCount={viewCount ? viewCount : 6}
        />
    );
};
