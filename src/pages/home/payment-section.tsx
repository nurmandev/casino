import { Box, Typography, Stack } from '@mui/material';
import AppleIcon from '@mui/icons-material/Apple';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import GoogleIcon from '@mui/icons-material/Google';

import BitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';

const PaymentSection = () => {
    return (
        <Box
            sx={{
                backgroundColor: 'background.layer4',
                borderRadius: '0.75rem',
                marginTop: '2rem'
            }}
        >
            <Stack
                direction="row"
                spacing={1}
                display={{ sm: 'none', xs: 'flex' }}
                justifyContent={'center'}
                padding={'0.5rem'}
            >
                <Box component={'img'} src={'/assets/home/BTC.webp'} alt={'ball'} sx={{ width: '1.5rem' }} />
                <Box component={'img'} src={'/assets/home/ETH.webp'} alt={'ball'} sx={{ width: '1.5rem' }} />
                <Box component={'img'} src={'/assets/home/BNB.webp'} alt={'ball'} sx={{ width: '1.5rem' }} />
                <Box component={'img'} src={'/assets/home/USDC.webp'} alt={'ball'} sx={{ width: '1.5rem' }} />
                <Box component={'img'} src={'/assets/home/USDT.webp'} alt={'ball'} sx={{ width: '1.5rem' }} />
                <Box component={'img'} src={'/assets/home/XRP.webp'} alt={'ball'} sx={{ width: '1.5rem' }} />
                <Box component={'img'} src={'/assets/home/SOL.webp'} alt={'ball'} sx={{ width: '1.5rem' }} />
                <Box component={'img'} src={'/assets/home/ADA.webp'} alt={'ball'} sx={{ width: '1.5rem' }} />
                <Box component={'img'} src={'/assets/home/DOGE.webp'} alt={'ball'} sx={{ width: '1.5rem' }} />
                <Box component={'img'} src={'/assets/home/MATIC.webp'} alt={'ball'} sx={{ width: '1.5rem' }} />
                <Box component={'img'} src={'/assets/home/TRX.webp'} alt={'ball'} sx={{ width: '1.5rem' }} />
            </Stack>
            <Box
                sx={{
                    position: 'relative',
                    backgroundColor: 'background.card',
                    paddingRight: { xs: 0, sm: '2rem' },
                    paddingLeft: { xs: 0, sm: '2rem' },
                    borderRadius: '0.75rem',
                    height: '6rem'
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        width: '100%',
                        height: '100%'
                    }}
                >
                    {[
                        ['0.75rem', '1rem', 2],
                        ['3.5rem', '6rem', 1.5],
                        ['0.5rem', '10rem', 2],
                        ['0.75rem', '18rem', 3],
                        ['3.75rem', '20rem', 1.5]
                    ].map((item, idx) => (
                        <Box
                            key={`left-blur-${idx}`}
                            component={'img'}
                            src={'/assets/home/blur-ball.webp'}
                            alt={'ball'}
                            sx={{
                                maxWidth: '100%',
                                height: 'auto',
                                position: 'absolute',
                                left: item[1],
                                top: item[0],
                                transform: `scale(${item[2]})`
                            }}
                        />
                    ))}
                    {[
                        ['0.75rem', '1rem', 2],
                        ['3.5rem', '6rem', 1.5],
                        ['0.5rem', '10rem', 2],
                        ['0.75rem', '18rem', 3],
                        ['3.75rem', '20rem', 1.5]
                    ].map((item, idx) => (
                        <Box
                            key={`right-blur-${idx}`}
                            component={'img'}
                            src={'/assets/home/blur-ball.webp'}
                            alt={'ball'}
                            sx={{
                                maxWidth: '100%',
                                height: 'auto',
                                position: 'absolute',
                                right: item[1],
                                bottom: item[0],
                                transform: `scale(${item[2]})`
                            }}
                        />
                    ))}
                </Box>
                <Box
                    sx={{
                        borderRadius: '0.75rem',
                        display: 'flex',
                        flexDirection: { sm: 'row', xs: 'column-reverse' },
                        justifyContent: 'center',
                        gap: '1rem',
                        alignItems: 'center',
                        height: '100%'
                    }}
                >
                    <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: { xs: '1.125rem', md: '1.5rem' } }}>
                        <span style={{ color: '#00ff80' }}>300%</span> Deposit Bonus
                    </Typography>

                    <Stack direction="row" spacing={3} alignItems="center" marginLeft={'auto'} marginRight={'auto'}>
                        <Box
                            component={'img'}
                            src={'/assets/home/apple_pay.webp'}
                            alt={'ball'}
                            sx={{ width: '3.5rem' }}
                        />
                        <Box
                            component={'img'}
                            src={'/assets/home/mastercard.webp'}
                            alt={'ball'}
                            sx={{ width: '1.75rem' }}
                        />
                        <Box component={'img'} src={'/assets/home/visa.webp'} alt={'ball'} sx={{ width: '3.5rem' }} />
                        <Box
                            component={'img'}
                            src={'/assets/home/google_pay.webp'}
                            alt={'ball'}
                            sx={{ width: '3.5rem' }}
                        />
                        <Box
                            component={'img'}
                            src={'/assets/home/pic_pay.webp'}
                            alt={'ball'}
                            sx={{ width: '3.5rem' }}
                        />
                    </Stack>

                    <Stack direction="row" display={{ sm: 'flex', xs: 'none' }}>
                        <Box
                            component={'img'}
                            src={'/assets/home/BTC.webp'}
                            alt={'ball'}
                            sx={{ width: '1.5rem', marginLeft: '-0.25rem' }}
                        />
                        <Box
                            component={'img'}
                            src={'/assets/home/ETH.webp'}
                            alt={'ball'}
                            sx={{ width: '1.5rem', marginLeft: '-0.25rem' }}
                        />
                        <Box
                            component={'img'}
                            src={'/assets/home/BNB.webp'}
                            alt={'ball'}
                            sx={{ width: '1.5rem', marginLeft: '-0.25rem' }}
                        />
                        <Box
                            component={'img'}
                            src={'/assets/home/USDC.webp'}
                            alt={'ball'}
                            sx={{ width: '1.5rem', marginLeft: '-0.25rem' }}
                        />
                        <Box
                            component={'img'}
                            src={'/assets/home/USDT.webp'}
                            alt={'ball'}
                            sx={{ width: '1.5rem', marginLeft: '-0.25rem' }}
                        />
                        <Box
                            component={'img'}
                            src={'/assets/home/XRP.webp'}
                            alt={'ball'}
                            sx={{ width: '1.5rem', marginLeft: '-0.25rem' }}
                        />
                        <Box
                            component={'img'}
                            src={'/assets/home/SOL.webp'}
                            alt={'ball'}
                            sx={{ width: '1.5rem', marginLeft: '-0.25rem' }}
                        />
                        <Box
                            component={'img'}
                            src={'/assets/home/ADA.webp'}
                            alt={'ball'}
                            sx={{ width: '1.5rem', marginLeft: '-0.25rem' }}
                        />
                        <Box
                            component={'img'}
                            src={'/assets/home/DOGE.webp'}
                            alt={'ball'}
                            sx={{ width: '1.5rem', marginLeft: '-0.25rem' }}
                        />
                        <Box
                            component={'img'}
                            src={'/assets/home/MATIC.webp'}
                            alt={'ball'}
                            sx={{ width: '1.5rem', marginLeft: '-0.25rem' }}
                        />
                        <Box
                            component={'img'}
                            src={'/assets/home/TRX.webp'}
                            alt={'ball'}
                            sx={{ width: '1.5rem', marginLeft: '-0.25rem' }}
                        />
                    </Stack>
                </Box>
            </Box>
        </Box>
    );
};

export default PaymentSection;
