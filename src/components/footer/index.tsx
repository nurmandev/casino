import { useTranslate } from 'locales';
// @mui
import { Box, Container, Link, Stack, Typography, styled, IconButton } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Iconify from 'components/iconify';

interface FooterSection {
    title: string;
    links: { label: string; href?: string; highlight?: boolean }[];
}

const footerSections: FooterSection[] = [
    {
        title: 'Casino',
        links: [
            { label: 'Casino Home' },
            { label: 'Slots' },
            { label: 'Live Casino' },
            { label: 'New Releases' },
            { label: 'Recommended', highlight: true },
            { label: 'Table Game' },
            { label: 'BlackJack' },
            { label: 'Roulette' },
            { label: 'Baccarat' }
        ]
    },
    {
        title: 'Sports',
        links: [{ label: 'Sports Home' }, { label: 'Live' }, { label: 'Rules' }]
    },
    {
        title: 'Support',
        links: [{ label: 'Help Center' }, { label: 'Live Support' }, { label: 'Refer a friend' }]
    },
    {
        title: 'Support/Legal',
        links: [
            { label: 'Fairness' },
            { label: 'FAQ' },
            { label: 'Privacy Policy' },
            { label: 'Terms Of Service' },
            { label: 'Responsible Gambling' },
            { label: 'AML' },
            { label: 'Self-Exclusion' }
        ]
    }
];

const CERTIFICATIONS = [
    '/assets/images/certification/18.png',
    '/assets/images/certification/crypto-gambling.png',
    '/assets/images/certification/itech.png',
    '/assets/images/certification/gcb.png',
    '/assets/images/certification/pci.png'
];

const SOCIAL_NETWORKS = [
    { icon: 'ic:baseline-telegram', path: '#' },
    { icon: 'mdi:github', path: '#' },
    { icon: 'ri:twitter-x-fill', path: '#' },
    { icon: 'ic:baseline-facebook', path: '#' },
    { icon: 'ic:baseline-discord', path: '#' },
    { icon: 'ic:baseline-whatsapp', path: '#' },
    { icon: 'mdi:instagram', path: '#' },
    { icon: 'ph:globe', path: '#' }
];

