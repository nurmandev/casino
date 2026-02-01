import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { Avatar, Box, IconButton, Paper, Stack, Typography } from '@mui/material';
import EmptyData from 'components/empty-data';
import { useAuth } from 'hooks/use-auth-context';
import { useSelector } from 'store/store';
import { ASSETS } from 'utils/axios';

const commonPaperStyles = {
    p: 1.5,
    bgcolor: 'background.layer2',
    borderRadius: 3
};

const commonHeaderStyles = {
    mb: 1.5,
    fontSize: 14
};

const commonStatBoxStyles = {
    height: '4.375rem',
    bgcolor: 'background.layer5',
    borderRadius: 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    pt: 1,
    overflow: 'hidden'
};

const Profile = ({ setOpen }: { setOpen: (open: string | null) => void }) => {
    const { user } = useAuth();

    return (
        <Stack direction="column" gap={0.5} sx={{ position: 'relative' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar
                    src={ASSETS(user.avatar)}
                    sx={{
                        width: 64,
                        height: 64,
                        border: '2px solid',
                        borderColor: 'secondary.main',
                        cursor: { sm: 'pointer' }
                    }}
                />
                <Typography variant="h5" sx={{ mt: 1, display: 'flex', justifyContent: 'center', width: '100%' }}>
                    {user.username}
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: 14,
                        color: 'text.secondary',
                        cursor: 'pointer'
                    }}
                >
                    <Typography variant="inherit">User ID:</Typography>
                    <Typography variant="inherit" sx={{ ml: 0.5 }}>
                        {user._id}
                    </Typography>
                </Box>
            </Box>

            {/* <IconButton
                sx={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bgcolor: 'background.layer1',
                    borderRadius: 2,
                    height: 32,
                    px: 1
                }}
            >
                <FavoriteIcon sx={{ color: 'error.main', width: 20, height: 20 }} />
                <Typography sx={{ ml: 0.5, fontSize: '1.125rem', fontWeight: 600 }}>0</Typography>
            </IconButton> */}

            <IconButton
                sx={{
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    bgcolor: 'background.layer1',
                    borderRadius: 2,
                    width: 32,
                    height: 32
                }}
                onClick={() => setOpen('edit-profile')}
            >
                <EditIcon sx={{ width: 20, height: 20 }} />
            </IconButton>
        </Stack>
    );
};

const Medals = ({ setOpen }: { setOpen: (open: string | null) => void }) => {
    const medals = [
        '/assets/images/medals/achieve_1-c87ad7ad.webp',
        '/assets/images/medals/achieve_2-f40a41f6.webp',
        '/assets/images/medals/achieve_3-bf42dfa3.webp',
        '/assets/images/medals/achieve_4-c845bc7e.webp',
        '/assets/images/medals/achieve_5-7e08d516.webp',
        '/assets/images/medals/achieve_6-f98836e4.webp',
        '/assets/images/medals/achieve_7-6bbaf20d.webp',
        '/assets/images/medals/achieve_8-65991297.webp',
        '/assets/images/medals/achieve_9-110f9066.webp',
        '/assets/images/medals/achieve_10-19cd9ddc.webp',
        '/assets/images/medals/achieve_11-f2a32412.webp',
        '/assets/images/medals/achieve_12-7f2dc23f.webp',
        '/assets/images/medals/achieve_13-25b97703.webp',
        '/assets/images/medals/achieve_14-c072f644.webp',
        '/assets/images/medals/achieve_15-53c0901a.webp',
        '/assets/images/medals/achieve_16-2fceb546.webp',
        '/assets/images/medals/achieve_17_ETH-4684f7c4.webp',
        '/assets/images/medals/achieve_17_BTC-a5992a94.webp',
        '/assets/images/medals/achieve_17_DOGE-894cb117.webp',
        '/assets/images/medals/achieve_17_EOS-902b23db.webp'
    ];

    return (
        <Paper sx={commonPaperStyles}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={commonHeaderStyles}>
                <Stack direction="row" alignItems="center" gap={0.5}>
                    <WorkspacePremiumIcon sx={{ fontSize: 20 }} />
                    <Typography variant="inherit" fontWeight="bold" ml={0.5}>
                        Medals{' '}
                        <Box component="span" ml={0.5}>
                            0
                        </Box>
                    </Typography>
                </Stack>

                <Stack
                    direction="row"
                    alignItems="center"
                    gap={0.5}
                    sx={{ cursor: 'pointer' }}
                    onClick={() => setOpen('master-medals')}
                >
                    <Typography variant="inherit" color="primary" fontWeight="bold">
                        Details
                    </Typography>
                    <ArrowForwardIosIcon sx={{ fontSize: 13, color: 'primary.main' }} />
                </Stack>
            </Stack>
            <Box sx={{ width: '100%', height: '1px', bgcolor: 'divider', opacity: 0.2 }} />
            <Stack
                direction="row"
                spacing={1.5}
                sx={{
                    mt: 1.5,
                    overflowX: 'auto',
                    '&::-webkit-scrollbar': { display: 'none' },
                    msOverflowStyle: 'none',
                    scrollbarWidth: 'none'
                }}
            >
                {medals.map((medal, index) => (
                    <Box
                        key={index}
                        sx={{
                            width: 44,
                            height: 60,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                            flexShrink: 0
                        }}
                    >
                        <Box
                            component="img"
                            src={medal}
                            sx={{ width: '100%', height: '100%', position: 'relative', zIndex: 1, opacity: 0.5 }}
                        />
                    </Box>
                ))}
            </Stack>
        </Paper>
    );
};

