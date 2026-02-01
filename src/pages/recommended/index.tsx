import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Stack, IconButton, Typography, Grid, Skeleton } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
// components
import GameCard from 'components/game-card';
// store
import { useSelector } from 'store/store';
// utils
import { ASSETS } from 'utils/axios';
// locales
import { useTranslate } from 'locales';

const RecommendGameList = () => {
    const navigate = useNavigate();
    const { t } = useTranslate();
    const { recommendGames } = useSelector((state) => state.setting);

    const [loading] = useState(false);

    return (
        <>
            <Stack flexDirection="row" gap={2} alignItems="center">
                <IconButton
                    size="small"
                    sx={{ bgcolor: 'background.button1', borderRadius: 2 }}
                    onClick={() => navigate(-1)}
                >
                    <KeyboardArrowLeftIcon />
                </IconButton>
                <Typography variant="h6">{t(`recommended_games`)}</Typography>
            </Stack>
            <Grid
                container
                spacing={1}
                sx={{
                    mt: 4,
                    display: recommendGames.length > 0 || loading ? 'grid' : 'flex',
                    gridTemplateColumns: {
                        xs: 'repeat(3, 1fr)',
                        sm: 'repeat(5, 1fr)',
                        md: 'repeat(8, 1fr)'
                    }
                }}
            >
                {loading ? (
                    new Array(40).fill(null).map((_, index: number) => (
                        <Skeleton
                            key={index}
                            width="100%"
                            height="162px"
                            sx={{
                                bgcolor: 'background.button1'
                            }}
                        />
                    ))
                ) : recommendGames.length > 0 ? (
                    recommendGames.map((item: any, index: number) => (
                        <GameCard
                            key={index}
                            name={item.game_name}
                            image={item.ownImg ? ASSETS(item.ownImg) : item.image_url}
                            href={`/game/${item.game_code}`}
                        />
                    ))
                ) : (
                    <Stack
                        sx={{
                            py: 10,
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: 1
                        }}
                    >
                        No Items
                    </Stack>
                )}
            </Grid>
        </>
    );
};

export default RecommendGameList;