const Footer = () => {
    const { t } = useTranslate();
    return (
        <Box
            sx={{
                width: '100%',
                bgcolor: 'background.footer',
                color: '#fff'
            }}
        >
            <Container maxWidth={false} sx={{ maxWidth: '1248px !important' }}>
                {/* 1. Top Information Section */}
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        py: { xs: 4, md: 6 },
                        borderBottom: '1px solid',
                        borderColor: '#FFFFFF1A',
                        mx: -2 // Negative margin for gutter
                    }}
                >
                    <Box sx={{ width: { xs: '100%', md: '58.333%' }, px: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                            Crypto Online Casino
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2, lineHeight: 1.6 }}>
                            Explore 1000+ slots, live dealer tables, crash and original games, plus full sports betting
                            with pre-match and in-play odds. Instant deposits, low fees, fast withdrawals.
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                            Our provably fair systems and audited RNG protect every bet. One wallet across casino and
                            sportsbook keeps things simple, and our mobile-ready site lets you play anywhere. New
                            players can claim welcome bonuses and ongoing cashback. Need help? 24/7 support has you
                            covered. Simple, secure, and built for real-money crypto gaming.
                        </Typography>
                    </Box>
                    <Box sx={{ width: { xs: '100%', md: '41.666%' }, px: 2 }}>
                        <Stack
                            spacing={1}
                            sx={{ mt: { xs: 2, md: 0 }, alignItems: { xs: 'flex-start', md: 'flex-start' } }}
                        >
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                Help us improve your experience
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                Get rewarded for your valuable feedback!
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#22E9A7', fontWeight: 'bold', mt: 1 }}>
                                Email us: feedback@87.com
                            </Typography>
                        </Stack>
                    </Box>
                </Box>

                {/* 2. Awards Section */}
                <Box sx={{ py: { xs: 3, md: 4 }, borderBottom: '1px solid', borderColor: '#FFFFFF1A' }}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                            alignItems: 'center',
                            mx: -1
                        }}
                    >
                        {[
                            'achieve_1-c87ad7ad.webp',
                            'achieve_2-f40a41f6.webp',
                            'achieve_3-bf42dfa3.webp',
                            'achieve_4-c845bc7e.webp',
                            'achieve_5-7e08d516.webp',
                            'achieve_6-f98836e4.webp',
                            'achieve_7-6bbaf20d.webp',
                            'achieve_8-65991297.webp'
                        ].map((img, index) => (
                            <Box
                                key={index}
                                sx={{
                                    width: { xs: '33.33%', sm: '25%', md: '12.5%' },
                                    px: 1,
                                    mb: 2,
                                    display: 'flex',
                                    justifyContent: 'center'
                                }}
                            >
                                <Box
                                    component={'img'}
                                    src={`/assets/images/medals/${img}`}
                                    alt={'award'}
                                    sx={{
                                        width: '100%',
                                        maxWidth: { xs: 60, sm: 80, md: 80 },
                                        height: 'auto',
                                        maxHeight: 60,
                                        objectFit: 'contain',
                                        opacity: 0.5,
                                        filter: 'grayscale(100%)',
                                        transition: 'all 0.3s',
                                        '&:hover': { opacity: 1, filter: 'none' }
                                    }}
                                />
                            </Box>
                        ))}
                    </Box>
                </Box>

                {/* 3. Partners / Certifications Section */}
                <Stack
                    direction={{ xs: 'column', md: 'row' }}
                    justifyContent="space-between"
                    alignItems={{ xs: 'center', md: 'center' }}
                    gap={3}
                    flexWrap="wrap"
                    sx={{ py: { xs: 3, md: 4 }, borderBottom: '1px solid', borderColor: '#FFFFFF1A' }}
                >
                    <Stack
                        direction="row"
                        gap={{ xs: 2, md: 3 }}
                        flexWrap="wrap"
                        justifyContent={{ xs: 'center', md: 'flex-start' }}
                        alignItems="center"
                    >
                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#fff', letterSpacing: 1 }}>
                            SIGMA
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{ color: 'text.secondary', textAlign: 'center', lineHeight: 1.2 }}
                        >
                            Responsible
                            <br />
                            Gambling
                        </Typography>
                        <Stack direction="row" alignItems="center" gap={0.5}>
                            <Box
                                component="div"
                                sx={{
                                    width: 24,
                                    height: 24,
                                    border: '2px solid white',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: 'bold'
                                }}
                            >
                                G
                            </Box>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'text.secondary' }}>
                                GamCare
                            </Typography>
                        </Stack>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'text.secondary' }}>
                            betblocker
                        </Typography>
                        <Box
                            component="div"
                            sx={{
                                border: '1px solid white',
                                borderRadius: '50%',
                                p: 0.5,
                                width: 32,
                                height: 32,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                18+
                            </Typography>
                        </Box>
                    </Stack>

                    {/* Club/Team Logos */}
                    <Stack
                        direction="row"
                        gap={3}
                        flexWrap="wrap"
                        justifyContent={{ xs: 'center', md: 'flex-end' }}
                        alignItems="center"
                    >
                        {[
                            '21825.png',
                            '2344890497778196512.png',
                            '2344949089407475734.png',
                            '2508.png',
                            '2513.png',
                            '402227.png'
                        ].map((img, i) => (
                            <Box
                                key={i}
                                component="img"
                                src={`/assets/images/clubs/${img}`}
                                sx={{
                                    height: { xs: 30, md: 40 },
                                    opacity: 0.6,
                                    filter: 'grayscale(100%)',
                                    '&:hover': { opacity: 1, filter: 'none' }
                                }}
                            />
                        ))}
                    </Stack>
                </Stack>

                {/* 4. Links & Socials Section */}
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        py: { xs: 4, md: 6 },
                        mx: -2
                    }}
                >
                    {footerSections.map((section) => (
                        <Box
                            key={section.title}
                            sx={{
                                width: { xs: '50%', sm: '50%', md: '16.666%' },
                                px: 2,
                                mb: 4
                            }}
                        >
                            <Typography variant="subtitle2" sx={{ color: '#fff', fontWeight: 'bold', mb: 2.5 }}>
                                {section.title}
                            </Typography>
                            <Stack spacing={1.5}>
                                {section.links.map((link, index) => {
                                    const routeMap: Record<string, string> = {
                                        'Casino Home': '/casino',
                                        Slots: '/casino/slot?type=Slots',
                                        'Live Casino': '/casino/live?type=Live Casino',
                                        'New Releases': '/gamelist/slot?type=New Releases',
                                        Recommended: '/gamelist/recommended-games',
                                        'Table Game': '/casino/OTHER?type=Table Game',
                                        BlackJack: '/casino/slot?type=BlackJack',
                                        Roulette: '/casino/slot?type=Roulette',
                                        Baccarat: '/casino/slot?type=Baccarat',
                                        'Sports Home': '/sports',
                                        Live: '/sports',
                                        Rules: '/sports',
                                        'Help Center': '/help-center',
                                        'Live Support': '/help-center',
                                        'Refer a friend': '/affiliate/dashboard',
                                        Fairness: '/help-center',
                                        FAQ: '/help-center',
                                        'Privacy Policy': '/help-center',
                                        'Terms Of Service': '/help-center',
                                        'Responsible Gambling': '/help-center',
                                        AML: '/help-center',
                                        'Self-Exclusion': '/help-center'
                                    };
                                    const to = link.href || routeMap[link.label] || '#';
                                    const isInternal = to.startsWith('/');

                                    return (
                                        <Link
                                            key={index}
                                            component={isInternal ? RouterLink : 'a'}
                                            {...(isInternal ? { to } : { href: to })}
                                            underline="none"
                                            sx={{
                                                color: link.highlight ? '#fff' : 'text.secondary',
                                                fontSize: '0.875rem',
                                                '&:hover': { color: '#22E9A7' }
                                            }}
                                        >
                                            {link.label}
                                        </Link>
                                    );
                                })}
                            </Stack>
                        </Box>
                    ))}

                    {/* Join Global Community */}
                    <Box sx={{ width: { xs: '100%', md: '33.333%' }, px: 2 }}>
                        <Stack alignItems={{ xs: 'flex-start', md: 'flex-end' }}>
                            <Typography variant="subtitle2" sx={{ color: '#fff', fontWeight: 'bold', mb: 2.5 }}>
                                Join Our Global Community
                            </Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', maxWidth: 220, mx: -0.5 }}>
                                {SOCIAL_NETWORKS.map((social, index) => (
                                    <Box key={index} sx={{ width: '25%', px: 0.5, mb: 1 }}>
                                        <IconButton
                                            sx={{
                                                bgcolor: '#FFFFFF0D',
                                                borderRadius: 1,
                                                width: 40,
                                                height: 40,
                                                '&:hover': { bgcolor: '#FFFFFF26' }
                                            }}
                                        >
                                            <Iconify icon={social.icon} width={20} color="#9aa0a6" />
                                        </IconButton>
                                    </Box>
                                ))}
                            </Box>
                        </Stack>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
