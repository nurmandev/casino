import { useEffect, useState } from 'react';
import { Stack, Typography, Grid, Box, Button, Container, useTheme } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import { useSettingsContext } from 'components/settings';
import Iconify from 'components/iconify';
import ColorButton from 'components/ColorButton';

// Assets
// Using bonus.webp as the main visual placeholder since 'bonus-welcome-banner.wep' is missing
import bonusImage from 'assets/bonus-welcome-banner.webp';
import levelUpImagePlaceholder from 'assets/welcome-levelup.webp';

// NOTE: Please ensure 'welcome-levelup.png' exists in 'src/assets/images/'
const levelUpImage = levelUpImagePlaceholder;

// Styled Components
const HeroSection = styled(Box)(({ theme }) => ({
    background: 'linear-gradient(94deg, #231333 0%, #4a2574 100%)', // Richer purple gradient
    borderRadius: Number(theme.shape.borderRadius) * 2,
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 320,
    marginTop: theme.spacing(4),
    padding: theme.spacing(0, 8),
    boxShadow: '0px 10px 40px rgba(0,0,0,0.3)',
    [theme.breakpoints.down('lg')]: {
        padding: theme.spacing(0, 4)
    },
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center',
        padding: theme.spacing(5, 3),
        minHeight: 'auto'
    }
}));

const HeroOverlay = styled(Box)(({ theme }) => ({
    display: 'none'
}));

const StyledButton = styled(ColorButton)(({ theme }) => ({
    // Inherit default ColorButton styles (gradient + shadow)
    color: '#000',
    fontWeight: 700,
    width: 'fit-content',
    minWidth: 160,
    height: 48,
    padding: theme.spacing(0, 4),
    fontSize: '0.95rem',
    borderRadius: 8,
    zIndex: 2,
    marginTop: theme.spacing(3),
    fontFamily: 'Inter, sans-serif'
    // We can keep default hover or slightly adjust
}));

const StepCircle = styled(Box)(({ theme }) => ({
    width: 36,
    height: 36,
    borderRadius: '50%',
    backgroundColor: '#38f84c',
    color: '#000',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 800,
    fontSize: '0.9rem',
    marginRight: theme.spacing(1.5),
    flexShrink: 0,
    boxShadow: '0 0 10px rgba(0, 231, 1, 0.3)'
}));

const StepLabel = styled(Typography)(({ theme }) => ({
    fontWeight: 700,
    fontSize: '1rem',
    color: '#fff',
    [theme.breakpoints.down('sm')]: {
        fontSize: '0.9rem'
    }
}));

const StepLine = styled(Box)(({ theme }) => ({
    flexGrow: 1,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
    margin: theme.spacing(0, 2),
    display: 'none',
    [theme.breakpoints.up('md')]: {
        display: 'block'
    }
}));

const UnlockButton = styled(ColorButton)(({ theme }) => ({
    color: '#000',
    fontWeight: 800,
    padding: theme.spacing(1, 4),
    fontSize: '0.9rem',
    borderRadius: 8,
    fontFamily: 'Inter, sans-serif',
    marginTop: theme.spacing(4),
    minWidth: 'auto',
    height: 'auto',
    minHeight: 44
}));

