import { useEffect, useState } from 'react';
import { Box } from '@mui/material';

import { getSlotGames } from 'api';
import GameCard from 'components/game-card';
import CustomSwiper from 'components/swiper';
import { ASSETS } from 'utils/axios';

interface CustomSwiperProps {
    category: string;
    categoryName: string;
    viewCount?: number;
}

export default function ShortGames({ category, categoryName, viewCount }: CustomSwiperProps) {
    const [games, setGames] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const getGameList = async () => {
        try {
            setLoading(true);
            const gameList = await getSlotGames({
                currentPage: 1,
                perPage: 15,
                categories: category
            });

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
            category={category}
            index={category}
            loading={loading}
            data={games.map((item: any, index: number) => (
                <Box key={index} sx={{ borderRadius: 2, overflow: 'hidden' }}>
                    <GameCard key={index} image={item.image} name={item.name} href={`/ag-game/${item.id}`} />
                </Box>
            ))}
            title={categoryName}
            viewCount={viewCount ? viewCount : 8}
        />
    );
}
