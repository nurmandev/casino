import { Link as ReactLink } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { useTranslate } from 'locales';

const gamelist = [
    {
        name: 'poker',
        image: '/assets/home/poker.webp',
        path: '/poker',
        background: 'linear-gradient(to left, rgba(39, 232, 187, 0.2), transparent 75%)',
        icon: { name: 'url(/assets/icons/icons-1.webp)', x: '-96px ', y: '0px' }
    },
    {
        name: 'racing',
        image: '/assets/home/racing.webp',
        path: '/racing',
        background: 'linear-gradient(to left, rgb(80, 65, 48), transparent 75%)',
        icon: { name: 'url(/assets/icons/icons-1.webp)', x: '-32px', y: '-160px' }
    },
    {
        name: 'lottery',
        image: '/assets/home/lottery.webp',
        path: '/lottery',
        background: 'linear-gradient(to left, rgb(66, 83, 48), transparent 75%)',
        icon: { name: 'url(/assets/icons/icons-1.webp)', x: '-32px', y: '-128px' }
    },
    {
        name: 'updown',
        image: '/assets/home/updown.webp',
        path: '/updown',
        background: 'linear-gradient(to left, rgb(45, 79, 49), transparent 75%)',
        icon: { name: 'url(/assets/icons/icons-1.webp)', x: '-192px', y: '-96px' }
    },
    {
        name: 'bingo',
        image: '/assets/home/bingo.webp',
        path: '/bingo',
        background: 'linear-gradient(to left, rgb(71, 56, 111), transparent 75%)',
        icon: { name: 'url(/assets/icons/icons-1.webp)', x: '-64px', y: '-32px' }
    }
];