export default function BonusPage() {
    const { onToggleModal } = useSettingsContext();
    const theme = useTheme();

    return (
        <Container maxWidth="xl" sx={{ pb: 10, pt: 2, px: { xs: 2, md: 3 } }}>
            <HeroSection>
                {/* Content */}
                <Box
                    sx={{
                        zIndex: 2,
                        maxWidth: { md: 500, lg: 600 },
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: { xs: 'center', md: 'flex-start' },
                        mb: { xs: 4, md: 0 }
                    }}
                >
                    <Typography
                        variant="h3"
                        fontWeight={800}
                        sx={{
                            color: '#fff',
                            lineHeight: 1.1,
                            fontSize: { xs: '1.8rem', sm: '2rem', md: '2.4rem' },
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                            fontFamily: 'Inter, sans-serif'
                        }}
                    >
                        UNLOCK <span style={{ color: '#38f84c' }}>ENDLESS </span>BENEFITS
                    </Typography>

                    <Typography
                        variant="body1"
                        sx={{
                            color: '#b0a8ba',
                            mt: 1.5,
                            maxWidth: 400,
                            fontSize: { xs: '0.9rem', md: '0.95rem' },
                            fontWeight: 500,
                            lineHeight: 1.6
                        }}
                    >
                        Join now and embark on an exhilarating journey of
                        <br />
                        luck and reward
                    </Typography>

                    <StyledButton onClick={() => onToggleModal('SIGNIN')}>Sign Up</StyledButton>
                </Box>

                {/* Hero Image */}
                <Box
                    component="img"
                    src={bonusImage}
                    sx={{
                        position: { xs: 'relative', md: 'absolute' },
                        right: { md: -20 },
                        bottom: { md: -20 },
                        width: { xs: '80%', sm: '60%', md: '450px', lg: '550px' },
                        maxWidth: '100%',
                        zIndex: 1,
                        filter: 'drop-shadow(0 0 30px rgba(0,0,0,0.5))'
                    }}
                />
            </HeroSection>

            {/* Steps Section */}
            <Box sx={{ mt: 8, px: { xs: 0, md: 4 }, width: '100%' }}>
                <Grid container alignItems="center" justifyContent="center" spacing={{ xs: 3, md: 2 }}>
                    {/* Step 1 */}
                    <Grid size={{ xs: 12, md: 'auto' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <StepCircle>01</StepCircle>
                            <StepLabel>Sign up & make a deposit</StepLabel>
                        </Box>
                    </Grid>

                    {/* Line 1 */}
                    <Grid size={{ xs: 12, md: 'auto' }} sx={{ display: { xs: 'none', md: 'flex' }, maxWidth: 100 }}>
                        <StepLine />
                    </Grid>

                    {/* Step 2 */}
                    <Grid size={{ xs: 12, md: 'auto' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <StepCircle>02</StepCircle>
                            <StepLabel>Play your fav games</StepLabel>
                        </Box>
                    </Grid>

                    {/* Line 2 */}
                    <Grid size={{ xs: 12, md: 'auto' }} sx={{ display: { xs: 'none', md: 'flex' }, maxWidth: 100 }}>
                        <StepLine />
                    </Grid>

                    {/* Step 3 */}
                    <Grid size={{ xs: 12, md: 'auto' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <StepCircle>03</StepCircle>
                            <StepLabel>Increase your VIP levels</StepLabel>
                        </Box>
                    </Grid>
                </Grid>
            </Box>

            {/* Level Up Bonus Section */}
            <Box sx={{ mt: 10, mb: 10, px: { xs: 1, md: 0 } }}>
                {/* Row 1: Level Up */}
                <Grid container spacing={4} alignItems="center" sx={{ mb: { xs: 8, md: 10 } }}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                textAlign: 'center',
                                px: { md: 6 }
                            }}
                        >
                            <Typography
                                variant="h3"
                                fontWeight={800}
                                sx={{
                                    color: '#fff',
                                    mb: 2,
                                    lineHeight: 1.2,
                                    fontFamily: 'Inter, sans-serif',
                                    fontSize: { xs: '1.8rem', md: '2.5rem' }
                                }}
                            >
                                Reach new heights with our
                                <br />
                                Level Up bonus
                            </Typography>

                            <Typography variant="body1" sx={{ color: '#b0a8ba', mb: 1, fontSize: '0.95rem' }}>
                                Level up to earn substantial <span style={{ color: '#38f84c' }}>cash rewards</span> and{' '}
                                <span style={{ color: '#38f84c' }}>free lucky spins!</span>
                            </Typography>
                            <Typography variant="body1" sx={{ color: '#b0a8ba', mb: 2, fontSize: '0.95rem' }}>
                                The higher your level, the bigger the rewards.
                            </Typography>

                            <Box
                                component="a"
                                href="/vip"
                                sx={{
                                    color: '#38f84c',
                                    textDecoration: 'none',
                                    fontSize: '0.9rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    mb: 3,
                                    '&:hover': { textDecoration: 'underline' }
                                }}
                            >
                                Level up bonus details <Iconify icon="eva:arrow-ios-forward-fill" width={16} />
                            </Box>

                            <UnlockButton>Unlock Level-up Bonus</UnlockButton>
                        </Box>
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Box
                                component="img"
                                src={levelUpImage}
                                sx={{
                                    maxWidth: '100%',
                                    width: { xs: '90%', sm: '70%', md: '500px' },
                                    objectFit: 'contain'
                                }}
                            />
                        </Box>
                    </Grid>
                </Grid>

                {/* Row 2: Rakeback */}
                <Grid container spacing={4} alignItems="center" direction={{ xs: 'column-reverse', md: 'row' }}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Box
                                component="img"
                                src={bonusImage}
                                sx={{
                                    maxWidth: '100%',
                                    width: { xs: '70%', sm: '50%', md: '350px' },
                                    objectFit: 'contain',
                                    filter: 'hue-rotate(90deg)'
                                }}
                            />
                        </Box>
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: { xs: 'center', md: 'flex-start' },
                                textAlign: { xs: 'center', md: 'left' },
                                px: { md: 6 }
                            }}
                        >
                            <Typography
                                variant="h3"
                                fontWeight={800}
                                sx={{
                                    color: '#fff',
                                    mb: 2,
                                    lineHeight: 1.2,
                                    fontFamily: 'Inter, sans-serif',
                                    fontSize: { xs: '1.8rem', md: '2.5rem' }
                                }}
                            >
                                Maximize the Potential of
                                <br />
                                Rakeback
                            </Typography>

                            <Typography
                                variant="body1"
                                sx={{ color: '#b0a8ba', mb: 3, fontSize: '0.95rem', maxWidth: 450 }}
                            >
                                Unlock your potential with our Rakeback program! Earn bonuses with every wager and watch
                                your balance grow continuously.
                            </Typography>

                            <Box
                                component="a"
                                href="/rakeback"
                                sx={{
                                    color: '#38f84c',
                                    textDecoration: 'none',
                                    fontSize: '0.9rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    '&:hover': { textDecoration: 'underline' }
                                }}
                            >
                                Rakeback Details <Iconify icon="eva:arrow-ios-forward-fill" width={16} />
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}
