import { useState, useEffect, useRef } from 'react';
import { Box, Button, Grid, TextField, Typography, InputAdornment } from '@mui/material';
import { useSelector, useDispatch } from 'store/store';
import { useSnackbar } from 'notistack';
import './hilo.css';
import ruppee from 'assets/ruppee.svg';
import Loader from 'components/Loader';
import clubs from 'assets/clubs.svg';
import hearts from 'assets/hearts.svg';
import spades from 'assets/spades.svg';
import diamonds from 'assets/diamonds.svg';
import { generateCard } from 'utils/offline-games/hiloLogic';
import { playHiLo, getUserBalance } from 'api';

const HiLo = () => {
    const totalAmount = useSelector((state: any) => state.balance);
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const [betAmount, setBetAmount] = useState('100.0');
    const [currentCard, setCurrentCard] = useState(generateCard());
    const [nextCard, setNextCard] = useState<any>(null);
    const [isBetStarted, setIsBetStarted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [recentCardsArray, setRecentCardsArray] = useState<any[]>([]);

    const updateBalance = async () => {
        try {
            const balanceData = await getUserBalance();
            if (balanceData && balanceData.amount !== undefined) {
                dispatch({ type: 'balance/setBalance', payload: balanceData.amount });
            }
        } catch (error) {
            console.error('Failed to update balance:', error);
        }
    };

    const handleBet = async (choice: 'higher' | 'lower' | 'skip') => {
        if (choice !== 'skip') {
            if (!betAmount || parseFloat(betAmount) <= 0) {
                enqueueSnackbar('Enter a valid bet amount', { variant: 'error' });
                return;
            }
            if (parseFloat(betAmount) > totalAmount) {
                enqueueSnackbar('Not Enough Money', { variant: 'error' });
                return;
            }
        }

        setLoading(true);
        setIsBetStarted(true);

        try {
            const response = await playHiLo(parseFloat(betAmount), choice, currentCard.cardNumber);

            if (response.success) {
                const { nextCard: newCard, win, payout, newBalance, multiplier } = response.data;

                setNextCard(newCard);

                setTimeout(() => {
                    // Update history
                    const historyItem = {
                        card: currentCard,
                        isSkipped: choice === 'skip',
                        isLost: !win && choice !== 'skip',
                        isHigher: choice === 'higher',
                        desc: choice === 'skip' ? 'Skipped' : win ? multiplier.toFixed(2) + 'x' : '0.00x'
                    };
                    setRecentCardsArray((prev) => [historyItem, ...prev].slice(0, 10));

                    setCurrentCard(newCard);
                    setNextCard(null);
                    setLoading(false);
                    setIsBetStarted(false);

                    if (choice !== 'skip') {
                        if (win) {
                            enqueueSnackbar(`You Won! Payout: ${payout}`, { variant: 'success' });
                        } else {
                            enqueueSnackbar('You Lost!', { variant: 'error' });
                        }
                    }

                    dispatch({ type: 'balance/setBalance', payload: newBalance });
                }, 1000);
            } else {
                setLoading(false);
                setIsBetStarted(false);
                enqueueSnackbar(response.message || 'Failed to play', { variant: 'error' });
            }
        } catch (error: any) {
            setLoading(false);
            setIsBetStarted(false);
            const errorMessage = error.response?.data?.message || error.message || 'Failed to play';
            enqueueSnackbar(errorMessage, { variant: 'error' });
        }
    };

    const calculateMultiplier = (card: number, type: 'higher' | 'lower') => {
        if (type === 'higher') {
            return card === 1 ? 1.07 : (13 / (14 - card)) * 0.99;
        } else {
            return card === 13 ? 1.07 : (13 / card) * 0.99;
        }
    };

    return (
        <Box sx={{ bgcolor: '#1a2c38', minHeight: '100vh', pt: 4, px: 1.5 }}>
            <Loader />
            <Box
                sx={{
                    bgcolor: '#0f212e',
                    maxWidth: '1536px',
                    mx: 'auto',
                    borderRadius: 2,
                    overflow: 'hidden',
                    height: '100%'
                }}
            >
                <Grid container sx={{ height: '100%' }}>
                    <Grid size={{ xs: 12, md: 3 }} sx={{ order: { xs: 2, md: 1 }, bgcolor: '#213743', py: 5, px: 3 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                <Typography
                                    component="label"
                                    htmlFor="betAmount"
                                    variant="body2"
                                    sx={{ color: 'rgb(148 163 184)', fontWeight: 500 }}
                                >
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
                                        slotProps={{
                                            input: {
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <Box
                                                            component="img"
                                                            src={ruppee}
                                                            sx={{ width: 16, height: 16 }}
                                                            alt="Rs."
                                                        />
                                                    </InputAdornment>
                                                )
                                            }
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
                                            sx={{
                                                width: '50%',
                                                color: '#fff',
                                                '&:hover': { bgcolor: '#557086' },
                                                minWidth: 0
                                            }}
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
                                            sx={{
                                                width: '50%',
                                                color: '#fff',
                                                '&:hover': { bgcolor: '#557086' },
                                                minWidth: 0
                                            }}
                                        >
                                            2×
                                        </Button>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                        <Button
                            fullWidth
                            variant="contained"
                            disabled={isBetStarted}
                            onClick={() => handleBet('skip')}
                            sx={{
                                mt: 4,
                                py: 1.5,
                                fontWeight: 600,
                                backgroundColor: '#2f4553',
                                '&:hover': { backgroundColor: '#3e5b6d' },
                                borderRadius: 2
                            }}
                        >
                            Skip Card
                        </Button>
                    </Grid>
                    <Grid
                        size={{ xs: 12, md: 9 }}
                        sx={{ position: 'relative', width: '100%', height: '85vh', p: 2, order: { xs: 1, md: 2 } }}
                    >
                        <Box
                            sx={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 4
                            }}
                        >
                            <Box sx={{ position: 'relative', height: 200, width: 140 }}>
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        transition: 'all 0.5s',
                                        transform: nextCard ? 'translateX(-150%)' : 'translateX(0)'
                                    }}
                                >
                                    <Card card={currentCard} />
                                </Box>
                                {nextCard && (
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            animation: 'slideIn 0.5s forwards'
                                        }}
                                    >
                                        <Card card={nextCard} />
                                    </Box>
                                )}
                            </Box>

                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <Button
                                    variant="contained"
                                    disabled={isBetStarted}
                                    onClick={() => handleBet('lower')}
                                    sx={{
                                        bgcolor: '#2f4553',
                                        '&:hover': { bgcolor: '#3e5b6d' },
                                        minWidth: 120,
                                        display: 'flex',
                                        flexDirection: 'column'
                                    }}
                                >
                                    <Typography>Lower or Same</Typography>
                                    <Typography variant="caption">
                                        {calculateMultiplier(currentCard.cardNumber, 'lower').toFixed(2)}x
                                    </Typography>
                                </Button>
                                <Button
                                    variant="contained"
                                    disabled={isBetStarted}
                                    onClick={() => handleBet('higher')}
                                    sx={{
                                        bgcolor: '#2f4553',
                                        '&:hover': { bgcolor: '#3e5b6d' },
                                        minWidth: 120,
                                        display: 'flex',
                                        flexDirection: 'column'
                                    }}
                                >
                                    <Typography>Higher or Same</Typography>
                                    <Typography variant="caption">
                                        {calculateMultiplier(currentCard.cardNumber, 'higher').toFixed(2)}x
                                    </Typography>
                                </Button>
                            </Box>
                        </Box>

                        {/* History Scroll */}
                        <Box
                            sx={{
                                position: 'absolute',
                                top: 16,
                                right: 16,
                                display: 'flex',
                                gap: 0.5,
                                maxWidth: '24rem',
                                overflowX: 'auto'
                            }}
                        >
                            {recentCardsArray.map((item, index) => (
                                <Box
                                    key={index}
                                    sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                                >
                                    <Card card={item.card} small />
                                    <Typography variant="caption" sx={{ color: item.isLost ? '#e9113c' : '#00e701' }}>
                                        {item.desc}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

const Card = ({ card, small }: any) => {
    const [cardNumber, setCardNumber] = useState<any>(null);
    const [colorSrc, setColorSrc] = useState<any>(null);
    const [textColor, setTextColor] = useState<any>(null);

    useEffect(() => {
        switch (card.cardNumber) {
            case 1:
                setCardNumber('A');
                break;
            case 11:
                setCardNumber('J');
                break;
            case 12:
                setCardNumber('Q');
                break;
            case 13:
                setCardNumber('K');
                break;
            default:
                setCardNumber(card.cardNumber);
                break;
        }
        switch (card.cardColor) {
            case 1:
                setColorSrc(hearts);
                setTextColor('#e9113c');
                break;
            case 2:
                setColorSrc(diamonds);
                setTextColor('#e9113c');
                break;
            case 3:
                setColorSrc(spades);
                setTextColor('#1a2c38');
                break;
            case 4:
                setColorSrc(clubs);
                setTextColor('#1a2c38');
                break;
            default:
                break;
        }
    }, [card]);

    return (
        <Box
            sx={{
                bgcolor: 'white',
                width: small ? 40 : 120,
                height: small ? 64 : 189.6,
                borderRadius: small ? 0.5 : 1,
                boxShadow: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: textColor
            }}
        >
            <Typography sx={{ fontWeight: 'bold', fontSize: small ? '1.125rem' : '3rem', lineHeight: 1 }}>
                {cardNumber}
            </Typography>
            <Box component="img" src={colorSrc} sx={{ width: small ? 16 : 50 }} />
        </Box>
    );
};

export default HiLo;