const Statistics = ({ setOpen }: { setOpen: (open: string | null) => void }) => {
    const balance = useSelector((state) => state.balance);
    const stats = [
        { icon: '/assets/icons/wins.svg', label: 'Total Wins', value: '0' },
        { icon: '/assets/icons/bet.svg', label: 'Total Bets', value: '0' },
        {
            icon: '/assets/icons/wagered.svg',
            label: 'Total Wagered',
            value: `${balance.currency}&nbsp;${balance.turnover}`
        }
    ];

    return (
        <Paper sx={commonPaperStyles}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={commonHeaderStyles}>
                <Stack direction="row" alignItems="center" gap={0.5}>
                    <AutoGraphIcon sx={{ fontSize: 20 }} />
                    <Typography variant="inherit" fontWeight="bold" ml={0.5}>
                        Statistics
                    </Typography>
                </Stack>

                <Stack
                    direction="row"
                    alignItems="center"
                    gap={0.5}
                    sx={{ cursor: 'pointer' }}
                    onClick={() => setOpen('statistics-details')}
                >
                    <Typography variant="inherit" color="primary" fontWeight="bold">
                        Details
                    </Typography>
                    <ArrowForwardIosIcon sx={{ fontSize: 13, color: 'primary.main' }} />
                </Stack>
            </Stack>
            <Box sx={{ width: '100%', height: '1px', bgcolor: 'divider', opacity: 0.2 }} />

            <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mt: 1.5 }}>
                {stats.map((stat, index) => (
                    <Box
                        key={index}
                        sx={{
                            ...commonStatBoxStyles,
                            width: index === 2 ? '100%' : 'calc(50% - 0.5rem)'
                        }}
                    >
                        <Stack direction="row" alignItems="center" justifyContent="center" sx={{ width: '100%' }}>
                            <Box
                                component="img"
                                src={stat.icon}
                                sx={{ width: 16, height: 16, mr: 0.5, flexShrink: 0 }}
                            />
                            <Typography variant="caption" sx={{ fontSize: '0.75rem' }}>
                                {stat.label}
                            </Typography>
                        </Stack>
                        <Typography
                            sx={{ textAlign: 'center', fontWeight: 600, fontSize: '1.125rem', mt: 0.5 }}
                            dangerouslySetInnerHTML={{ __html: stat.value }}
                        />
                    </Box>
                ))}
            </Stack>
        </Paper>
    );
};

const FavoriteGames = () => (
    <Paper sx={commonPaperStyles}>
        <Typography variant="inherit" fontWeight="bold" ml={0.5} sx={{ mb: 1.5 }}>
            Favorite Games
        </Typography>
        <Box sx={{ width: '100%', height: '1px', bgcolor: 'divider', opacity: 0.2 }} />
        <EmptyData />
    </Paper>
);

const MyProfile = ({ setOpen }: { setOpen: (open: string | null) => void }) => (
    <Stack direction="column" gap={1}>
        <Profile setOpen={setOpen} />
        <Medals setOpen={setOpen} />
        <Statistics setOpen={setOpen} />
        {/* <FavoriteGames /> */}
    </Stack>
);

export default MyProfile;
