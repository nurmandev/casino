import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'store/store';
import { useSnackbar } from 'notistack';
import ruppee from 'assets/ruppee.svg';
import loop from 'assets/roll-over.svg';
import cube from 'assets/cube.svg';
import './dice.css';
import winSound from 'assets/winDice.mp3';
import betSound from 'assets/betClick.mp3';
import rollSound from 'assets/rolling.mp3';
import Loader from 'components/Loader';
import { Box, Button, Grid, TextField, Typography, InputAdornment, Stack } from '@mui/material';
import { playDice, getUserBalance } from 'api';

const Dice = () => {
    const totalAmount = useSelector((state: any) => state.balance);
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const [betAmount, setBetAmount] = useState('0.0');
    const [rollValue, setRollValue] = useState(50);
    const [mul, setMul] = useState((2).toFixed(4));
    const [isBetStarted, setIsBetStarted] = useState(false);
    const [betResultArray, setBetResultArray] = useState<any[]>([]);
    const [recentNumber, setRecentNumber] = useState(0);
    const [showDice, setShowDice] = useState(false);
    const diceTimeout = useRef<any>(0);
    const sliderRef = useRef<HTMLInputElement>(null);

    const useContainerDimensions = (myRef: any) => {
        const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

        useEffect(() => {
            const getDimensions = () => ({
                width: myRef.current?.offsetWidth || 0,
                height: myRef.current?.offsetHeight || 0
            });

            const handleResize = () => {
                setDimensions(getDimensions());
            };

            if (myRef.current) {
                setDimensions(getDimensions());
            }

            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }, [myRef]);

        return dimensions;
    };

    const { width, height } = useContainerDimensions(sliderRef);

    const winAudio = new Audio(winSound);
    const betAudio = new Audio(betSound);
    const rollAudio = new Audio(rollSound);

    useEffect(() => {
        const slider = sliderRef.current;
        if (slider) {
            const min = parseFloat(slider.min);
            const max = parseFloat(slider.max);
            const val = Number(rollValue);
            const percentage = ((val - min) / (max - min)) * 100;
            slider.style.background = `linear-gradient(to right, #e9113c ${percentage}%, #00e701 ${percentage}%)`;
        }
    }, [rollValue]);

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

    const handleBetClicked = async () => {
        if (!betAmount || parseFloat(betAmount) <= 0) {
            enqueueSnackbar('Enter a valid bet amount', { variant: 'error' });
            return;
        }
        if (parseFloat(betAmount) > totalAmount) {
            enqueueSnackbar('Not Enough Money', { variant: 'error' });
            return;
        }

        betAudio.play();
        const timeoutId = diceTimeout.current;
        clearTimeout(timeoutId);
        setIsBetStarted(true);

        setTimeout(() => {
            rollAudio.play();
        }, 300);

        try {
            // Call backend API to play the game
            const response = await playDice(parseFloat(betAmount), rollValue);

            if (response.success) {
                const { diceNumber, win, newBalance } = response.data;

                setTimeout(() => {
                    setRecentNumber(diceNumber);
                    let newBetResultArray;
                    if (win) {
                        newBetResultArray = [...betResultArray, { amount: diceNumber, win: true }];
                        winAudio.play();
                    } else {
                        newBetResultArray = [...betResultArray, { amount: diceNumber, win: false }];
                    }
                    if (newBetResultArray.length > 5) {
                        newBetResultArray = newBetResultArray.slice(-5);
                    }
                    setBetResultArray(newBetResultArray);
                    setShowDice(true);
                    setIsBetStarted(false);

                    // Update balance from backend response
                    dispatch({ type: 'balance/setBalance', payload: newBalance });
                }, 500);

                const timeout2 = setTimeout(() => {
                    setShowDice(false);
                }, 4000);
                diceTimeout.current = timeout2;
            } else {
                setIsBetStarted(false);
                enqueueSnackbar(response.message || 'Failed to place bet', { variant: 'error' });
            }
        } catch (error: any) {
            setIsBetStarted(false);
            const errorMessage = error.response?.data?.message || error.message || 'Failed to place bet';
            enqueueSnackbar(errorMessage, { variant: 'error' });
            console.error('Bet error:', error);
        }
    };

    const handleSliderChange = (e: any) => {
        const val = e.target.value;
        setRollValue(val);
        setMul(parseFloat((99 / (100 - val)).toString()).toFixed(4));
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
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                    <Typography variant="body2" sx={{ color: 'rgb(148 163 184)', fontWeight: 500 }}>
                                        Profit on Win
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
                                            alignItems: 'center',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <span>
                                            {parseFloat((Number(betAmount) * (Number(mul) - 1)).toString()).toFixed(2)}
                                        </span>
                                        <Box component="img" src={ruppee} sx={{ width: 16, height: 16 }} alt="Rs." />
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                        <Button
                            fullWidth
                            variant="contained"
                            disabled={isBetStarted}
                            onClick={handleBetClicked}
                            sx={{
                                mt: 4,
                                py: 1.5,
                                fontWeight: 600,
                                backgroundColor: '#00e701',
                                '&:hover': { backgroundColor: '#1fff20' },
                                borderRadius: 2,
                                '&.Mui-disabled': {
                                    opacity: 0.5,
                                    color: 'rgba(0, 0, 0, 0.26)',
                                    backgroundColor: '#00e701'
                                }
                            }}
                        >
                            Bet
                        </Button>
                    </Grid>
                    <Grid
                        size={{ xs: 12, md: 9 }}
                        sx={{ position: 'relative', width: '100%', height: '85vh', p: 2, order: { xs: 1, md: 2 } }}
                    >
                        <Box
                            sx={{
                                position: 'absolute',
                                top: 16,
                                right: 16,
                                display: 'flex',
                                gap: 0.5,
                                maxWidth: '24rem',
                                width: 'fit-content',
                                overflowX: 'hidden'
                            }}
                        >
                            {betResultArray.map((item, index) => (
                                <ShowBetResult key={index} amount={item.amount} win={item.win} />
                            ))}
                        </Box>
                        <Box sx={{ height: '100%', display: 'flex' }}>
                            <Box
                                sx={{
                                    bgcolor: '#2f4553',
                                    maxWidth: '768px',
                                    width: '100%',
                                    m: 'auto',
                                    p: { xs: 1.5, sm: 2 },
                                    borderRadius: 9999,
                                    position: 'relative',
                                    mb: { xs: 12, sm: 20 }
                                }}
                            >
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        color: 'white',
                                        fontWeight: 500,
                                        left: { xs: 24, sm: 28 },
                                        top: -28,
                                        '&::after': {
                                            content: '""',
                                            width: 8,
                                            height: 8,
                                            bgcolor: '#2f4553',
                                            display: 'block',
                                            transform: 'rotate(45deg)',
                                            mt: '1px'
                                        }
                                    }}
                                >
                                    0
                                </Box>
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        color: 'white',
                                        fontWeight: 500,
                                        left: '25%',
                                        ml: 1,
                                        top: -28,
                                        '&::after': {
                                            content: '""',
                                            width: 8,
                                            height: 8,
                                            bgcolor: '#2f4553',
                                            display: 'block',
                                            transform: 'rotate(45deg)',
                                            ml: 0.5,
                                            mt: '1px'
                                        }
                                    }}
                                >
                                    25
                                </Box>
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        color: 'white',
                                        fontWeight: 500,
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        top: -28,
                                        '&::after': {
                                            content: '""',
                                            width: 8,
                                            height: 8,
                                            bgcolor: '#2f4553',
                                            display: 'block',
                                            transform: 'rotate(45deg)',
                                            ml: 0.5,
                                            mt: '1px'
                                        }
                                    }}
                                >
                                    50
                                </Box>
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        color: 'white',
                                        fontWeight: 500,
                                        right: '25%',
                                        mr: 1,
                                        top: -28,
                                        '&::after': {
                                            content: '""',
                                            width: 8,
                                            height: 8,
                                            bgcolor: '#2f4553',
                                            display: 'block',
                                            transform: 'rotate(45deg)',
                                            ml: 0.5,
                                            mt: '1px'
                                        }
                                    }}
                                >
                                    75
                                </Box>
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        color: 'white',
                                        fontWeight: 500,
                                        right: 16,
                                        top: -28,
                                        '&::after': {
                                            content: '""',
                                            width: 8,
                                            height: 8,
                                            bgcolor: '#2f4553',
                                            display: 'block',
                                            transform: 'rotate(45deg)',
                                            ml: 0.75,
                                            mt: '1px'
                                        }
                                    }}
                                >
                                    100
                                </Box>
                                <Box
                                    sx={{
                                        bgcolor: '#0f212e',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        p: 1.5,
                                        borderRadius: 9999,
                                        m: 'auto'
                                    }}
                                >
                                    <Box
                                        component="input"
                                        ref={sliderRef}
                                        disabled={isBetStarted}
                                        onChange={handleSliderChange}
                                        type="range"
                                        min="2"
                                        max="98"
                                        defaultValue="50"
                                        value={rollValue}
                                        className="slider"
                                        sx={{ width: '100%' }}
                                    />
                                    <DiceNumber
                                        w={width}
                                        hidden={!showDice}
                                        amount={recentNumber}
                                        win={recentNumber >= rollValue}
                                    />
                                </Box>
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                position: 'absolute',
                                bottom: 16,
                                right: 16,
                                left: 16,
                                bgcolor: '#213743',
                                borderRadius: 1,
                                display: 'flex',
                                p: 2,
                                gap: 1
                            }}
                        >
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '100%' }}>
                                <Typography
                                    component="label"
                                    htmlFor="targetMul"
                                    variant="body2"
                                    sx={{ color: 'rgb(148 163 184)', fontWeight: 500 }}
                                >
                                    Multiplier
                                </Typography>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        bgcolor: '#0f212e',
                                        alignItems: 'center',
                                        pr: 1,
                                        border: '2px solid #2f4553',
                                        '&:hover': { borderColor: '#557086' },
                                        borderRadius: 1
                                    }}
                                >
                                    <TextField
                                        disabled={isBetStarted}
                                        onChange={(e) => {
                                            setMul(e.target.value);
                                            setRollValue(100 - 99 / Number(e.target.value));
                                        }}
                                        id="targetMul"
                                        type="number"
                                        value={mul}
                                        sx={{
                                            width: '100%',
                                            input: { color: '#fff', fontWeight: 500, padding: '10px' },
                                            '& fieldset': { border: 'none' }
                                        }}
                                    />
                                    <Typography sx={{ color: '#b1bad3', fontSize: '1.125rem', fontWeight: 700 }}>
                                        X
                                    </Typography>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '100%' }}>
                                <Typography
                                    component="label"
                                    htmlFor="roll"
                                    variant="body2"
                                    sx={{ color: 'rgb(148 163 184)', fontWeight: 500 }}
                                >
                                    Roll Over
                                </Typography>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        bgcolor: '#0f212e',
                                        alignItems: 'center',
                                        pr: 1,
                                        border: '2px solid #2f4553',
                                        '&:hover': { borderColor: '#557086' },
                                        borderRadius: 1
                                    }}
                                >
                                    <TextField
                                        disabled
                                        id="roll"
                                        type="number"
                                        value={parseFloat(rollValue.toString()).toFixed(2)}
                                        sx={{
                                            width: '100%',
                                            input: {
                                                color: '#fff',
                                                fontWeight: 500,
                                                padding: '10px',
                                                cursor: 'pointer'
                                            },
                                            '& fieldset': { border: 'none' }
                                        }}
                                    />
                                    <Box component="img" src={loop} sx={{ width: 20 }} alt="" />
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '100%' }}>
                                <Typography variant="body2" sx={{ color: 'rgb(148 163 184)', fontWeight: 500 }}>
                                    Win Percentage
                                </Typography>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        bgcolor: '#0f212e',
                                        alignItems: 'center',
                                        pr: 1,
                                        border: '2px solid #2f4553',
                                        '&:hover': { borderColor: '#557086' },
                                        borderRadius: 1
                                    }}
                                >
                                    <TextField
                                        disabled
                                        type="number"
                                        value={parseFloat((100 - rollValue).toString()).toFixed(4)}
                                        sx={{
                                            width: '100%',
                                            input: {
                                                color: '#fff',
                                                fontWeight: 500,
                                                padding: '10px',
                                                cursor: 'pointer'
                                            },
                                            '& fieldset': { border: 'none' }
                                        }}
                                    />
                                    <Typography sx={{ color: '#b1bad3', fontSize: '1.125rem', fontWeight: 700 }}>
                                        %
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

