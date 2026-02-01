import React from 'react';
import { Card, CardContent, Typography, Box, Button, Grid, Chip } from '@mui/material';

interface Team {
    name: string;
    shirtColor: string; // hex or MUI color
}

interface MatchCardProps {
    tournament: string;
    timeInfo: string;
    isLive: boolean;
    homeTeam: Team;
    awayTeam: Team;
    score: string;
    half: string;
    odds: {
        home: number;
        draw: number;
        away: number;
        extra?: number;
    };
}

const MatchCard: React.FC<MatchCardProps> = ({
    tournament,
    timeInfo,
    isLive,
    homeTeam,
    awayTeam,
    score,
    half,
    odds
}) => {
    return (
        <Card
            sx={{
                backgroundColor: 'background.layer4',
                color: 'white',
                borderRadius: 3,
                p: 1.5,
                minWidth: 280
            }}
        >
            <CardContent sx={{ padding: 0 }}>
                {/* Header */}
                <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography variant="body2" color="gray">
                        {tournament} • {timeInfo}
                    </Typography>
                    {isLive && <Chip label="Live" color="success" size="small" />}
                </Box>

                {/* Teams & Score */}
                <Grid container alignItems="center" justifyContent="space-between">
                    <Box sx={{ display: 'flex', flexDirection: 'column' }} textAlign="center">
                        <Box
                            component={'img'}
                            src={'/assets/home/jersey2.png'}
                            alt={'casino'}
                            sx={{
                                width: 40,
                                height: 40,
                                borderRadius: '8px',
                                backgroundColor: homeTeam.shirtColor,
                                mx: 'auto'
                            }}
                        />
                        <Typography variant="caption">{homeTeam.name}</Typography>
                    </Box>

                    <Grid sx={{ flexDirection: 'column' }} textAlign="center">
                        <Typography variant="h6" fontWeight="bold">
                            {score}
                        </Typography>
                        <Typography variant="caption" color="gray">
                            {half}
                        </Typography>
                    </Grid>

                    <Box sx={{ display: 'flex', flexDirection: 'column' }} textAlign="center">
                        <Box
                            component={'img'}
                            src={'/assets/home/jersey1.png'}
                            alt={'casino'}
                            sx={{
                                width: 40,
                                height: 40,
                                borderRadius: '8px',
                                mx: 'auto'
                            }}
                        />
                        <Typography variant="caption">{awayTeam.name}</Typography>
                    </Box>
                </Grid>

                {/* Odds Section */}
                <Box display="flex" justifyContent="space-between" mt={2}>
                    <Button variant="contained" sx={{ bgcolor: '#2A2A2A', color: 'white', flex: 1, mx: 0.5 }}>
                        1 {odds.home}
                    </Button>
                    <Button variant="contained" sx={{ bgcolor: '#2A2A2A', color: 'white', flex: 1, mx: 0.5 }}>
                        Draw {odds.draw}
                    </Button>
                    <Button variant="contained" sx={{ bgcolor: '#2A2A2A', color: 'white', flex: 1, mx: 0.5 }}>
                        2 {odds.away}
                    </Button>
                    {odds.extra && (
                        <Button variant="contained" sx={{ bgcolor: '#2A2A2A', color: 'white', flex: 0.5, mx: 0.5 }}>
                            +{odds.extra}
                        </Button>
                    )}
                </Box>
            </CardContent>
        </Card>
    );
};

export default MatchCard;
