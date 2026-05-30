import React from 'react';
import { Box, Typography } from '@mui/material';
import { keyframes } from '@mui/material';
import ruppee from 'assets/ruppee.svg';

const popupAnim = keyframes`
  0% { transform: scale(0.6); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
`;

const Popup = ({ hidden, profitRatio, totalWin }: { hidden: boolean; profitRatio: string; totalWin: string }) => {
    return (
        <Box
            sx={{
                display: hidden ? 'none' : 'block',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 50,
                border: '4px solid #1fde23',
                borderRadius: 3,
                animation: `${popupAnim} 0.3s ease-out`
            }}
        >
            <Box
                sx={{
                    bgcolor: '#10242f',
                    color: '#1fde23',
                    width: 'fit-content',
                    borderRadius: 3,
                    py: 4,
                    px: 7,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                {/* Profit Ratio */}
                <Typography variant="h4" fontWeight="bold">
                    {profitRatio}
                    <Box component="span" sx={{ fontWeight: 'extrabold' }}>
                        ×
                    </Box>
                </Typography>

                {/* Divider */}
                <Box
                    sx={{
                        width: 40,
                        height: 2,
                        borderRadius: 1,
                        bgcolor: '#2a3e49',
                        mt: 3,
                        mb: 2
                    }}
                />

                {/* Total Win */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                        fontWeight: 'bold',
                        fontSize: '1.125rem'
                    }}
                >
                    ₹{totalWin}
                    <Box component="img" src={ruppee} sx={{ width: 20, height: 20 }} />
                </Box>
            </Box>
        </Box>
    );
};

export default Popup;
