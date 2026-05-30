import { useRef, useState } from 'react';
// @mui
import { Box, Button, Stack, Typography, useTheme, IconButton, Popover, Badge } from '@mui/material';
// hook
import { usePathname, useRouter } from 'routes/hook';
import { useAuth } from 'hooks/use-auth-context';
import { useResponsive } from 'hooks/use-responsive';
// locales
import { useTranslate } from 'locales';
// icons
import { SearchIcon, WorldIcon } from 'icons';
import { Add } from '@mui/icons-material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import NotificationsIcon from '@mui/icons-material/Notifications';
// components
import ColorButton from 'components/ColorButton';
import { useSettingsContext } from 'components/settings';
// store
import { useSelector } from 'store/store';
// utils
import { fBalance } from 'utils/format-balance';
//
import AccountPopover from './account-popover';
import { headerTabs } from 'data';

const Header = ({
    onHandleNav,
    onHandleNotification
}: {
    onHandleNav: () => void;
    onHandleNotification: () => void;
}) => {
    const theme = useTheme();
    const router = useRouter();
    const pathname = usePathname();
    const { t } = useTranslate();
    const { isLogined, user } = useAuth();
    const isMobile = useResponsive('down', 'sm');
    const { onToggleModal } = useSettingsContext();
    const balance = useSelector((state: any) => state.balance);
    const notification = useSelector((state: any) => state.notification);
    const anchorBalanceEl2 = useRef<HTMLDivElement | null>(null);
    const [showBalance, setShowBalance] = useState(false);

    const anchorBalanceOpen = (event: any) => {
        if (showBalance) {
            setShowBalance(false);
        } else {
            setShowBalance(true);
        }
    };

    const handleBalanceClose = () => {
        setShowBalance(false);
    };

    const commonButtonStyle = {
        padding: 0,
        minWidth: 0,
        width: { xs: '2rem', sm: '2.5rem' },
        height: { xs: '2rem', sm: '2.5rem' },
        borderRadius: '.5rem',
        bgcolor: 'background.layer5',
        marginRight: '10px',
        display: { xs: 'none', sm: 'block' }
    };

    return (
        <Stack
            component="header"
            direction="row"
            sx={{
                width: 1,
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1201,
                height: '70px',
                alignItems: 'center',
                boxShadow: 'none',
                borderBottom: '1px solid',
                borderColor: 'background.border',
                bgcolor: 'background.layer1',
                backdropFilter: 'blur(6px)'
            }}
        >
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{
                    width: 1,
                    height: 1,
                    px: { xs: 2, md: 3, lg: 4 },
                    maxWidth: 1600,
                    mx: 'auto'
                }}
            >
                {/* Left Section: Mobile Menu, Logo, Desktop Tabs */}
                <Stack direction="row" alignItems="center" spacing={2}>
                    <IconButton
                        onClick={onHandleNav}
                        sx={{
                            display: { lg: 'none' },
                            color: 'text.secondary'
                        }}
                    >
                        <Box
                            sx={{
                                width: 24,
                                height: 24,
                                background: `url(/assets/icons/icons-1.webp) -128px -128px no-repeat`, // Menu icon
                                backgroundSize: 'cover', // Adjust if sprite needs scaling
                                transform: 'scale(1)'
                            }}
                        />
                    </IconButton>

                    <Box
                        component="img"
                        src="/logo.webp"
                        onClick={() => router.push('/')}
                        sx={{
                            height: { xs: 32, md: 40 },
                            cursor: 'pointer',
                            display: 'block'
                        }}
                    />

                    {/* Desktop Navigation Tabs */}
                    <Stack
                        direction="row"
                        spacing={1}
                        sx={{
                            display: { xs: 'none', lg: 'flex' },
                            ml: 4
                        }}
                    >
                        {headerTabs.map((tab) => {
                            const isActive = pathname === tab.path;
                            return (
                                <Stack
                                    key={tab.label}
                                    direction="row"
                                    alignItems="center"
                                    onClick={() => router.push(tab.path)}
                                    spacing={1}
                                    sx={{
                                        cursor: 'pointer',
                                        px: 2,
                                        py: 1,
                                        borderRadius: 2,
                                        transition: 'all 0.2s',
                                        bgcolor: isActive ? 'background.layer3' : 'transparent',
                                        '&:hover': {
                                            bgcolor: 'background.layer3',
                                            '& .label': { color: 'primary.main' }
                                        }
                                    }}
                                >
                                    <Box
                                        component="img"
                                        src={tab.icon}
                                        sx={{
                                            width: 20,
                                            height: 20,
                                            filter: isActive ? 'none' : 'grayscale(100%) opacity(0.7)'
                                        }}
                                    />
                                    <Typography
                                        className="label"
                                        variant="subtitle2"
                                        sx={{
                                            fontWeight: 600,
                                            color: isActive ? 'primary.main' : 'text.secondary',
                                            transition: 'color 0.2s'
                                        }}
                                    >
                                        {t(tab.label)}
                                    </Typography>
                                </Stack>
                            );
                        })}
                    </Stack>
                </Stack>

                {/* Right Section: Actions */}
                <Stack direction="row" alignItems="center" spacing={{ xs: 1, sm: 2 }}>
                    {/* Search Button (Desktop) */}
                    <IconButton
                        onClick={() => onToggleModal('EXPLORE')}
                        sx={{
                            display: { xs: 'none', sm: 'inline-flex' },
                            color: 'text.secondary',
                            bgcolor: 'background.layer3',
                            borderRadius: '50%',
                            p: 1.2,
                            '&:hover': { bgcolor: 'background.layer4', color: 'text.primary' }
                        }}
                    >
                        <SearchIcon sx={{ fontSize: 20 }} />
                    </IconButton>

                    {/* Not Logged In Actions */}
                    {!isLogined && (
                        <>
                            <Button
                                onClick={() => onToggleModal('SIGNIN')}
                                sx={{
                                    color: 'text.primary',
                                    fontWeight: 600,
                                    textTransform: 'none',
                                    display: { xs: 'none', sm: 'flex' },
                                    '&:hover': { color: 'primary.main', bgcolor: 'transparent' }
                                }}
                            >
                                {t('Sign in')}
                            </Button>
                            <ColorButton
                                onClick={() => onToggleModal('SIGNUP')}
                                sx={{
                                    px: { xs: 2, sm: 3 },
                                    height: { xs: '2.25rem', sm: '2.5rem' },
                                    fontSize: { xs: '0.8125rem', sm: '0.875rem' },
                                    textTransform: 'none'
                                }}
                            >
                                {t('Sign up')}
                            </ColorButton>
                        </>
                    )}

                    {/* Logged In Actions */}
                    {isLogined && (
                        <>
                            {/* Balance Component */}
                            <Stack
                                direction="row"
                                alignItems="center"
                                spacing={1}
                                onClick={anchorBalanceOpen}
                                ref={anchorBalanceEl2}
                                sx={{
                                    cursor: 'pointer',
                                    bgcolor: 'background.layer3',
                                    borderRadius: 2,
                                    px: 1.5,
                                    py: 0.8,
                                    border: '1px solid',
                                    borderColor: 'background.border',
                                    display: { xs: 'none', sm: 'flex' }
                                }}
                            >
                                <Box component="img" src={balance.icon} sx={{ width: 20, height: 20 }} />
                                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                                    {balance.amount.toFixed(2)}
                                </Typography>
                                <ArrowDropDownIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                            </Stack>

                            {/* Balance Popover */}
                            {anchorBalanceEl2.current && (
                                <Popover
                                    open={showBalance}
                                    anchorEl={anchorBalanceEl2.current}
                                    onClose={handleBalanceClose}
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                                    PaperProps={{
                                        sx: {
                                            mt: 1,
                                            width: 260,
                                            p: 2,
                                            bgcolor: 'background.layer2',
                                            backgroundImage: 'none',
                                            boxShadow: 24
                                        }
                                    }}
                                >
                                    <Stack spacing={1.5}>
                                        <Stack direction="row" justifyContent="space-between">
                                            <Typography variant="body2" color="text.secondary">
                                                Main
                                            </Typography>
                                            <Typography variant="subtitle2">{`${fBalance(balance.amount)} ${user?.currency}`}</Typography>
                                        </Stack>
                                        <Stack direction="row" justifyContent="space-between">
                                            <Typography variant="body2" color="text.secondary">
                                                Bonus
                                            </Typography>
                                            <Typography variant="subtitle2">{`${fBalance(balance.bonus)} ${user?.currency}`}</Typography>
                                        </Stack>
                                        <Stack direction="row" justifyContent="space-between">
                                            <Typography variant="body2" color="text.secondary">
                                                Withdrawable
                                            </Typography>
                                            <Typography variant="subtitle2">{`${fBalance(balance.withdrawable)} ${user?.currency}`}</Typography>
                                        </Stack>
                                    </Stack>
                                </Popover>
                            )}

                            {/* Deposit Button */}
                            <Button
                                onClick={() => onToggleModal('DEPOSIT')}
                                startIcon={<Add />}
                                sx={{
                                    bgcolor: 'primary.main',
                                    color: '#fff',
                                    backgroundImage: 'linear-gradient(90deg, #00BAE6 0%, #58D6FF 100%)',
                                    boxShadow: '0px 4px 10px rgba(0, 186, 230, 0.4)',
                                    borderRadius: 2,
                                    px: { xs: 1.5, sm: 2.5 },
                                    fontSize: { xs: '0.8125rem', sm: '0.875rem' },
                                    height: { xs: 32, sm: 40 },
                                    textTransform: 'none',
                                    fontWeight: 700,
                                    '&:hover': {
                                        backgroundImage: 'linear-gradient(90deg, #006C9C 0%, #00BAE6 100%)'
                                    }
                                }}
                            >
                                {t('Deposit')}
                            </Button>

                            {/* Notification */}
                            <IconButton
                                onClick={onHandleNotification}
                                sx={{
                                    display: { xs: 'none', md: 'inline-flex' },
                                    color: 'text.secondary',
                                    bgcolor: 'background.layer3',
                                    borderRadius: 2,
                                    p: 1,
                                    '&:hover': { bgcolor: 'background.layer4', color: 'text.primary' }
                                }}
                            >
                                <Badge badgeContent={notification.count} color="error" variant="dot">
                                    <NotificationsIcon sx={{ fontSize: 22 }} />
                                </Badge>
                            </IconButton>

                            {/* Profile Dropdown */}
                            <AccountPopover />
                        </>
                    )}

                    {/* Language Switcher */}
                    <IconButton
                        onClick={() => onToggleModal('LANGUAGE')}
                        sx={{
                            display: { xs: 'none', md: 'inline-flex' },
                            color: 'text.secondary',
                            bgcolor: 'background.layer3',
                            borderRadius: 2,
                            p: 1,
                            '&:hover': { bgcolor: 'background.layer4', color: 'text.primary' }
                        }}
                    >
                        <WorldIcon sx={{ fontSize: 22 }} />
                    </IconButton>
                </Stack>
            </Stack>
        </Stack>
    );
};

export default Header;
