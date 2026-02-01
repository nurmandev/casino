import { useTranslate } from 'locales';
import parse from 'html-react-parser';
import { useEffect, useState, useMemo } from 'react';
// @mui
import {
    Box,
    Card,
    Stack,
    Typography,
    List,
    ListItemButton,
    ListItemText,
    ListItemIcon,
    MenuItem,
    Select,
    FormControl
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
// components
import Iconify from 'components/iconify';
import { settingApi } from 'api/setting.api';

// Styled components to match the screenshot
const SidebarItem = styled(ListItemButton)<{ selected?: boolean }>(({ theme, selected }) => ({
    borderRadius: Number(theme.shape.borderRadius),
    marginBottom: 4,
    padding: theme.spacing(1.5, 0), // Minimal padding left/right, let text indent handle it or just rely on icon
    paddingLeft: theme.spacing(1),
    transition: 'all 0.2s',
    backgroundColor: 'transparent', // Transparent background
    color: selected ? theme.palette.primary.main : theme.palette.text.secondary, // Green if selected
    '&:hover': {
        backgroundColor: alpha(theme.palette.text.primary, 0.05),
        color: selected ? theme.palette.primary.main : theme.palette.text.primary
    },
    '& .MuiListItemIcon-root': {
        color: 'inherit', // Icon follows text color
        minWidth: 40
    }
}));

const HelpContentCard = styled(Card)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper, // Dark grey card background
    borderRadius: Number(theme.shape.borderRadius) * 1.5,
    border: 'none',
    boxShadow: 'none',
    height: '100%',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column'
}));

const HelpCenter = () => {
    const { t, i18n } = useTranslate();
    const [data, setData] = useState<any[]>([]);
    const [help, setHelp] = useState<any>();
    // Mock game selection for "Provably Fair" look
    const [selectedGame, setSelectedGame] = useState('Crash');

    const loadData = async () => {
        try {
            const response = await settingApi.getHelps(i18n.language);
            setData(response);
            if (response.length > 0 && !help) {
                // Default to "Provably Fair" if it exists, otherwise first item
                const provablyFair = response.find(
                    (item: any) => item.title.includes('Provably Fair') || item.name?.includes('Provably Fair')
                );
                setHelp(provablyFair || response[0]);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        loadData();
    }, [i18n.language]);

    return (
        <Stack spacing={3} sx={{ height: 'calc(100vh - 100px)', pb: 2 }}>
            <Typography variant="h4" fontWeight="bold" sx={{ color: '#fff', mb: 2 }}>
                {t('helpCenter')}
            </Typography>

            <Stack direction={{ md: 'row', xs: 'column' }} spacing={4} sx={{ flex: 1, minHeight: 0 }}>
                {/* Local Sidebar */}
                <Box
                    sx={{
                        flex: { md: '0 0 240px', xs: '1 1 auto' },
                        maxHeight: { xs: '300px', md: '100%' },
                        overflowY: 'auto'
                    }}
                >
                    <List disablePadding>
                        {data.map((item) => (
                            <SidebarItem
                                key={item._id}
                                selected={help && help._id === item._id}
                                onClick={() => setHelp(item)}
                                disableRipple
                            >
                                <ListItemIcon>
                                    <Iconify icon={item.icon || 'fluent:book-question-mark-24-regular'} width={24} />
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.title}
                                    primaryTypographyProps={{
                                        variant: 'body1',
                                        fontWeight: help?._id === item._id ? 'bold' : 'medium'
                                    }}
                                />
                            </SidebarItem>
                        ))}
                    </List>
                </Box>

                {/* Content Area */}
                <HelpContentCard sx={{ flex: 1, bgcolor: '#191b1e' }}>
                    {help ? (
                        <Box sx={{ height: '100%', overflowY: 'auto', p: 4, '&::-webkit-scrollbar': { width: '8px' } }}>
                            {/* Specific UI for Provably Fair to match screenshot */}
                            {(help.title === 'Provably Fair' || help.title === 'Fairness') && (
                                <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Typography variant="subtitle1" fontWeight="bold" color="text.secondary">
                                        Game
                                    </Typography>
                                    <FormControl size="small" sx={{ minWidth: 200 }}>
                                        <Select
                                            value={selectedGame}
                                            onChange={(e) => setSelectedGame(e.target.value)}
                                            sx={{
                                                bgcolor: 'background.neutral',
                                                borderRadius: 1,
                                                '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                                                color: 'white'
                                            }}
                                        >
                                            <MenuItem value="Crash">Crash</MenuItem>
                                            <MenuItem value="Dice">Dice (Coming Soon)</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            )}

                            {/* Render HTML Content */}
                            <Box
                                sx={{
                                    typography: 'body1',
                                    color: 'text.secondary',
                                    lineHeight: 1.8,
                                    '& h1, & h2, & h3': { color: 'white', mt: 3, mb: 1.5, fontWeight: 'bold' },
                                    '& strong': { color: 'white' },
                                    '& p': { mb: 2 },
                                    '& ul': { pl: 3, mb: 2 },
                                    '& a': { color: 'primary.main', textDecoration: 'none' },
                                    '& .highlight': { color: 'primary.main', fontWeight: 'bold' } // Helper for colored text if in DB
                                }}
                            >
                                {parse(help.content || '')}
                            </Box>
                        </Box>
                    ) : (
                        <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Typography color="text.secondary">Select a topic</Typography>
                        </Box>
                    )}
                </HelpContentCard>
            </Stack>
        </Stack>
    );
};

export default HelpCenter;
