import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, Grid, TextField, Typography, InputAdornment } from '@mui/material';
import { useSelector, useDispatch } from 'store/store';
import { useSnackbar } from 'notistack';
import './roulette.css';
import betSound from 'assets/betClick.mp3';
import rollSound from '../../assets/rolling.mp3';
import winSound from '../../assets/winDice.mp3';
import ruppee from '../../assets/ruppee.svg';
import centerRotate from '../../assets/images/centerrotate.svg';
import winBox from '../../assets/images/win-box.webp';
import { playRoulette, getUserBalance } from 'api';

const wheelnumbersAC = [
    0, 26, 3, 35, 12, 28, 7, 29, 18, 22, 9, 31, 14, 20, 1, 33, 16, 24, 5, 10, 23, 8, 30, 11, 36, 13, 27, 6, 34, 17, 25,
    2, 21, 4, 19, 15, 32
];

const Roulette = () => {
    const totalAmount = useSelector((state: any) => state.balance);
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const [betAmount, setBetAmount] = useState(0);
    const [coin, setCoin] = useState(100);
    const [betcoins, setBetcoins] = useState<any>({});
    const [betValarr, setBetValarr] = useState<any[]>([]);
    const [wheelStyle, setWheelStyle] = useState<any>({});
    const [ballStyle, setBallStyle] = useState<any>({});
    const [winnerpop, setWinnerpop] = useState(false);
    const [payOut, setPayOut] = useState(0);
    const [returnAmt, setReturnAmt] = useState(0);
    const [betActive, setBetActive] = useState(true);
    const [isSpinning, setIsSpinning] = useState(false);
    const [history, setHistory] = useState<any[]>([]);

    const betAudio = new Audio(betSound);
    const rollAudio = new Audio(rollSound);
    const winAudio = new Audio(winSound);

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

    const coinswitch = (value: number) => {
        setCoin(value);
    };

    const betclick = (bet: any, type: any) => {
        if (!betActive || isSpinning) return;

        betAudio.play();
        const newBetAmount = betAmount + coin;

        if (newBetAmount > totalAmount) {
            enqueueSnackbar('Insufficient Balance', { variant: 'error' });
            return;
        }

        setBetAmount(newBetAmount);

        let betKey = '';
        if (type === 'half') betKey = 'half' + bet;
        else if (type === 'row') betKey = 'row' + bet;
        else if (type === 'segment') betKey = 'seg' + bet;
        else if (type === 'single') betKey = 'num' + bet;
        else if (type === 'type') betKey = bet;

        const currentChipValue = betcoins[betKey] || 0;
        const newChipValue = currentChipValue + coin;

        setBetcoins({
            ...betcoins,
            [betKey]: newChipValue
        });

        const existingBetIndex = betValarr.findIndex((b) => b.bet === betKey);
        if (existingBetIndex !== -1) {
            const newArr = [...betValarr];
            newArr[existingBetIndex].amt += coin;
            setBetValarr(newArr);
        } else {
            setBetValarr([...betValarr, { bet: betKey, amt: coin }]);
        }
    };

    const clearData = () => {
        setBetAmount(0);
        setBetcoins({});
        setBetValarr([]);
        setWinnerpop(false);
    };

    const undo = () => {
        if (betValarr.length > 0) {
            const lastBet = betValarr[betValarr.length - 1];
            setBetAmount((prev) => prev - lastBet.amt);

            const newBetcoins = { ...betcoins };
            newBetcoins[lastBet.bet] -= lastBet.amt;
            if (newBetcoins[lastBet.bet] <= 0) {
                delete newBetcoins[lastBet.bet];
            }
            setBetcoins(newBetcoins);

            setBetValarr((prev) => prev.slice(0, -1));
        }
    };

    const bettingamount = (type: string) => {
        if (type === 'multiply') {
            if (betAmount * 2 > totalAmount) {
                enqueueSnackbar('Insufficient Balance', { variant: 'error' });
                return;
            }
            setBetAmount(betAmount * 2);
            const newBetcoins: any = {};
            Object.keys(betcoins).forEach((key) => {
                newBetcoins[key] = betcoins[key] * 2;
            });
            setBetcoins(newBetcoins);
        } else if (type === 'divide') {
            setBetAmount(betAmount / 2);
            const newBetcoins: any = {};
            Object.keys(betcoins).forEach((key) => {
                newBetcoins[key] = betcoins[key] / 2;
            });
            setBetcoins(newBetcoins);
        }
    };

    const spinWheel = (winningNumber: number) => {
        let degree = 0;
        for (let i = 0; i < wheelnumbersAC.length; i++) {
            if (wheelnumbersAC[i] === winningNumber) {
                degree = i * 9.73 + 362;
                break;
            }
        }

        setWheelStyle({ animation: 'wheelRotate 5s linear infinite' });
        setBallStyle({ animation: 'ballRotate 2s linear infinite' });

        setTimeout(() => {
            setBallStyle({ animation: 'ballRotate 2s linear infinite' });
        }, 2000);

        setTimeout(() => {
            setBallStyle({ transform: 'rotate(-' + degree + 'deg)', transition: 'transform 4s ease-out' });
            setWheelStyle({ transform: 'rotate(' + degree + 'deg)', transition: 'transform 4s ease-out' });
        }, 6000);

        setTimeout(() => {
            setWheelStyle({});
        }, 10000);
    };

    // Hotkeys
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (isSpinning) return;

            switch (event.key) {
                case 's':
                    submitBet();
                    break;
                case 'c':
                    clearData();
                    break;
                case 'u':
                    undo();
                    break;
                case 'd':
                    bettingamount('multiply');
                    break;
                case 'h':
                    bettingamount('divide');
                    break;
                case '1':
                    coinswitch(1);
                    break;
                case '2':
                    coinswitch(10);
                    break;
                case '3':
                    coinswitch(100);
                    break;
                case '4':
                    coinswitch(1000);
                    break;
                default:
                    break;
            }
        };

        window.addEventListener('keyup', handleKeyDown);
        return () => {
            window.removeEventListener('keyup', handleKeyDown);
        };
    }, [isSpinning, betAmount, betcoins, betValarr, coin]);

    const submitBet = async () => {
        if (betAmount === 0) {
            enqueueSnackbar('Please select bet first', { variant: 'warning' });
            return;
        }

        if (betAmount > totalAmount) {
            enqueueSnackbar('Insufficient Balance', { variant: 'error' });
            return;
        }

        setIsSpinning(true);
        setBetActive(false);
        setWinnerpop(false);
        rollAudio.play();

        try {
            const response = await playRoulette(betcoins);

            if (response.success) {
                const { winningNumber, win, payout, newBalance } = response.data;

                spinWheel(winningNumber);

                setTimeout(() => {
                    setPayOut(win ? payout / betAmount : 0);
                    setReturnAmt(payout);

                    if (win) {
                        winAudio.play();
                        setWinnerpop(true);
                        enqueueSnackbar(`You Won! Payout: ${payout}`, { variant: 'success' });
                    } else {
                        enqueueSnackbar('You Lost!', { variant: 'error' });
                    }

                    setHistory((prev) =>
                        [
                            {
                                id: Math.random().toString(36).substr(2, 9),
                                bet: betAmount,
                                payout: win ? (payout / betAmount).toFixed(2) : '0.00',
                                profit: payout - betAmount,
                                status: win ? 'winner' : 'loser'
                            },
                            ...prev
                        ].slice(0, 10)
                    );

                    updateBalance(newBalance);
                    setIsSpinning(false);
                    setBetActive(true);
                }, 10000); // Wait for animation
            } else {
                setIsSpinning(false);
                setBetActive(true);
                enqueueSnackbar(response.message || 'Failed to play', { variant: 'error' });
            }
        } catch (error: any) {
            setIsSpinning(false);
            setBetActive(true);
            const errorMessage = error.response?.data?.message || error.message || 'Failed to play';
            enqueueSnackbar(errorMessage, { variant: 'error' });
        }
    };

    const renderChip = (key: string) => {
        const val = betcoins[key];
        if (!val) return null;
        return (
            <div className={`chip ${val < 1000 ? 'blue' : 'red'}`} style={{ display: 'block' }}>
                <span className="chipSpan">{val}</span>
            </div>
        );
    };

    return (
        <Box sx={{ display: 'flex', height: '100vh', bgcolor: '#17181b', color: 'white', overflow: 'hidden' }}>
            <Grid container sx={{ height: '100%' }}>
                {/* Left Panel - Controls */}
                <Grid
                    size={{ xs: 12, md: 3 }}
                    sx={{ order: { xs: 2, md: 1 }, bgcolor: '#213743', py: 5, px: 3, zIndex: 10 }}
                >
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <Typography variant="caption" sx={{ color: '#99a4b0', fontWeight: 600 }}>
                                Chip Value
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                                {[1, 10, 100, 1000].map((val) => (
                                    <Button
                                        key={val}
                                        onClick={() => coinswitch(val)}
                                        sx={{
                                            minWidth: '40px',
                                            height: '40px',
                                            borderRadius: '50%',
                                            bgcolor: coin === val ? '#00e701' : '#2f4553',
                                            color: 'white',
                                            border: coin === val ? '2px solid white' : 'none',
                                            '&:hover': { bgcolor: '#00e701' }
                                        }}
                                    >
                                        {val}
                                    </Button>
                                ))}
                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <Typography variant="caption" sx={{ color: '#99a4b0', fontWeight: 600 }}>
                                Bet Amount
                            </Typography>
                            <Box sx={{ display: 'flex', bgcolor: '#2f4553', borderRadius: 1, p: 0.5 }}>
                                <TextField
                                    fullWidth
                                    variant="standard"
                                    value={betAmount}
                                    InputProps={{
                                        disableUnderline: true,
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <img src={ruppee} alt="ruppee" width={20} />
                                            </InputAdornment>
                                        ),
                                        sx: { color: 'white', px: 1, fontWeight: 600 }
                                    }}
                                />
                                <Button
                                    onClick={() => bettingamount('divide')}
                                    sx={{ color: '#99a4b0', minWidth: '40px' }}
                                >
                                    ½
                                </Button>
                                <Button
                                    onClick={() => bettingamount('multiply')}
                                    sx={{ color: '#99a4b0', minWidth: '40px' }}
                                >
                                    2x
                                </Button>
                            </Box>
                        </Box>

                        <Button
                            fullWidth
                            variant="contained"
                            onClick={submitBet}
                            disabled={isSpinning || betAmount === 0}
                            sx={{
                                bgcolor: '#00e701',
                                color: 'black',
                                fontWeight: 'bold',
                                py: 1.5,
                                '&:hover': { bgcolor: '#00c201' },
                                '&:disabled': { bgcolor: '#2f4553', color: '#99a4b0' }
                            }}
                        >
                            {isSpinning ? 'Spinning...' : 'Bet'}
                        </Button>
                        <Button
                            fullWidth
                            variant="contained"
                            onClick={clearData}
                            disabled={isSpinning}
                            sx={{
                                bgcolor: '#ff4d4d',
                                color: 'white',
                                fontWeight: 'bold',
                                py: 1.5,
                                mt: 1,
                                '&:hover': { bgcolor: '#cc0000' },
                                '&:disabled': { bgcolor: '#2f4553', color: '#99a4b0' }
                            }}
                        >
                            Clear
                        </Button>
                    </Box>
                    {/* History */}
                    <Box sx={{ mt: 4 }}>
                        <Typography variant="h6" sx={{ mb: 2 }}>
                            Recent Bets
                        </Typography>
                        {history.map((h, i) => (
                            <Box
                                key={i}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    mb: 1,
                                    p: 1,
                                    bgcolor: '#2f4553',
                                    borderRadius: 1
                                }}
                            >
                                <Typography variant="body2" color={h.status === 'winner' ? 'green' : 'red'}>
                                    {h.status === 'winner' ? 'Win' : 'Loss'}
                                </Typography>
                                <Typography variant="body2">{h.profit.toFixed(2)}</Typography>
                            </Box>
                        ))}
                    </Box>
                </Grid>

                {/* Right Panel - Game Area */}
                <Grid
                    size={{ xs: 12, md: 9 }}
                    sx={{
                        order: { xs: 1, md: 2 },
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        bgcolor: '#17181b'
                    }}
                >
                    {winnerpop && (
                        <div className="winboxwhl" style={{ zIndex: 20 }}>
                            <div className="box chckbox win-box">
                                <h2 className="t red mb-0 green-t" style={{ textAlign: 'center', color: '#3BC117' }}>
                                    {returnAmt.toFixed(2)}
                                    <span>
                                        <img
                                            src={winBox}
                                            className="img-fluid"
                                            alt="win"
                                            style={{
                                                width: '1.4em',
                                                height: '1.4em',
                                                verticalAlign: 'middle',
                                                marginLeft: '5px'
                                            }}
                                        />
                                    </span>
                                </h2>
                                <p className="coinsub" style={{ textAlign: 'center' }}>
                                    <span className="x">×</span>
                                    <span>{payOut.toFixed(2)}</span>
                                </p>
                            </div>
                        </div>
                    )}

                    <div className="rouletteinner">
                        <div className="wheelwhl">
                            <div className="wheel" style={wheelStyle}>
                                <div className="outerRim"></div>
                                {[
                                    { id: 1, num: 0, color: '#016D29' },
                                    { id: 2, num: 32, color: '#990b4c' },
                                    { id: 3, num: 15, color: '#232e39' },
                                    { id: 4, num: 19, color: '#990b4c' },
                                    { id: 5, num: 4, color: '#232e39' },
                                    { id: 6, num: 21, color: '#990b4c' },
                                    { id: 7, num: 2, color: '#232e39' },
                                    { id: 8, num: 25, color: '#990b4c' },
                                    { id: 9, num: 17, color: '#232e39' },
                                    { id: 10, num: 34, color: '#990b4c' },
                                    { id: 11, num: 6, color: '#232e39' },
                                    { id: 12, num: 27, color: '#990b4c' },
                                    { id: 13, num: 13, color: '#232e39' },
                                    { id: 14, num: 36, color: '#990b4c' },
                                    { id: 15, num: 11, color: '#232e39' },
                                    { id: 16, num: 30, color: '#990b4c' },
                                    { id: 17, num: 8, color: '#232e39' },
                                    { id: 18, num: 23, color: '#990b4c' },
                                    { id: 19, num: 10, color: '#232e39' },
                                    { id: 20, num: 5, color: '#990b4c' },
                                    { id: 21, num: 24, color: '#232e39' },
                                    { id: 22, num: 16, color: '#990b4c' },
                                    { id: 23, num: 33, color: '#232e39' },
                                    { id: 24, num: 1, color: '#990b4c' },
                                    { id: 25, num: 20, color: '#232e39' },
                                    { id: 26, num: 14, color: '#990b4c' },
                                    { id: 27, num: 31, color: '#232e39' },
                                    { id: 28, num: 9, color: '#990b4c' },
                                    { id: 29, num: 22, color: '#232e39' },
                                    { id: 30, num: 18, color: '#990b4c' },
                                    { id: 31, num: 29, color: '#232e39' },
                                    { id: 32, num: 7, color: '#990b4c' },
                                    { id: 33, num: 28, color: '#232e39' },
                                    { id: 34, num: 12, color: '#990b4c' },
                                    { id: 35, num: 35, color: '#232e39' },
                                    { id: 36, num: 3, color: '#990b4c' },
                                    { id: 37, num: 26, color: '#232e39' }
                                ].map((sect) => (
                                    <div key={sect.id} id={`sect${sect.id}`} className="sect">
                                        <span className={sect.num > 9 ? 'double' : 'single'}>{sect.num}</span>
                                        <div className="block"></div>
                                    </div>
                                ))}
                                <div className="pocketsRim"></div>
                                <div className="ballTrack" style={ballStyle}>
                                    <div className="ball"></div>
                                </div>
                                <div className="pockets"></div>
                                <div className="cone"></div>
                            </div>
                            <div className="turret">
                                <img src={centerRotate} width="150" alt="turret" />
                            </div>
                        </div>

                        <div id="betting_board">
                            <div className="winning_lines">
                                <div id="wlttb_top" className="wlttb">
                                    {[...Array(11)].map((_, i) => (
                                        <div key={i} className="ttbbetblock"></div>
                                    ))}
                                </div>
                                <div className="bbtop">
                                    <div
                                        className="coinchip bbtoptwo pointer"
                                        id="Nubhalf1"
                                        onClick={() => betclick(1, 'half')}
                                    >
                                        <span>1 to 18</span>
                                        {renderChip('half1')}
                                    </div>
                                    <div
                                        className="coinchip bbtoptwo pointer"
                                        id="Nubhalf2"
                                        onClick={() => betclick(2, 'half')}
                                    >
                                        <span>19 to 36</span>
                                        {renderChip('half2')}
                                    </div>
                                </div>
                                <div className="number_board">
                                    <div
                                        className="coinchip number_0 pointer"
                                        id="Nub0"
                                        onClick={() => betclick(0, 'single')}
                                    >
                                        <div className="nbn">0</div>
                                        {renderChip('num0')}
                                    </div>
                                    {[3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36].map((num) => (
                                        <div
                                            key={num}
                                            className={`coinchip number_block pointer ${[1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36].includes(num) ? 'redNum' : 'blackNum'}`}
                                            id={`Nub${num}`}
                                            onClick={() => betclick(num, 'single')}
                                        >
                                            <div className="nbn">{num}</div>
                                            {renderChip(`num${num}`)}
                                        </div>
                                    ))}
                                    <div
                                        className="coinchip tt1_block pointer"
                                        id="Nubrow1"
                                        onClick={() => betclick(1, 'row')}
                                    >
                                        <div className="nbn">2:1</div>
                                        {renderChip('row1')}
                                    </div>
                                    {[2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35].map((num) => (
                                        <div
                                            key={num}
                                            className={`coinchip number_block pointer ${[1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36].includes(num) ? 'redNum' : 'blackNum'}`}
                                            id={`Nub${num}`}
                                            onClick={() => betclick(num, 'single')}
                                        >
                                            <div className="nbn">{num}</div>
                                            {renderChip(`num${num}`)}
                                        </div>
                                    ))}
                                    <div
                                        className="coinchip tt1_block pointer"
                                        id="Nubrow2"
                                        onClick={() => betclick(2, 'row')}
                                    >
                                        <div className="nbn">2:1</div>
                                        {renderChip('row2')}
                                    </div>
                                    {[1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34].map((num) => (
                                        <div
                                            key={num}
                                            className={`coinchip number_block pointer ${[1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36].includes(num) ? 'redNum' : 'blackNum'}`}
                                            id={`Nub${num}`}
                                            onClick={() => betclick(num, 'single')}
                                        >
                                            <div className="nbn">{num}</div>
                                            {renderChip(`num${num}`)}
                                        </div>
                                    ))}
                                    <div
                                        className="coinchip tt1_block pointer"
                                        id="Nubrow3"
                                        onClick={() => betclick(3, 'row')}
                                    >
                                        <div className="nbn">2:1</div>
                                        {renderChip('row3')}
                                    </div>
                                </div>
                                <div className="bo3_board">
                                    <div
                                        className="coinchip bo3_block pointer"
                                        id="Nubseg1"
                                        onClick={() => betclick(1, 'segment')}
                                    >
                                        <span>1 to 12</span>
                                        {renderChip('seg1')}
                                    </div>
                                    <div
                                        className="coinchip bo3_block pointer"
                                        id="Nubseg2"
                                        onClick={() => betclick(2, 'segment')}
                                    >
                                        <span>13 to 24</span>
                                        {renderChip('seg2')}
                                    </div>
                                    <div
                                        className="coinchip bo3_block pointer"
                                        id="Nubseg3"
                                        onClick={() => betclick(3, 'segment')}
                                    >
                                        <span>25 to 36</span>
                                        {renderChip('seg3')}
                                    </div>
                                </div>
                                <div className="oto_board">
                                    <div
                                        className="coinchip oto_block pointer"
                                        id="Nubeven"
                                        onClick={() => betclick('even', 'type')}
                                    >
                                        <span>EVEN</span>
                                        {renderChip('even')}
                                    </div>
                                    <div
                                        className="coinchip oto_block pointer Nubred"
                                        id="Nubred"
                                        onClick={() => betclick('red', 'type')}
                                    >
                                        <span>RED</span>
                                        {renderChip('red')}
                                    </div>
                                    <div
                                        className="coinchip oto_block pointer Nubblack"
                                        id="Nubblack"
                                        onClick={() => betclick('black', 'type')}
                                    >
                                        <span>BLACK</span>
                                        {renderChip('black')}
                                    </div>
                                    <div
                                        className="coinchip oto_block pointer"
                                        id="Nubodd"
                                        onClick={() => betclick('odd', 'type')}
                                    >
                                        <span>ODD</span>
                                        {renderChip('odd')}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Roulette;
