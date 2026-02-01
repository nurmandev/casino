import React, { useEffect, useRef, useState } from 'react';
import {
    Box,
    Button,
    Chip,
    Grid,
    InputAdornment,
    Paper,
    Skeleton,
    Stack,
    Tab,
    Tabs,
    TextField,
    Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Banner from 'components/banner';
import { tabs } from 'data';
import { usePathname, useRouter } from 'routes/hook';
import { swiperArray } from 'config/constant';

import Casino from './casino';
import Lobby from './lobby';
import Slots from './slots';
import { useTranslate } from 'locales';
import { SearchIcon } from 'icons';
import { SUGGESTED } from 'config';
import Search from './search';
import { IGameList } from 'pages/explore';
import EmptyData from 'components/empty-data';
import GameCard from 'components/game-card';

const StyledTabs = styled(Tabs)(({ theme }) => ({
    marginTop: 16,
    minHeight: '40px',
    width: '100%',
    overflow: 'hidden',
    borderRadius: 7,
    scrollButtons: 'auto',
    '& .MuiTabs-indicator': {
        height: '100%',
        backgroundColor: theme.palette.background.tab,
        borderRadius: 7
    },
    '& .MuiTabs-scrollButtons': {
        display: 'none'
    }
}));

const StyledTab = styled(Tab)(({ theme }) => ({
    minHeight: '40px',
    padding: '0px 8px',
    borderRadius: 7,
    textTransform: 'none',
    fontWeight: 600,
    fontSize: '14px',
    lineHeight: 1,
    color: theme.palette.text.secondary,
    zIndex: 1,
    '&.Mui-selected': {
        color: theme.palette.text.primary,
        '& .MuiTab-iconWrapper img': {
            filter: 'brightness(0) saturate(100%) invert(83%) sepia(40%) saturate(1593%) hue-rotate(101deg) brightness(97%) contrast(94%)'
        }
    },
    '&:not(:last-of-type)': {
        marginRight: 0
    },
    '& .MuiTab-iconWrapper': {
        marginRight: '2px',
        marginBottom: 0,
        '& img': {
            filter: 'brightness(0) saturate(100%) invert(42%) sepia(9%) saturate(498%) hue-rotate(167deg) brightness(94%) contrast(89%)'
        }
    }
}));

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div role="tabpanel" hidden={value !== index} {...other}>
            {value === index && <Box>{children}</Box>}
        </div>
    );
}

const CasinoPage = () => {
    const pathname = usePathname();
    const { t } = useTranslate();
    const [loading, setLoading] = useState(false);
    const [gameList, setGameList] = useState<IGameList[]>([]);
    const [search, setSearch] = useState('');

    const tabIndex = tabs.findIndex((tab) => tab.value === pathname.replace('/casino/', ''));

    const initialTabIndex = tabIndex === -1 ? 0 : tabIndex;

    const [value, setValue] = useState<number>(initialTabIndex);

    useEffect(() => {
        setValue(initialTabIndex);
    }, [initialTabIndex]);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        setSearch('');
    };
    const handleClose = () => {
        setSearch('');
    };
    return (
        <Box sx={{ py: 3 }}>
            <Banner />
            <Search search={search} setSearch={setSearch} setGameList={setGameList} setLoading={setLoading} />
            <StyledTabs value={value} onChange={handleChange}>
                {tabs.map((item, index) => (
                    <StyledTab key={`tab-${index}-${item.label}`} label={t(`${item.label}`)} icon={item.icon} iconPosition="start" />
                ))}
            </StyledTabs>
            {search.length > 2 ? (
                <Grid
                    container
                    spacing={1}
                    sx={{
                        display: gameList.length > 0 || loading ? 'grid' : 'flex',
                        gridTemplateColumns: { xs: 'repeat(3, 1fr)', sm: 'repeat(5, 1fr)', md: 'repeat(8, 1fr)' },
                        marginTop: '1rem'
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
                    ) : gameList.length > 0 ? (
                        gameList.map((item, index: number) => (
                            <Stack onClick={handleClose} key={`games-${index}`}>
                                <GameCard
                                    key={index}
                                    image={item.image}
                                    name={item.name}
                                    href={`/ag-game/${item.id}`}
                                />
                            </Stack>
                        ))
                    ) : (
                        <Stack sx={{ width: 1, height: 1 }}>
                            <EmptyData />
                        </Stack>
                    )}
                </Grid>
            ) : (
                <>
                    <TabPanel value={value} index={0}>
                        <Lobby />
                    </TabPanel>

                    {swiperArray.map((category, index) => {
                        const k = (category as any).key ?? (category as any).value ?? index;
                        return category.value === 'Slots' || category.value === 'Hot Game' ? (
                            <TabPanel key={`panel-${k}`} value={value} index={index + 1}>
                                <Slots gameType={(category as any).key} />
                            </TabPanel>
                        ) : (
                            <TabPanel key={`panel-${k}`} value={value} index={index + 1}>
                                <Casino gameType={(category as any).key} />
                            </TabPanel>
                        );
                    })}
                </>
            )}
        </Box>
    );
};

export default CasinoPage;
