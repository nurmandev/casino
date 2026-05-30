import { useTranslate } from 'locales';
// @mui
import { Box, Container, Grid, Link, Stack, Typography, styled, useTheme } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
// iconify
import { Icon } from '@iconify/react';

interface FooterSection {
    title: string;
    links: { label: string; href?: string }[];
}

const footerSections: FooterSection[] = [
    {
        title: 'Sports',
        links: [
            { label: 'Sports Home', href: '/sports' },
            { label: 'Live', href: '/sports' },
            { label: 'SportsBook', href: '/sports' },
            { label: 'Rules', href: '/sports' }
        ]
    },
    {
        title: 'Promo',
        links: [
            { label: 'VIP Club', href: '/vip' },
            { label: 'Referral', href: '/affiliate/dashboard' }
        ]
    },
    {
        title: 'Support/Legal',
        links: [
            { label: 'Licenses', href: '/help-center' },
            { label: 'Privacy Policy', href: '/help-center' },
            { label: 'Terms Of Service', href: '/help-center' },
            { label: 'Responsible Gambling', href: '/help-center' },
            { label: 'Live Support', href: '/help-center' }
        ]
    }
];

const PARTNER_LOGOS_DARK = [
    '/assets/images/brand-logo/d-92-DCx7K2V3.webp',
    '/assets/images/brand-logo/d-93-0pkDEp9Z.webp',
    '/assets/images/brand-logo/d-94-BjjhhHHh.webp',
    '/assets/images/brand-logo/d-95-CMQSGT4N.png',
    '/assets/images/brand-logo/d-96-pZM7QuMr.webp',
    '/assets/images/brand-logo/d-97-qal8av7f.webp',
    '/assets/images/brand-logo/d-98-DA42CT6W.webp',
    '/assets/images/brand-logo/d-99-NFJF9gM_.webp'
];

const PARTNER_LOGOS_LIGHT = [
    '/assets/images/brand-logo/l-92-D9CXX7n9.webp',
    '/assets/images/brand-logo/l-93-DgRQ3Lqa.webp',
    '/assets/images/brand-logo/l-94-CFwrRsGr.webp',
    '/assets/images/brand-logo/l-95-DCnS_xIT.webp',
    '/assets/images/brand-logo/l-96-C1nvtIUl.webp',
    '/assets/images/brand-logo/l-97-CpWNpbFQ.webp',
    '/assets/images/brand-logo/l-98-DtiOQmq7.webp',
    '/assets/images/brand-logo/l-99-Do9OFKQ2.webp'
];

const CERTIFICATION_SPRITES = [
    '/img/footer/sprite.png',
    '/img/footer/sprite_1.png',
    '/img/footer/sprite_2.png',
    '/img/footer/sprite_3.png',
    '/img/footer/sprite_4.png'
];

const SocialCircle = styled(Link)(({ theme }) => ({
    width: 38,
    height: 38,
    borderRadius: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'rgba(255, 255, 255, 0.6)',
    transition: 'all 0.2s',
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: '#22E9A7',
        color: '#000',
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 12px rgba(34, 233, 167, 0.3)'
    }
}));

