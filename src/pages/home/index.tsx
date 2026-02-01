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
import { GSCGames } from './gsc-games';
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
            <GSCGames
                category={[1185, 1020, 1022, 1002, 1052, 1004, 1203]}
                categoryName="Live Casino"
                gameType="LIVE_CASINO"
                viewCount={8}
            />
            <GSCGames category={[1232]} categoryName="Lottery" gameType="LOTTERY" viewCount={8} />
            <GSCGames category={[1012, 1046]} categoryName="Sports Book" gameType="SPORT_BOOK" viewCount={8} />

            <OfflineGames categoryName="Offline Games" viewCount={8} />
            <PaymentSection />
            <SlotGames category="" categoryName="Other" viewCount={8} />

            <DashTable />
            <SlotGames category="hot" categoryName="Hot Games" viewCount={8} />
        </Box>
    );
};

export default Home;
