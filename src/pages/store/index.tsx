import { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Button, Grid, useTheme, Skeleton, Stack, Box, CardMedia } from '@mui/material';
import { getPackages } from 'api';
import EmptyData from 'components/empty-data';
import StorePayment, { IPackage } from './payment';

export default function PurchasePage() {
    const theme = useTheme();
    const [packages, setPackages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [currentPackage, setCurrentPackage] = useState<IPackage>();

    const getPackagesList = async () => {
        try {
            setLoading(true);
            const response = await getPackages();
            const normalized = Array.isArray(response)
                ? response
                : Array.isArray((response as any)?.data)
                  ? (response as any).data
                  : Array.isArray((response as any)?.packages)
                    ? (response as any).packages
                    : [];
            setPackages(normalized);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getPackagesList();
    }, []);

    return (
        <Stack direction="column" spacing={4}>
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-around"
                sx={{
                    borderRadius: 3,
                    background: 'linear-gradient(343.06deg, #005CE5 12.1%, #053D90 89.12%)'
                }}
            >
                <Typography sx={{ fontSize: 40, fontWeight: 700, color: '#fff', textTransform: 'uppercase' }}>
                    Store
                </Typography>
                <Box>
                    <Box component="img" src="/assets/sports/banner.png" />
                </Box>
            </Stack>
            <Typography
                variant="h5"
                gutterBottom
                sx={{
                    marginTop: '20px',
                    marginBottom: '20px'
                }}
            >
                Purchase Packages
            </Typography>
            {loading ? (
                <Grid container spacing={4}>
                    {[1, 2, 3, 4].map((index) => (
                        <Grid size={{ xs: 12, sm: 6 }} key={index}>
                            <Card sx={{ borderRadius: 3, bgcolor: theme.palette.mode === 'dark' ? '#1b3335' : '#fff' }}>
                                <Skeleton sx={{ minHeight: 224 }} />
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            ) : packages.length > 0 ? (
                <Grid container spacing={2}>
                    {packages.map((pkg) => (
                        <Grid size={{ xs: 6, md: 4, lg: 3 }} key={pkg._id}>
                            <Card sx={{ borderRadius: 3, boxShadow: 4 }}>
                                <CardMedia
                                    component="img"
                                    image={pkg.image || '/assets/images/store/package_default.png'}
                                    alt={`${pkg.goldCoins} Gold Coins`}
                                    sx={{
                                        height: { xs: '100px', sm: '140px' },
                                        objectFit: 'contain',
                                        padding: '10px',
                                        borderTopLeftRadius: 12,
                                        borderTopRightRadius: 12
                                    }}
                                />

                                <CardContent
                                    sx={{
                                        padding: '10px'
                                    }}
                                >
                                    <Typography variant="h6" component="div" fontWeight="bold">
                                        {pkg.goldCoins} Gold Coins
                                    </Typography>
                                    <Typography color="text.secondary" component="div">
                                        {pkg.freeCoins} Free Coins
                                    </Typography>

                                    <Button
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        sx={{ mt: 2, borderRadius: 2 }}
                                        onClick={() => {
                                            setCurrentPackage(pkg);
                                            setIsOpen(true);
                                        }}
                                    >
                                        {(() => {
                                            const price = Number((pkg as any)?.price);
                                            return `Buy $${Number.isFinite(price) ? price.toFixed(2) : ((pkg as any)?.price ?? '')}`;
                                        })()}
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Stack sx={{ width: 1, height: 1 }}>
                    <EmptyData />
                </Stack>
            )}
            <StorePayment isOpen={isOpen} onClose={() => setIsOpen(false)} selectedPackage={currentPackage} />
        </Stack>
    );
}