const Footer = () => {
    const { t } = useTranslate();
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';
    const logos = isDarkMode ? PARTNER_LOGOS_DARK : PARTNER_LOGOS_LIGHT;

    const globalSocials = [
        { icon: 'mdi:telegram', url: 'https://telegram.org' },
        { icon: 'mdi:github', url: 'https://github.com' },
        { icon: 'ri:twitter-x-fill', url: 'https://twitter.com' },
        { icon: 'mdi:facebook', url: 'https://facebook.com' },
        { icon: 'mdi:discord', url: 'https://discord.com' },
        { icon: 'mdi:whatsapp', url: 'https://whatsapp.com' },
        { icon: 'mdi:instagram', url: 'https://instagram.com' },
        { icon: 'ri:forum-fill', url: '#' }
    ];

    return (
        <Box
            component="footer"
            sx={{
                width: '100%',
                bgcolor: 'background.site', // Perfectly match the page background color!
                color: 'text.secondary',
                borderTop: '1px solid',
                borderColor: 'rgba(255, 255, 255, 0.05)',
                pt: 8,
                pb: 4
            }}
        >
            <Container maxWidth={false} sx={{ maxWidth: '1248px !important' }}>
                {/* 1. Partner Awards & Brand Logos Row (Using User's brand-logo webp assets dynamically based on dark/light mode!) */}
                <Box sx={{ mb: 6 }}>
                    <Grid container spacing={2} justifyContent="space-between" alignItems="center">
                        {logos.map((logoUrl, index) => (
                            <Grid key={index} size={{ xs: 3, sm: 3, md: 1.4 }}>
                                <Box
                                    component="img"
                                    src={logoUrl}
                                    alt={`award-partner-${index}`}
                                    sx={{
                                        width: '100%',
                                        maxHeight: { xs: 32, sm: 40, md: 48 },
                                        objectFit: 'contain',
                                        opacity: 0.7,
                                        transition: 'all 0.2s',
                                        '&:hover': {
                                            opacity: 1,
                                            transform: 'scale(1.05)'
                                        }
                                    }}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* 2. Top Link & Community Grid */}
                <Grid container spacing={4} sx={{ mb: 6 }}>
                    {/* Render Columns dynamically */}
                    {footerSections.map((section) => (
                        <Grid key={section.title} size={{ xs: 6, sm: 4, md: 2.5 }}>
                            <Typography
                                variant="subtitle2"
                                sx={{
                                    color: 'common.white',
                                    fontWeight: 700,
                                    fontSize: '1rem',
                                    mb: 2.5
                                }}
                            >
                                {t(section.title)}
                            </Typography>
                            <Stack spacing={1.5}>
                                {section.links.map((link, idx) => (
                                    <Link
                                        key={idx}
                                        component={RouterLink}
                                        to={link.href || '#'}
                                        underline="none"
                                        sx={{
                                            color: 'rgba(255, 255, 255, 0.6)',
                                            fontSize: '0.875rem',
                                            fontWeight: 500,
                                            transition: 'color 0.2s',
                                            '&:hover': {
                                                color: 'primary.main'
                                            }
                                        }}
                                    >
                                        {t(link.label)}
                                    </Link>
                                ))}
                            </Stack>
                        </Grid>
                    ))}

                    {/* Join Our Community Column */}
                    <Grid size={{ xs: 12, sm: 12, md: 4.5 }}>
                        {/* Global Community */}
                        <Typography
                            variant="subtitle2"
                            sx={{
                                color: 'common.white',
                                fontWeight: 700,
                                fontSize: '1rem',
                                mb: 2.5
                            }}
                        >
                            {t('Join Our Global Community')}
                        </Typography>
                        <Grid container spacing={1.5} sx={{ mb: 4, maxWidth: 220 }}>
                            {globalSocials.map((social, idx) => (
                                <Grid key={idx} size={3}>
                                    <SocialCircle href={social.url} target="_blank" rel="noopener noreferrer">
                                        <Icon icon={social.icon} width="20" height="20" />
                                    </SocialCircle>
                                </Grid>
                            ))}
                        </Grid>

                        {/* Local Community */}
                        <Typography
                            variant="subtitle2"
                            sx={{
                                color: 'common.white',
                                fontWeight: 700,
                                fontSize: '1rem',
                                mb: 2
                            }}
                        >
                            {t('Join Our Local Community')}
                        </Typography>
                        <SocialCircle href="#" sx={{ width: 38, height: 38 }}>
                            <Icon icon="mdi:chat-processing" width="20" height="20" />
                        </SocialCircle>
                    </Grid>
                </Grid>

                {/* Divider Line */}
                <Box
                    sx={{
                        width: '100%',
                        height: '1px',
                        bgcolor: 'rgba(255, 255, 255, 0.05)',
                        my: 5
                    }}
                />

                {/* Bottom Row: Logo, Disclaimer, and Verification Text */}
                <Grid container spacing={4} sx={{ mb: 6 }}>
                    {/* Left Column: Brand Logo and Basic Signoff */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Stack spacing={3} alignItems="flex-start">
                            <Stack direction="row" spacing={2} alignItems="center">
                                <Box component="img" src="/logo.webp" sx={{ height: 32 }} />
                                {/* Football verification shield */}
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        p: 0.5,
                                        borderRadius: '4px',
                                        bgcolor: 'rgba(255,255,255,0.05)',
                                        border: '1px solid rgba(255,255,255,0.1)'
                                    }}
                                >
                                    <Icon icon="mdi:shield-check" color="#22E9A7" width="24" height="24" />
                                </Box>
                            </Stack>
                            <Typography
                                sx={{
                                    fontSize: '0.75rem',
                                    lineHeight: 1.6,
                                    color: 'rgba(255, 255, 255, 0.4)',
                                    maxWidth: '460px'
                                }}
                            >
                                Your use of and access to this website signifies that you fully understand and agree to be legally bound by the contents of our Terms of Service and Responsible Gaming Policy.
                            </Typography>
                        </Stack>
                    </Grid>

                    {/* Right Column: Licensing Text & Verification Badge Row (Using User's public/img/footer sprite webp assets!) */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Grid container spacing={2}>
                            <Grid size={{ xs: 1.5, sm: 1 }}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: 36,
                                        height: 36,
                                        borderRadius: '50%',
                                        bgcolor: 'rgba(255, 255, 255, 0.05)',
                                        border: '1px solid rgba(255, 255, 255, 0.1)'
                                    }}
                                >
                                    <Icon icon="mdi:alert-circle-outline" color="#ff4444" width="22" height="22" />
                                </Box>
                            </Grid>
                            <Grid size={{ xs: 10, sm: 11 }}>
                                <Stack spacing={2}>
                                    <Typography
                                        sx={{
                                            fontSize: '0.75rem',
                                            lineHeight: 1.6,
                                            color: 'rgba(255, 255, 255, 0.4)'
                                        }}
                                    >
                                        BCBET.NG is owned and managed by BlockDance Africa Limited, licensed and authorized by the Government of Nigeria's National Lottery Regulatory Commission to operate under a National Sports Betting Permit no. #2005793 and the Lagos State Lotteries and Gaming Authority to operate as a gaming operator in Lagos State under category Sport Betting / Online Casino with license no. LSLGA/OP/OSB/210325.
                                    </Typography>
                                    
                                    {/* Certification Icons from user's /img/footer assets */}
                                    <Stack direction="row" spacing={1.5} flexWrap="wrap" alignItems="center" sx={{ pt: 1, gap: 1.5 }}>
                                        {CERTIFICATION_SPRITES.map((spritePath, idx) => (
                                            <Box
                                                key={idx}
                                                component="img"
                                                src={spritePath}
                                                alt={`certification-badge-${idx}`}
                                                sx={{
                                                    height: 32,
                                                    objectFit: 'contain',
                                                    opacity: 0.5,
                                                    transition: 'opacity 0.2s',
                                                    '&:hover': {
                                                        opacity: 0.9
                                                    }
                                                }}
                                            />
                                        ))}
                                    </Stack>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                {/* Copyright Line */}
                <Typography
                    sx={{
                        fontSize: '0.75rem',
                        color: 'rgba(255, 255, 255, 0.3)',
                        textAlign: 'center',
                        borderTop: '1px solid',
                        borderColor: 'rgba(255, 255, 255, 0.03)',
                        pt: 3
                    }}
                >
                    Copyright ©2026 BlockDance Africa Limited ALL RIGHTS RESERVED.
                </Typography>
            </Container>
        </Box>
    );
};

export default Footer;
