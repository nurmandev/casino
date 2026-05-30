import React from 'react';
import { Box, Typography } from '@mui/material';
import { keyframes } from '@mui/material';
import sukunaLaugh from 'assets/sukunaLaugh.svg';

const popupAnim = keyframes`
  0% { transform: scale(0.6); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
`;

const LostPopup = ({ hidden }: { hidden: boolean }) => {
    return (
        <Box
            sx={{
                display: hidden ? 'none' : 'block',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 50,
                border: '4px solid #ef4444', // red-500
                borderRadius: 3,
                animation: `${popupAnim} 0.3s ease-out`
            }}
        >
            <Box
                sx={{
                    bgcolor: '#10242f',
                    color: '#ef4444',
                    width: 'fit-content',
                    borderRadius: 3,
                    py: 4,
                    px: 7,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                {/* Title */}
                <Typography
                    sx={{
                        fontWeight: 'bold',
                        fontSize: { xs: '1.25rem', sm: '1.875rem' } // text-xl / sm:text-3xl
                    }}
                >
                    Oops!!
                </Typography>

                {/* Image */}
                <Box sx={{ mt: 3, mb: 2 }}>
                    <Box component="img" src={sukunaLaugh} sx={{ width: 80, height: 80 }} />
                </Box>

                {/* Message */}
                <Typography sx={{ fontSize: '1.25rem', fontWeight: 'bold' }}>You Lost</Typography>
            </Box>
        </Box>
    );
};

export default LostPopup;
