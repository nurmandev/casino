import { useEffect, useState } from 'react';
import { getSlotGames } from 'api';
import { Box } from '@mui/material';

import CustomSwiper from 'components/swiper';
import GameCard from 'components/game-card';
import { ASSETS } from 'utils/axios';
import mineThumbnail from 'assets/mineThumbnail.png';
import diceThumbnail from 'assets/diceThumbnail.png';
import hiloThumbnail from 'assets/hiloThumbnail.png';
import rouletteThumbnail from 'assets/images/roulette.png';
import coinflipThumbnail from 'assets/images/coinflip.png';
interface CustomSwiperProps {
    categoryName: string;
    viewCount?: number;
}

export const OfflineGames = ({ categoryName, viewCount }: CustomSwiperProps) => {
    const games = [
        {
            image: mineThumbnail,
            name: 'Mine',
            link: '/offline-games/mines'
        },
        {
            image: diceThumbnail,
            name: 'Dice',
            link: '/offline-games/dice'
        },
        {
            image: hiloThumbnail,
            name: 'HiLo',
            link: '/offline-games/hilo'
        },
        {
            name: 'CoinFlip',
            image: coinflipThumbnail,
            link: '/offline-games/coinflip'
        },
        {
            image: rouletteThumbnail,
            name: 'Roulette',
            link: '/offline-games/roulette'
        }
    ];

    return (
        <CustomSwiper
            index={categoryName}
            category={categoryName}
            loading={false}
            data={games.map((item: any, index: number) => (
                <Box
                    key={index}
                    sx={{
                        borderRadius: 2,
                        overflow: 'hidden'
                    }}
                >
                    <GameCard key={index} image={item.image} name={item.name} href={item.link} />
                </Box>
            ))}
            title={categoryName}
            viewCount={viewCount ? viewCount : 6}
        />
    );
};
