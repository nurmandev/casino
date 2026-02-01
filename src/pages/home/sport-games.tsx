import { useEffect, useState } from 'react';
import { getSlotGames } from 'api';
import { Box } from '@mui/material';

import CustomSwiper from 'components/swiper';
import GameCard from 'components/game-card';
import { ASSETS } from 'utils/axios';
import MatchCard from 'components/match-card';

interface CustomSwiperProps {
    category: string;
    categoryName: string;
    viewCount?: number;
}

export const SportGames = ({ category, categoryName, viewCount }: CustomSwiperProps) => {
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
                    <MatchCard
                        tournament="Soccer • Copa America"
                        timeInfo="10 min play"
                        isLive={true}
                        homeTeam={{ name: 'Guatemala', shirtColor: '#4FC3F7' }}
                        awayTeam={{ name: 'Haiti', shirtColor: '#283593' }}
                        score="0:0"
                        half="1st half"
                        odds={{ home: 1.5, draw: 3.3, away: 7.25, extra: 5 }}
                    />
                </Box>
            ))}
            title={categoryName}
            viewCount={viewCount ? viewCount : 6}
        />
    );
};
