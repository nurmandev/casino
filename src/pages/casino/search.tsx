import { Stack, TextField, InputAdornment, Paper, Typography, Button, Chip } from '@mui/material';
import { getGamesBySearch } from 'api';
import { SUGGESTED } from 'config';
import { SearchIcon } from 'icons';
import { IGameList } from 'pages/explore';
import { useState, useRef, useEffect } from 'react';

function Search({
    search,
    setSearch,
    setGameList,
    setLoading
}: {
    search: string;
    setSearch: (value: string) => void;
    setLoading: (value: boolean) => void;
    setGameList: (value: IGameList[]) => void;
}) {
    const [historyOpen, setHistoryOpen] = useState(false);
    const [history, setHistory] = useState<string[]>([]);

    const containerRef = useRef<any>(null);
    const getGameLists = async () => {
        try {
            setLoading(true);
            const response = await getGamesBySearch(search, '', 1, 48);
            setGameList(response.data);
        } catch (error: any) {
            console.log('Getting Game List Error:', error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (search.length > 2) {
            getGameLists();
        } else {
            setGameList([]);
        }
    }, [search]);

    useEffect(() => {
        function handleClickOutside(event: any) {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setHistoryOpen(false);
            }
        }

        if (historyOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [historyOpen]);

    useEffect(() => {
        localStorage.setItem('search-history', JSON.stringify(history));
    }, [history]);
    const handleSearchChange = (value: string) => {
        if (value.length > 2) {
            setHistoryOpen(false);
            setHistory((prevHistory) => {
                const filtered = prevHistory.filter((item) => item !== value);
                const newHistory = [...filtered, value];
                if (newHistory.length > 10) {
                    newHistory.shift();
                }
                return newHistory;
            });
        } else {
            setHistoryOpen(true);
        }
        setSearch(value);
    };

    const handleFocus = () => {
        if (search.length < 3) setHistoryOpen(true);
    };

    const handleClearHistory = () => setHistory([]);
    const handleDeleteHistory = (item: any) => {
        setHistory(history.filter((h) => h !== item));
    };
    return (
        <Stack direction="column" gap={1} sx={{ position: 'relative', maxWidth: '100%' }} ref={containerRef}>
            <TextField
                fullWidth
                placeholder="Search games"
                value={search}
                onFocus={handleFocus}
                onChange={(e) => handleSearchChange(e.target.value)}
                sx={{
                    mb: 1.5,
                    '& .MuiOutlinedInput-root': { borderRadius: 3 },
                    '& .MuiOutlinedInput-input': { color: 'text.primary' }
                }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon color="action" />
                        </InputAdornment>
                    )
                }}
            />
            {historyOpen && (
                <Paper
                    elevation={8}
                    sx={{
                        position: 'absolute',
                        top: 60,
                        left: 0,
                        width: '100%',
                        bgcolor: 'background.default',
                        borderRadius: 3,
                        zIndex: 10,
                        p: 2,
                        boxShadow: 8
                    }}
                >
                    <Typography variant="h6" color="text.secondary" sx={{ mb: 1, textAlign: 'center' }}>
                        Search requires at least 3 characters.
                    </Typography>

                    {history.length > 0 && (
                        <>
                            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                                <Typography variant="subtitle2" color="text.secondary">
                                    History
                                </Typography>
                                <Button size="small" color="primary" onClick={handleClearHistory}>
                                    Clear search ({history.length})
                                </Button>
                            </Stack>
                            <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 2 }}>
                                {history.map((item) => (
                                    <Stack
                                        onClick={() => {
                                            setSearch(item);
                                            setHistoryOpen(false);
                                        }}
                                    >
                                        <Chip
                                            key={`history-${item}`}
                                            label={item}
                                            onDelete={() => handleDeleteHistory(item)}
                                            sx={{
                                                cursor: 'pointer',
                                                fontSize: '0.75rem',
                                                borderRadius: '0.375rem',
                                                height: 'auto',
                                                bgcolor: 'background.layer5',
                                                color: 'text.secondary'
                                            }}
                                        />
                                    </Stack>
                                ))}
                            </Stack>
                        </>
                    )}

                    <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                        Suggested
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap">
                        {SUGGESTED.map((item) => (
                            <Chip
                                key={`suggest-${item}`}
                                label={item}
                                sx={{
                                    fontSize: '0.75rem',
                                    borderRadius: '0.375rem',
                                    height: 'auto',
                                    bgcolor: 'background.layer5',
                                    color: 'text.secondary'
                                }}
                                onClick={() => {
                                    setSearch(item);
                                    setHistoryOpen(false);
                                }}
                            />
                        ))}
                    </Stack>
                </Paper>
            )}
        </Stack>
    );
}

export default Search;
