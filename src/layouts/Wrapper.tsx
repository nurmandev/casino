import { Outlet } from 'react-router-dom';
// @mui
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
// config
import Footer from 'components/footer';
import { MAX_DRAWER_WIDTH, MIN_DRAWER_WIDTH } from 'config/constant';
import { useResponsive } from 'hooks/use-responsive';

const Wrapper = ({ open }: { open: boolean }) => {
    // Match HomeLayout logic: "Desktop" (Permanent/Mini Drawer) vs Mobile (Overlay)
    // HomeLayout uses 'up sm' for desktop layout
    const isDesktop = useResponsive('up', 'sm');

    return (
        <Box
            component="main"
            sx={{
                minHeight: '100vh',
                bgcolor: 'background.site',
                transition: 'margin-left 0.3s', // Add transition for smooth zoom/resize
                ml: isDesktop ? (open ? `${MAX_DRAWER_WIDTH - 1}px` : `${MIN_DRAWER_WIDTH - 1}px`) : 0,
                pb: !isDesktop ? '70px' : 0
            }}
        >
            <Container maxWidth={false} sx={{ pt: '4.5rem', pb: 3, px: { xs: 2, md: 3 } }}>
                <Outlet />
            </Container>

            <Footer />
        </Box>
    );
};

export default Wrapper;
