import { useEffect, useState } from 'react';
import { Box, Stack, Typography, Skeleton } from '@mui/material';
import { useRouter } from 'routes/hook';
import { getGamesBySearch } from 'api';

interface SlotGame {
    game_code: string;
    game_name: string;
    image_url: string;
    product_code: number;
    game_type: string;
}

interface SidebarSlotsProps {
    open: boolean;
}

export default function SidebarSlots({ open }: SidebarSlotsProps) {
    const router = useRouter();
    const [games, setGames] = useState<SlotGame[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSlotGames = async () => {
            try {
                setLoading(true);
                // Fetch slot games - limit to 5 for sidebar
                // getGamesBySearch(name, gameType, currentPage, perPage)
                const response = await getGamesBySearch('', 'SLOT', 1, 5);

                if (response?.data) {
                    setGames(response.data.slice(0, 5));
                }
            } catch (error) {
                console.error('Error fetching slot games:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSlotGames();
    }, []);

    const handleGameClick = (game: SlotGame) => {
        router.push(`/casino/SLOT?game=${game.game_code}`);
    };

    if (!open) return null;

    return (
        <Box
            sx={{
                mt: 2,
                px: 1,
                pb: 2
            }}
        >
            <Typography
                variant="caption"
                sx={{
                    color: 'text.secondary',
                    fontWeight: 600,
                    px: 1,
                    mb: 1,
                    display: 'block'
                }}
            >
                POPULAR SLOTS
            </Typography>

            <Stack spacing={0.5}>
                {loading
                    ? // Loading skeletons
                      Array.from({ length: 5 }).map((_, index) => (
                          <Skeleton
                              key={index}
                              variant="rectangular"
                              height={56}
                              sx={{ borderRadius: 2, bgcolor: 'background.sidebarCell' }}
                          />
                      ))
                    : games.map((game) => (
                          <Box
                              key={game.game_code}
                              onClick={() => handleGameClick(game)}
                              sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: 1,
                                  p: 1,
                                  borderRadius: 2,
                                  bgcolor: 'background.sidebarCell',
                                  cursor: 'pointer',
                                  transition: 'all 0.2s',
                                  '&:hover': {
                                      bgcolor: 'background.sidebarCellExpanded',
                                      transform: 'translateX(4px)'
                                  }
                              }}
                          >
                              <Box
                                  component="img"
                                  src={game.image_url || '/assets/images/game-placeholder.png'}
                                  alt={game.game_name}
                                  sx={{
                                      width: 40,
                                      height: 40,
                                      borderRadius: 1,
                                      objectFit: 'cover'
                                  }}
                                  onError={(e: any) => {
                                      e.target.src = '/assets/images/game-placeholder.png';
                                  }}
                              />
                              <Box sx={{ flex: 1, minWidth: 0 }}>
                                  <Typography
                                      variant="body2"
                                      sx={{
                                          fontWeight: 500,
                                          overflow: 'hidden',
                                          textOverflow: 'ellipsis',
                                          whiteSpace: 'nowrap'
                                      }}
                                  >
                                      {game.game_name}
                                  </Typography>
                              </Box>
                          </Box>
                      ))}
            </Stack>
        </Box>
    );
}
