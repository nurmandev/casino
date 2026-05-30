import { useState } from 'react';
import { allLangs, useTranslate } from 'locales';
// @mui
import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Dialog, DialogContent, Grid, Stack, Typography, useTheme } from '@mui/material';
// api
import { updatePreference } from 'api';
// components
import { useSettingsContext } from 'components/settings';
// hooks
import { useAuth } from 'hooks/use-auth-context';

const LanguageModal = () => {
    const theme = useTheme();
    const { language, setLanguage } = useAuth();
    const { t, onChangeLang } = useTranslate();
    const { modal, onToggleModal } = useSettingsContext();
    const [tab, setTab] = useState('language');

    const updateLanguage = async (value: string) => {
        try {
            updatePreference({ language: value });
        } catch (error) {
            console.log(error);
        }
        onChangeLang(value);
        setLanguage(value);
    };

    return (
        <Dialog
            open={modal === 'LANGUAGE'}
            onClose={() => onToggleModal('')}
            maxWidth="md"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 2,
                    bgcolor: 'background.paper',
                    backgroundImage: 'none',
                    boxShadow: 24,
                    maxWidth: '800px',
                    m: 2
                }
            }}
        >
            <Box sx={{ position: 'relative', p: 0 }}>
                {/* Header / Tabs */}
                <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 3, pt: 2, pb: 0 }}>
                    <Stack direction="row" spacing={4}>
                        <Box
                            onClick={() => setTab('language')}
                            sx={{
                                pb: 2,
                                px: 1,
                                cursor: 'pointer',
                                color: tab === 'language' ? 'primary.main' : 'text.secondary',
                                borderBottom: tab === 'language' ? 2 : 0,
                                borderColor: 'primary.main',
                                fontWeight: 700,
                                fontSize: '1rem'
                            }}
                        >
                            {t('Language')}
                        </Box>
                        <Box
                            onClick={() => setTab('fiat')}
                            sx={{
                                pb: 2,
                                px: 1,
                                cursor: 'pointer',
                                color: tab === 'fiat' ? 'primary.main' : 'text.secondary',
                                borderBottom: tab === 'fiat' ? 2 : 0,
                                borderColor: 'primary.main',
                                fontWeight: 700,
                                fontSize: '1rem'
                            }}
                        >
                            {t('View In Fiat')}
                        </Box>
                    </Stack>
                    <Button onClick={() => onToggleModal('')} sx={{ minWidth: 0, p: 1, borderRadius: '50%', mb: 1 }}>
                        <CloseIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                    </Button>
                </Stack>
                <Box sx={{ width: '100%', height: '1px', bgcolor: 'divider' }} />

                {/* Content */}
                <DialogContent sx={{ p: 3, minHeight: 300 }}>
                    {tab === 'language' && (
                        <Grid container spacing={2}>
                            {allLangs.map((item) => {
                                const active = language === item.value;
                                return (
                                    <Grid size={{ xs: 6, sm: 3 }} key={item.value}>
                                        <Box
                                            onClick={() => updateLanguage(item.value)}
                                            sx={{
                                                p: 1.5,
                                                borderRadius: 1.5,
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'flex-start',
                                                background: active
                                                    ? 'linear-gradient(90deg, #00BAE6 0%, rgba(0, 186, 230, 0.0) 100%)'
                                                    : 'transparent',
                                                transition: 'all 0.2s',
                                                '&:hover': {
                                                    bgcolor: active ? undefined : 'action.hover'
                                                }
                                            }}
                                        >
                                            <Typography
                                                variant="subtitle2"
                                                sx={{
                                                    fontWeight: active ? 700 : 500,
                                                    color: active ? '#fff' : 'text.primary'
                                                }}
                                            >
                                                {item.label}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                );
                            })}
                        </Grid>
                    )}
                    {tab === 'fiat' && (
                        <Box sx={{ p: 3, textAlign: 'center' }}>
                            <Typography color="text.secondary">Fiat currency selection coming soon.</Typography>
                        </Box>
                    )}
                </DialogContent>

                {/* Footer */}
                <Box sx={{ px: 3, py: 2, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                        onClick={() => onToggleModal('')}
                        sx={{
                            color: 'text.secondary',
                            textTransform: 'none',
                            fontWeight: 600,
                            fontSize: '0.9rem',
                            '&:hover': { color: 'text.primary' }
                        }}
                    >
                        {t('Cancel')}
                    </Button>
                </Box>
            </Box>
        </Dialog>
    );
};

export default LanguageModal;
