import React, { useState, useCallback, useEffect, useRef } from 'react';
import gem from 'assets/gem.svg';
import bomb2 from 'assets/bomb2.svg';
import './style.css';
import Popup from 'components/offline-games/Popup';
import ruppee from 'assets/ruppee.svg';
import LostPopup from 'components/offline-games/LostPopup';
import clickSound from '../../assets/audio-mines-2.mp3';
import Loader from 'components/Loader';
import { useSelector, useDispatch } from 'store/store';
import { Box, Button, FormControl, FormLabel, Grid, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { startMines, clickMinesTile, cashoutMines, getActiveMinesGame, getUserBalance } from 'api';

const Mine = () => {
    const totalAmount = useSelector((state: any) => state.balance);
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const totalCells = 25;
    const array = Array.from({ length: 24 }, (_, i) => i + 1);

    const [visibleImages, setVisibleImages] = useState(Array(totalCells).fill(false));
    const [bombIndices, setBombIndices] = useState<number[]>([]);
    const [clickedIndices, setClickedIndices] = useState<number[]>([]);
    const [firstBombClicked, setFirstBombClicked] = useState(false);
    const [noOfBombs, setNoOfBombs] = useState(3);
    const [isBetStarted, setIsBetStarted] = useState(false);
    const [showPop, setShowPop] = useState(false);
    const [showLostPop, setShowLostPop] = useState(false);
    const [betAmount, setBetAmount] = useState('100.0');
    const [profitRatio, setProfitRatio] = useState('1.0');
    const [totalProfit, setTotalProfit] = useState('0.0');
    const [sentBet, setSentBet] = useState(0.0);
    const [loading, setLoading] = useState(false);

    const clickAudioRef = useRef<HTMLAudioElement>(null);

    // Check for active game on mount
    useEffect(() => {
        const checkActiveGame = async () => {
            try {
                setLoading(true);
                const response = await getActiveMinesGame();
                if (response.success && response.data) {
                    const {
                        betAmount: activeBet,
                        mineCount,
                        revealed,
                        currentPayout,
                        currentMultiplier
                    } = response.data;
                    setBetAmount(activeBet.toString());
                    setNoOfBombs(mineCount);
                    setIsBetStarted(true);
                    setClickedIndices(revealed);

                    // Update visible images
                    const newVisible = Array(totalCells).fill(false);
                    revealed.forEach((idx: number) => (newVisible[idx] = true));
                    setVisibleImages(newVisible);

                    setTotalProfit((currentPayout - activeBet).toFixed(2));
                    setProfitRatio(currentMultiplier.toFixed(2));
                }
            } catch (error) {
                // No active game or error, ignore
            } finally {
                setLoading(false);
            }
        };
        checkActiveGame();
    }, []);

    const updateBalance = async (newBalance?: number) => {
        if (newBalance !== undefined) {
            dispatch({ type: 'balance/setBalance', payload: newBalance });
        } else {
            try {
                const balanceData = await getUserBalance();
                if (balanceData && balanceData.amount !== undefined) {
                    dispatch({ type: 'balance/setBalance', payload: balanceData.amount });
                }
            } catch (error) {
                console.error('Failed to update balance:', error);
            }
        }
    };

    const reset = () => {
        setTotalProfit('0.0');
        setProfitRatio('1.0');
        setShowLostPop(false);
        setShowPop(false);
        setVisibleImages(Array(totalCells).fill(false));
        setClickedIndices([]);
        setBombIndices([]);
        setFirstBombClicked(false);
        setIsBetStarted(false);
    };

    const handleBetClicked = async () => {
        if (isBetStarted) {
            // Cashout
            try {
                setLoading(true);
                const response = await cashoutMines();
                if (response.success) {
                    const { payout, balance, mines } = response.data;
                    setSentBet(payout);
                    setShowPop(true);
                    setIsBetStarted(false);
                    if (mines) setBombIndices(mines);
                    setVisibleImages(Array(totalCells).fill(true));

                    updateBalance(balance);
                    enqueueSnackbar(`Cashed out ${payout.toFixed(2)}!`, { variant: 'success' });
                }
            } catch (error: any) {
                enqueueSnackbar(error.message || 'Failed to cashout', { variant: 'error' });
            } finally {
                setLoading(false);
            }
            return;
        }

        // Start Game
        if (!betAmount || parseFloat(betAmount) <= 0) {
            enqueueSnackbar('Enter a valid bet amount', { variant: 'error' });
            return;
        }
        if (parseFloat(betAmount) > totalAmount) {
            enqueueSnackbar('Not Enough Money', { variant: 'error' });
            return;
        }

        try {
            setLoading(true);
            reset();
            const response = await startMines(parseFloat(betAmount), noOfBombs);
            if (response.success) {
                setIsBetStarted(true);
                updateBalance();
            }
        } catch (error: any) {
            enqueueSnackbar(error.response?.data?.message || error.message || 'Failed to start game', {
                variant: 'error'
            });
        } finally {
            setLoading(false);
        }
    };

    const handleClick = useCallback(
        async (e: React.MouseEvent, index: number) => {
            if (!isBetStarted || firstBombClicked || visibleImages[index] || loading) {
                return;
            }

            // Animation
            const target = e.target as HTMLElement;
            target.classList.add('animate-click');
            setTimeout(() => target.classList.remove('animate-click'), 600);

            try {
                const response = await clickMinesTile(index);

                if (response.success) {
                    const { status, mines, payout, multiplier, balance, currentPayout, currentMultiplier } =
                        response.data;

                    if (status === 'loss') {
                        // Boom
                        setBombIndices(mines);
                        setFirstBombClicked(true);
                        setVisibleImages(Array(totalCells).fill(true));
                        setShowLostPop(true);
                        setIsBetStarted(false);
                        updateBalance();
                    } else if (status === 'win') {
                        // Auto Cashout (All gems found)
                        clickAudioRef.current?.play();
                        setClickedIndices((prev) => [...prev, index]);
                        setVisibleImages((prev) => {
                            const newVis = [...prev];
                            newVis[index] = true;
                            return newVis;
                        });

                        setSentBet(payout);
                        setShowPop(true);
                        setIsBetStarted(false);
                        setTotalProfit((payout - parseFloat(betAmount)).toFixed(2));
                        setProfitRatio(multiplier.toFixed(2));
                        updateBalance(balance);
                        enqueueSnackbar(`You Won! Payout: ${payout}`, { variant: 'success' });
                    } else {
                        // Gem found, continue
                        clickAudioRef.current?.play();
                        setClickedIndices((prev) => [...prev, index]);
                        setVisibleImages((prev) => {
                            const newVis = [...prev];
                            newVis[index] = true;
                            return newVis;
                        });

                        setTotalProfit((currentPayout - parseFloat(betAmount)).toFixed(2));
                        setProfitRatio(currentMultiplier.toFixed(2));
                    }
                }
            } catch (error: any) {
                enqueueSnackbar(error.response?.data?.message || error.message || 'Failed to click tile', {
                    variant: 'error'
                });
            }
        },
        [isBetStarted, firstBombClicked, visibleImages, loading, betAmount, enqueueSnackbar, totalCells]
    );

    const isClickedByUser = (index: number) => clickedIndices.includes(index);

    return (
        <Box sx={{ bgcolor: '#1a2c38', padding: '1rem' }}>
            <Loader />
            <Box sx={{ bgcolor: '#0f212e', maxWidth: '1536px', margin: '0 auto', borderRadius: 2, overflow: 'hidden' }}>
                <Grid container>
                    <Grid size={{ xs: 12, md: 3 }} sx={{ order: { xs: 2, md: 1 }, bgcolor: '#213743', py: 5, px: 3 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                            <Box display="flex" flexDirection="column" gap={1}>
                                <Typography variant="body2" sx={{ color: 'rgb(148 163 184)', fontWeight: 500 }}>
                                    Bet Amount
                                </Typography>
                                <Box sx={{ display: 'flex', bgcolor: '#2f4553', p: '4px', borderRadius: 1 }}>
                                    <TextField
                                        id="betAmount"
                                        type="number"
                                        disabled={isBetStarted}
                                        value={betAmount}
                                        onChange={(e) => setBetAmount(e.target.value)}
                                        size="small"
                                        sx={{
                                            width: '55%',
                                            input: {
                                                bgcolor: '#0f212e',
                                                color: '#fff',
                                                fontWeight: 500,
                                                padding: '10px'
                                            },
                                            '& fieldset': { border: 'none' }
                                        }}
                                    />
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            width: '45%',
                                            color: '#fff',
                                            fontWeight: 600,
                                            fontSize: '14px',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <Button
                                            disabled={isBetStarted}
                                            onClick={() => setBetAmount((amt) => (Number(amt) / 2).toFixed(2))}
                                            sx={{ width: '50%', color: '#fff', '&:hover': { bgcolor: '#557086' } }}
                                        >
                                            ½
                                        </Button>
                                        <Box
                                            sx={{
                                                width: '3px',
                                                height: '20px',
                                                bgcolor: '#1a2c38',
                                                borderRadius: '4px'
                                            }}
                                        />
                                        <Button
                                            disabled={isBetStarted}
                                            onClick={() => setBetAmount((amt) => (Number(amt) * 2).toFixed(2))}
                                            sx={{ width: '50%', color: '#fff', '&:hover': { bgcolor: '#557086' } }}
                                        >
                                            2×
                                        </Button>
                                    </Box>
                                </Box>
                            </Box>
                            {isBetStarted ? (
                                <Box display="flex" flexDirection="column" gap={2.5}>
                                    <Grid container spacing={2}>
                                        <Grid size={6}>
                                            <Box display="flex" flexDirection="column" gap={1}>
                                                <Typography
                                                    variant="body2"
                                                    sx={{ color: 'rgb(148 163 184)', fontWeight: 500 }}
                                                >
                                                    Mines
                                                </Typography>
                                                <Box
                                                    sx={{
                                                        bgcolor: '#2f4553',
                                                        color: '#fff',
                                                        px: 2,
                                                        py: 1.5,
                                                        borderRadius: 1,
                                                        border: '2px solid #2f4553',
                                                        fontSize: '14px',
                                                        fontWeight: 500,
                                                        boxShadow: '0px 0px 6px rgba(0,0,0,0.35)'
                                                    }}
                                                >
                                                    {noOfBombs}
                                                </Box>
                                            </Box>
                                        </Grid>
                                        <Grid size={6}>
                                            <Box display="flex" flexDirection="column" gap={1}>
                                                <Typography
                                                    variant="body2"
                                                    sx={{ color: 'rgb(148 163 184)', fontWeight: 500 }}
                                                >
                                                    Gems
                                                </Typography>
                                                <Box
                                                    sx={{
                                                        bgcolor: '#2f4553',
                                                        color: '#fff',
                                                        px: 2,
                                                        py: 1.5,
                                                        borderRadius: 1,
                                                        border: '2px solid #2f4553',
                                                        fontSize: '14px',
                                                        fontWeight: 500,
                                                        boxShadow: '0px 0px 6px rgba(0,0,0,0.35)'
                                                    }}
                                                >
                                                    {25 - noOfBombs - clickedIndices.length}
                                                </Box>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                    <Box display="flex" flexDirection="column" gap={1}>
                                        <Typography variant="body2" sx={{ color: 'rgb(148 163 184)', fontWeight: 500 }}>
                                            Total Profit ({profitRatio}×)
                                        </Typography>
                                        <Box
                                            sx={{
                                                bgcolor: '#2f4553',
                                                color: '#fff',
                                                px: 2,
                                                py: 1.5,
                                                borderRadius: 1,
                                                border: '2px solid #2f4553',
                                                fontSize: '14px',
                                                fontWeight: 500,
                                                boxShadow: '0px 0px 6px rgba(0,0,0,0.35)',
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <span>{totalProfit}</span>
                                            <Box
                                                component="img"
                                                src={ruppee}
                                                sx={{ width: 16, height: 16 }}
                                                alt="Rs."
                                            />
                                        </Box>
                                    </Box>
                                </Box>
                            ) : (
                                <FormControl fullWidth size="small" disabled={isBetStarted} sx={{ mt: 2 }}>
                                    <FormLabel sx={{ color: 'text.secondary', fontSize: '0.85rem', mb: 0.5 }}>
                                        Mines
                                    </FormLabel>
                                    <Select
                                        id="minesNo"
                                        value={noOfBombs}
                                        onChange={(e) => setNoOfBombs(parseInt(e.target.value as unknown as string))}
                                        sx={{
                                            bgcolor: '#0f212e',
                                            color: 'white',
                                            border: '1px solid #475569',
                                            fontSize: '0.85rem',
                                            '& .MuiSelect-select': { py: 1.2 }
                                        }}
                                    >
                                        {array.map((no) => (
                                            <MenuItem key={no} value={no}>
                                                {no}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            )}
                        </Box>
                        <Button
                            fullWidth
                            variant="contained"
                            onClick={handleBetClicked}
                            disabled={loading}
                            sx={{
                                mt: 2,
                                py: 1.5,
                                fontWeight: 600,
                                backgroundColor: '#00e701',
                                '&:hover': { backgroundColor: '#1fff20' },
                                borderRadius: 2
                            }}
                        >
                            {isBetStarted ? 'Cashout' : 'Bet'}
                        </Button>
                    </Grid>
                    <Grid
                        size={{ xs: 12, md: 9 }}
                        sx={{
                            m: '0 auto',
                            py: { sm: 3, xs: 1.5 },
                            position: 'relative',
                            width: '100%',
                            boxSizing: 'border-box',
                            order: { xs: 1, md: 2 }
                        }}
                    >
                        <Box sx={{ display: showPop ? 'block' : 'none' }}>
                            <Popup hidden={!showPop} profitRatio={profitRatio} totalWin={sentBet.toFixed(2)} />
                        </Box>
                        <Box sx={{ display: showLostPop ? 'block' : 'none' }}>
                            <LostPopup hidden={!showLostPop} />
                        </Box>
                        <Box sx={{ px: 1.5 }}>
                            <Grid container spacing={{ xs: 1.5, sm: 3 }}>
                                {Array.from({ length: totalCells }).map((_, index) => {
                                    const visible = !!visibleImages[index];
                                    const isBomb = bombIndices.includes(index);
                                    const clickedByUser = isClickedByUser(index);
                                    return (
                                        <Grid key={index} size={12 / 5}>
                                            <Box
                                                onClick={(e) => handleClick(e, index)}
                                                role="button"
                                                tabIndex={0}
                                                sx={{
                                                    width: { sm: '6.5rem', xs: 'auto' },
                                                    height: { sm: '7rem', xs: '4.1rem' },
                                                    maxWidth: '100%',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    borderRadius: 2,
                                                    transition: 'transform 0.3s ease, background-color 0.3s ease',
                                                    bgcolor: visible ? '#071822' : '#2f4553',
                                                    cursor: visible ? 'default' : 'pointer',
                                                    borderBottom: visible
                                                        ? 'none'
                                                        : { xs: '4px solid #213743', sm: '8px solid #213743' },
                                                    '&:hover': visible
                                                        ? {}
                                                        : { transform: 'translateY(-6px)', bgcolor: '#557086' },
                                                    p: 1,
                                                    boxSizing: 'border-box'
                                                }}
                                            >
                                                <Box
                                                    component="img"
                                                    src={isBomb ? bomb2 : gem}
                                                    alt={isBomb ? 'bomb' : 'gem'}
                                                    sx={{
                                                        display: visible ? 'block' : 'none',
                                                        width: clickedByUser ? { sm: 80, xs: 40 } : { sm: 48, xs: 24 },
                                                        height: clickedByUser ? { sm: 80, xs: 40 } : { sm: 48, xs: 24 },
                                                        opacity: visible ? 1 : 0.3,
                                                        objectFit: 'contain'
                                                    }}
                                                />
                                            </Box>
                                        </Grid>
                                    );
                                })}
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <audio ref={clickAudioRef} src={clickSound} />
        </Box>
    );
};

export default Mine;