const ShowBetResult = ({ amount, win }: { amount: any; win: boolean }) => {
    return (
        <Box
            sx={{
                px: 2,
                py: 1,
                fontWeight: 'bold',
                fontSize: '0.75rem',
                borderRadius: 9999,
                bgcolor: win ? '#00e701' : '#2f4553',
                color: win ? 'black' : 'white',
                animation: 'slide 0.3s ease-out'
            }}
            className="betResult"
        >
            {parseFloat(amount).toFixed(2)}
        </Box>
    );
};

const DiceNumber = ({ w, amount, win, hidden }: { w: number; amount: number; win: boolean; hidden: boolean }) => {
    return (
        <Box
            sx={{
                left: `${(amount * w) / 100 - 5}px`,
                position: 'absolute',
                transform: 'translateZ(0)',
                transition: 'all 0.3s',
                opacity: hidden ? 0 : 1
            }}
        >
            <Box sx={{ position: 'relative' }}>
                <Box
                    component="img"
                    src={cube}
                    alt=""
                    sx={{
                        width: { xs: '4.2rem', sm: '5rem' },
                        mb: { xs: '4.8rem', sm: '5.5rem' },
                        height: 'fit-content'
                    }}
                />
                <Typography
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        color: win ? '#00b801' : '#ea234b',
                        fontSize: { xs: '1rem', sm: '1.125rem' },
                        fontWeight: 'bold'
                    }}
                >
                    {parseFloat(amount.toString()).toFixed(2)}
                </Typography>
            </Box>
        </Box>
    );
};

export default Dice;
