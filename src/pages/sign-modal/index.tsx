import { useTranslate } from 'locales';
// @mui
import { Box, Modal, Stack, styled, Typography } from '@mui/material';
// components
import { useSettingsContext } from 'components/settings';
// hooks
import { useResponsive } from 'hooks/use-responsive';
//
import SignInModal from './sign-in-modal';
import SignUpModal from './sign-up-modal';
import ForgotPasswordModal from './forgot-password-modal';
import { useSearchParams } from 'routes/hook';
import { useEffect } from 'react';

const SignModal = () => {
    const searchParams = useSearchParams();
    const referralCode = searchParams.get('r');
    const { t } = useTranslate();
    const isMobile = useResponsive('down', 'sm');
    const { modal, onToggleModal } = useSettingsContext();

    const handleClose = () => onToggleModal('');

    const StyledModal = styled(Modal)(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflowY: 'auto',
        background: 'rgba(0, 0, 0, 0.667)'
    }));

    const ModalContent = styled(Box)(({ theme }) => ({
        display: 'flex',
        flex: '1 1',
        backgroundColor: theme.palette.background.default,
        overflow: 'hidden',
        width: '100%',
        height: isMobile ? '100%' : 'auto',
        borderRadius: isMobile ? 0 : (theme.shape.borderRadius as number) * 3,
        maxWidth: isMobile ? 'auto' : '800px',
        position: 'relative',
        '&:focus': { outline: 'none' }
    }));

    useEffect(() => {
        if (referralCode) {
            localStorage.setItem('betthrob-r', referralCode);
            onToggleModal('SIGNUP');
        }
    }, [referralCode]);

    return (
        <StyledModal open={['SIGNIN', 'SIGNUP', 'PASSWORD'].includes(modal)} onClose={handleClose}>
            <ModalContent>
                <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ overflow: 'auto', width: 1 }}>
                    <Stack
                        direction="column"
                        width={{ xs: '100%', sm: '50%' }}
                        height={{ sm: '650px' }}
                        position="relative"
                        sx={{
                            minHeight: isMobile ? 'auto' : '475px'
                        }}
                    >
                        <Box
                            component="img"
                            src={
                                isMobile
                                    ? '/assets/images/home/players-banner-mobile.webp'
                                    : '/assets/images/home/players-banner-full.webp'
                            }
                            alt="top-img"
                            sx={{
                                width: { xs: '100%' },
                                height: { xs: 'auto' },
                                position: { sm: 'absolute' },
                                right: 0,
                                top: { xs: 0 },
                                objectFit: { xs: 'unset' }
                            }}
                        />
                        <Box
                            component="img"
                            src="/logo.svg"
                            alt="bet-throb"
                            sx={{
                                position: 'absolute',
                                left: 14,
                                top: 25,
                                height: { xs: 27, sm: 32 }
                            }}
                        />
                        <Box
                            component="img"
                            src="/logo.svg"
                            alt="bet-throb"
                            sx={{
                                position: 'absolute',
                                left: 14,
                                top: 25,
                                height: { xs: 27, sm: 32 }
                            }}
                        />
                        <Stack
                            width="100%"
                            direction="column"
                            alignItems="center"
                            position="absolute"
                            left={0}
                            bottom={0}
                            sx={{
                                display: { xs: 'none', sm: 'block' }
                            }}
                        >
                            <Typography
                                variant="h3"
                                sx={{
                                    fontWeight: 800,
                                    lineHeight: '2.5rem',
                                    textAlign: 'center',
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                {t('stay_untamed')}
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: 14,
                                    fontWeight: 600,
                                    textAlign: 'center',
                                    m: '0.25rem 0 104px 0',
                                    mb: { xs: 2, sm: 10 },
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                {t('signup&get_welcome_bonus')}
                            </Typography>
                        </Stack>
                    </Stack>

                    <Stack direction="column" justifyContent="space-between" width={{ xs: '100%', sm: '50%' }}>
                        {modal === 'SIGNIN' && <SignInModal />}
                        {modal === 'SIGNUP' && <SignUpModal />}
                        {modal === 'PASSWORD' && <ForgotPasswordModal />}
                    </Stack>
                </Stack>
            </ModalContent>
        </StyledModal>
    );
};

export default SignModal;
