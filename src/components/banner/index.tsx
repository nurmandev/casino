import Slider from 'react-slick';
import { useEffect, useMemo, useState } from 'react';
import { Box, Stack, Typography, useTheme, useMediaQuery, styled } from '@mui/material';
// hooks
import { useAuth } from 'hooks/use-auth-context';
// components
import Image from 'components/image';
import ColorButton from 'components/ColorButton';
import { useTranslate } from 'locales';
// store
import { useSelector } from 'store/store';
// utils
import { ASSETS } from 'utils/axios';

const BannerContainer = styled(Box)(({ theme }) => ({
    position: 'relative',
    overflow: 'hidden',
    borderRadius: Number(theme.shape.borderRadius) * 1.5,
    background: `linear-gradient(261deg, ${theme.palette.background.layer4} 70.44%, rgb(96, 104, 105) 128.85%)`,
    backgroundSize: 'cover',
    backgroundRepeat: 'repeat-x',
    maxHeight: '200px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
}));

const BannerImage = styled('img')({
    position: 'absolute',
    right: 0,
    top: 0,
    height: '100%'
});
const BannerImage2 = styled('img')({
    position: 'absolute',
    left: '-4.5rem',
    top: '-1rem',
    height: '360px',
    width: '354px'
});

const ContentContainer = styled(Stack, {
    shouldForwardProp: (prop) => prop !== 'scale'
})<{ scale?: number }>(({ theme, scale = 1 }) => ({
    position: 'absolute',
    top: 0,
    left: theme.spacing(1.5),
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
        transformOrigin: 'top left',
        transform: `scale(${scale})`,
        left: '19%',
        top: '4%',
        height: 'auto',
        alignItems: 'center',
        padding: 0,
        textAlign: 'center'
    }
}));

const PromoBox = styled(Box)(({ theme }) => ({
    borderRadius: Number(theme.shape.borderRadius) * 1.5,
    marginTop: theme.spacing(1.5),
    padding: 0,
    [theme.breakpoints.up('sm')]: {
        marginTop: theme.spacing(2),
        backgroundColor: 'rgba(176, 255, 216, 0.2)',
        backdropFilter: 'blur(4px)',
        padding: theme.spacing(1.5, 15)
    }
}));

const GradientText = styled(Typography)({
    background: 'linear-gradient(to right, #9FE871, #24EE89)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    marginLeft: 4
});

const StyledButton = styled(ColorButton)(({ theme }) => ({
    marginTop: 'auto',
    width: 112,
    height: 40,
    [theme.breakpoints.up('sm')]: {
        marginTop: theme.spacing(2.5),
        width: 240
    }
}));

const Banner = () => {
    const theme = useTheme();
    const { t } = useTranslate();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));
    const { isLogined } = useAuth();
    const { banners } = useSelector((state) => state.setting);

    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const slidesToShow = isMobile ? 1 : isTablet ? 2 : 3;

    const sliderSettings = useMemo(
        () => ({
            dots: true,
            infinite: true,
            slidesToShow,
            slidesToScroll: slidesToShow,
            autoplay: true,
            autoplaySpeed: 5000,
            pauseOnHover: true,
            arrows: false,
            swipeToSlide: true,
            adaptiveHeight: true,
            lazyLoad: 'ondemand' as const,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        dots: true
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        initialSlide: 0,
                        centerMode: false
                    }
                }
            ]
        }),
        [slidesToShow]
    );

    return (
        <>
            {isLogined ? (
                <Stack
                    className="slider-container"
                    sx={{
                        width: 1,
                        m: 0,
                        p: 0,
                        '& .slick-dots': {
                            bottom: -12
                        },
                        '& .slick-dots li button:before': {
                            color: 'background.layer3',
                            fontSize: '10px',
                            opacity: 1
                        },
                        '& .slick-dots li.slick-active button:before': {
                            color: 'primary.main',
                            opacity: 1
                        },
                        '& .slick-slide > div': {
                            px: 0
                        },
                        mb: 2
                    }}
                >
                    <Slider {...sliderSettings}>
                        {banners.map((img, index) => (
                            <Box key={index} sx={{ borderRadius: 1, overflow: 'hidden' }}>
                                <Image
                                    src={ASSETS(img.image)}
                                    alt={`banner-${index}`}
                                    ratio={isMobile ? '16/9' : '21/9'}
                                    sx={{ borderRadius: 1 }}
                                />
                            </Box>
                        ))}
                    </Slider>
                </Stack>
            ) : (
                <BannerContainer sx={{ maxHeight: isMobile ? 180 : 400, mb: 2, aspectRatio: isMobile ? '1.7' : '4.6' }}>
                    {!isMobile && <BannerImage2 src={'/assets/images/home/players-banner_2.webp'} alt="Banner" />}
                    <BannerImage
                        src={
                            isMobile
                                ? '/assets/images/home/players-banner-mobile.webp'
                                : '/assets/images/home/players-banner.webp'
                        }
                        alt="Banner"
                    />

                    <Stack
                        alignItems="start"
                        sx={{
                            ml: isMobile ? 0 : 5,
                            zIndex: 5,
                            alignItems: isMobile ? 'flex-start' : 'center',
                            position: 'absolute',
                            left: isMobile ? '0.75rem' : '14%',
                            top: isMobile ? 0 : '6%'
                        }}
                    >
                        <Typography
                            sx={{
                                textTransform: 'capitalize',
                                fontSize: isMobile ? '1.125rem' : '1.875rem',
                                fontWeight: '800'
                            }}
                            color="text.primary"
                        >
                            Stay Untamed
                        </Typography>
                        <Box
                            sx={{
                                ...(!isMobile && {
                                    textAlign: 'center',
                                    backgroundColor: '#00000026',
                                    padding: '0.75rem',
                                    paddingRight: '3.75rem',
                                    paddingLeft: '3.75rem',
                                    borderRadius: '0.75rem'
                                })
                            }}
                        >
                            <Typography
                                sx={{
                                    textTransform: 'capitalize',
                                    fontSize: isMobile ? '1rem' : '1.125rem',
                                    fontWeight: '600'
                                }}
                                color="text.primary"
                            >
                                {t('signUpGetUpTo')}
                            </Typography>
                            <GradientText fontSize={isMobile ? '1rem' : '1.5rem'} fontWeight={800}>
                                $20,000.00
                            </GradientText>
                            <Typography
                                sx={{
                                    textTransform: 'capitalize',
                                    fontSize: isMobile ? '1rem' : '1.125rem',
                                    fontWeight: '600'
                                }}
                                // variant={isMobile ? 'body2' : 'h3'}
                                // fontWeight={600}
                            >
                                {t('inCasinoOrSports')}
                            </Typography>
                        </Box>
                        <StyledButton
                            sx={{
                                borderRadius: 2,
                                // width: { xs: '103px', md: '156px' },
                                // height: { xs: '32px', md: '56px' },
                                color: '#232626',
                                fontWeight: '600',
                                marginTop: 'auto',
                                fontSize: { xs: '14px', md: '18px' },
                                bgcolor: '#22E9A7',
                                '&:hover': {
                                    bgcolor: '#5ef1c0',
                                    boxShadow: '0 4px 12px rgba(34, 233, 167, 0.6)'
                                }
                            }}
                        >
                            {t('joinNow')}
                        </StyledButton>
                    </Stack>
                    {/* </ContentContainer> */}
                </BannerContainer>
            )}
        </>
    );
};

export default Banner;
