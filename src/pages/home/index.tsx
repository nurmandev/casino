// @mui
import { Box } from '@mui/material';
// mock
import { _gameProviders, _games, _liveSports, _upcomingLotteryDraw } from '_mock';
// components
import Banner from 'components/banner';
import PlayerGames from 'components/player-games';
// swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
//
import GameLink from './game-link';
import DashTable from '../dash-table';
import GameLists from './gaem-lists';
import { SlotGames } from './slot-games';
import { SportGames } from './sport-games';
import PaymentSection from './payment-section';
import { OfflineGames } from './offline-games';

const Home = () => {
    return (
        <Box sx={{ overflowX: 'hidden' }}>
            <Banner />

            <GameLists />

            <GameLink />

            <PlayerGames viewCount={6} />
            <SlotGames category="live" categoryName="Live Casino" viewCount={8} />
            {/* <SportGames category="live" categoryName="Live Sport" viewCount={3} /> */}
            <SlotGames category="slots" categoryName="Slots" viewCount={8} />
            <SlotGames category="fish" categoryName="Fishing" viewCount={8} />
            <SlotGames category="poker" categoryName="Poker" viewCount={8} />
            <OfflineGames categoryName="Offline Games" viewCount={8} />
            <PaymentSection />
            <SlotGames category="" categoryName="Other" viewCount={8} />

            <DashTable />
            <SlotGames category="hot" categoryName="Hot Games" viewCount={8} />
        </Box>
    );
};

export default Home;
