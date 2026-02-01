import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams, useParams } from 'react-router-dom';
import { Stack, IconButton, Typography, Grid, Skeleton } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import GameCard from 'components/game-card';
import Pagination from 'components/pagination';
import { MultiSelect } from 'components/multi-select';
import { SortSelect } from 'components/sort-select';
import { getGamesBySearch, getProviderGameList, getProviderList, getSlotGames, getSlotProviders } from 'api';
import { providerType } from 'types/game';
import { ASSETS } from 'utils/axios';

const sortList = ['Popular', 'A-Z', 'Z-A', 'New'];

const GameList = () => {
    const navigate = useNavigate();
    const { gameType } = useParams();
    const [searchParams] = useSearchParams();
    const typeParam = searchParams.get('type');

    const [selectedSort, setSelectedSort] = useState(sortList[0]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(10);
    const [provider, setProvider] = useState(['All']);
    const [providerList, setProviderList] = useState<string[]>([]);
    const [games, setGames] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const selectList = useMemo(() => {
        return providerList.map((item) => ({ value: `${item}`, label: item }));
    }, [providerList]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleProvider = (values: string[]) => {
        setProvider(values);
        setCurrentPage(1);
    };

    const getProviders = async () => {
        try {
            const response = await getSlotProviders(gameType === 'OTHER' ? '' : gameType || '');
            console.log(response);
            setProviderList(response);
        } catch (error) {
            console.log(error);
        } finally {
        }
    };

    const getGameList = async () => {
        try {
            setLoading(true);

            let type = '';
            if (gameType === 'live') type = 'LIVE_CASINO';
            else if (gameType === 'fish') type = 'FISHING';
            else if (gameType === 'poker') type = 'POKER';
            else if (gameType === 'OTHER')
                type = 'OTHERS'; // Check static.ts for correct type
            else type = gameType || ''; // Fallback

            // Use getGamesBySearch (GSC) instead of getSlotGames (AG)
            // searchGames argument signature: name, gameType, currentPage, perPage
            const response = await getGamesBySearch('', type, currentPage, 40);

            if (response && response.data) {
                setGames(response.data);
                setTotalPages(Math.ceil(response.count / 40));
            } else {
                setGames([]);
                setTotalPages(1);
            }
        } catch (error) {
            console.log(error);
            setGames([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getGameList();
    }, [provider, currentPage, gameType]);

    useEffect(() => {
        if (gameType) {
            getProviders();
        }
    }, [gameType]);

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
                <Typography variant="h6">{typeParam}</Typography>
            </Stack>
            <Stack flexDirection="row" gap={2} alignItems="center" mt={2}>
                <SortSelect
                    size="small"
                    value={selectedSort}
                    sortList={sortList}
                    width={300}
                    setSelectedValue={setSelectedSort}
                />
                <MultiSelect
                    size="small"
                    placeholder="Providers"
                    selectedValues={provider}
                    selectValues={handleProvider}
                    list={selectList}
                />
            </Stack>
            <Grid
                container
                spacing={1}
                sx={{
                    mt: 4,
                    display: games.length > 0 || loading ? 'grid' : 'flex',
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
                ) : games.length > 0 ? (
                    games.map((item: any, index: number) => (
                        <GameCard
                            key={index}
                            image={item.ownImg ? ASSETS(item.ownImg) : item.image_url}
                            name={item.game_name}
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
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </>
    );
};

export default GameList;