const GameLink = () => {
    const { t } = useTranslate();
    return (
        <Box>
            <Box
                sx={{
                    mb: { md: 2.5, xs: 1 },
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr 1fr', sm: 'repeat(2, 1fr)' },
                    gap: { md: 2.5, xs: 1 },
                    flex: { xs: 1, sm: 2 }
                }}
            >
                <Box
                    sx={{
                        p: { md: 3, xs: 0.6 },
                        px: { md: 3, xs: 1.25 },
                        height: { md: 176, xs: 120 },
                        borderRadius: 2,
                        overflow: 'visible',
                        position: 'relative',
                        textDecoration: 'none',
                        backgroundImage: 'linear-gradient(to left, rgb(44, 80, 64), transparent 75%)',
                        bgcolor: 'background.layer4'
                    }}
                    component={ReactLink}
                    to={'/casino'}
                >
                    <Box
                        component="img"
                        src="/assets/casino.webp"
                        alt="casino"
                        sx={{
                            top: 0,
                            right: '1.25rem',
                            position: 'absolute',
                            height: '120%'
                        }}
                    />
                    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', zIndex: 10 }}>
                        <Box
                            sx={{
                                display: 'flex',
                                gap: '0.5rem',
                                alignItems: 'center'
                            }}
                        >
                            <Box
                                sx={{
                                    width: 32,
                                    height: 32,
                                    backgroundImage: `url(/assets/icons/icons-1.webp)`,
                                    backgroundPosition: `-96px 0px`,
                                    backgroundRepeat: 'no-repeat'
                                }}
                            />
                            <Typography
                                variant="h2"
                                sx={{
                                    fontSize: { md: '22px', xs: '0.875rem' },
                                    fontWeight: 800,
                                    color: 'common.white',
                                    textTransform: 'uppercase'
                                }}
                            >
                                {t('casino')}
                            </Typography>
                        </Box>
                        <Typography
                            variant="body1"
                            sx={{
                                fontWeight: 600,
                                color: 'common.white',
                                maxWidth: '15rem',
                                marginTop: 'auto',
                                display: { md: 'block', xs: 'none' }
                            }}
                        >
                            Dive into our in-house games, live casino and slots
                        </Typography>
                    </Box>
                </Box>
                <Box
                    sx={{
                        p: { md: 3, xs: 0.6 },
                        px: { md: 3, xs: 1.25 },
                        height: { md: 176, xs: 120 },
                        borderRadius: 2,
                        overflow: 'visible',
                        position: 'relative',
                        textDecoration: 'none',
                        backgroundImage: 'linear-gradient(to left, rgb(88, 46, 89), transparent 75%)',
                        bgcolor: 'background.layer4'
                    }}
                    component={ReactLink}
                    to={'/sports'}
                >
                    <Box
                        component="img"
                        src="/assets/sports.webp"
                        alt="sports"
                        sx={{
                            top: 0,
                            right: '1.25rem',
                            position: 'absolute',
                            height: '120%'
                        }}
                    />
                    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', zIndex: 10 }}>
                        <Box
                            sx={{
                                display: 'flex',
                                gap: '0.5rem',
                                alignItems: 'center'
                            }}
                        >
                            <Box
                                sx={{
                                    width: 32,
                                    height: 32,
                                    backgroundImage: `url(/assets/icons/icons-1.webp)`,
                                    backgroundPosition: `-160px -160px`,
                                    backgroundRepeat: 'no-repeat'
                                }}
                            />
                            <Typography
                                variant="h2"
                                sx={{
                                    fontSize: { md: '22px', xs: '0.875rem' },
                                    fontWeight: 800,
                                    color: 'common.white',
                                    textTransform: 'uppercase'
                                }}
                            >
                                {t('sports')}
                            </Typography>
                        </Box>

                        <Typography
                            variant="body1"
                            sx={{
                                fontWeight: 600,
                                color: 'common.white',
                                maxWidth: '15rem',
                                marginTop: 'auto',
                                display: { md: 'block', xs: 'none' }
                            }}
                        >
                            Bet on Football, Cricket, NFL, eSports & over 80 sports!
                        </Typography>
                    </Box>
                </Box>
            </Box>

            <Box
                sx={{
                    mb: { md: 7, xs: 2 },
                    display: 'grid',
                    gridTemplateColumns: { xs: 'repeat(5, 1fr)', sm: 'repeat(5, 1fr)' },
                    gap: { md: 2.5, xs: 1 },
                    flex: { xs: 1, sm: 2 }
                }}
            >
                {gamelist.map((game) => (
                    <Box
                        key={game.path}
                        sx={{
                            p: { md: 1, xs: 0.6 },
                            px: { md: 1, xs: 1.25 },
                            height: { xs: '6rem', sm: '120px' },
                            borderRadius: 2,
                            overflow: 'visible',
                            position: 'relative',
                            textDecoration: 'none',
                            backgroundImage: game.background,
                            bgcolor: 'background.layer4',
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                        component={ReactLink}
                        to={game.path}
                    >
                        <Box
                            component="img"
                            src={game.image}
                            alt="casino"
                            sx={{
                                top: 0,
                                right: 0,
                                position: 'absolute',
                                height: { xs: '70%', sm: '100%' }
                            }}
                        />
                        <Box
                            sx={{
                                display: 'flex',
                                gap: '0.125rem',
                                alignItems: 'center',
                                marginTop: { xs: 'auto', sm: '0px' }
                            }}
                        >
                            <Box
                                sx={{
                                    width: 32,
                                    height: 32,
                                    backgroundImage: game.icon.name,
                                    backgroundPosition: `${game.icon.x} ${game.icon.y}`,
                                    backgroundRepeat: 'no-repeat',
                                    transform: 'scale(0.75)',
                                    display: { xs: 'none', sm: 'block' }
                                }}
                            />
                            <Typography
                                variant="body1"
                                sx={{
                                    fontSize: { md: '0.875rem', xs: '0.575rem' },
                                    fontWeight: 800,
                                    color: 'common.white',
                                    textTransform: 'uppercase'
                                }}
                            >
                                {t(game.name)}
                            </Typography>
                        </Box>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default GameLink;
