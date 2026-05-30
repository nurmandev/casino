import Image from 'components/image';

export const tabs = [
    {
        icon: <Image src="/assets/icons/lobby.svg" alt="lobby" width={18} height={18} />,
        value: '',
        label: 'lobby'
    },
    {
        icon: <Image src="/assets/icons/hot-games.svg" alt="hot games" width={18} height={18} />,
        value: 'HOT_GAME',
        label: 'Hot Game'
    },
    {
        icon: <Image src="/assets/icons/live-casino.svg" alt="live casino" width={18} height={18} />,
        value: 'live',
        label: 'Live Casino'
    },
    {
        icon: <Image src="/assets/icons/slots.svg" alt="slots" width={18} height={18} />,
        value: 'slot',
        label: 'Slots'
    },
    // {
    //     icon: <Image src="/assets/icons/bc-original.svg" alt="bc-original" width={18} height={18} />,
    //     value: 'LOTTERY',
    //     label: 'lottery'
    // },
    // {
    //     icon: <Image src="/assets/icons/lobby.svg" alt="lobby" width={18} height={18} />,
    //     value: 'QIPAI',
    //     label: 'Qipai'
    // },
    // {
    //     icon: <Image src="/assets/icons/slots.svg" alt="slots" width={18} height={18} />,
    //     value: 'P2P',
    //     label: 'P2P'
    // },
    {
        icon: <Image src="/assets/icons/hot-games.svg" alt="hot games" width={18} height={18} />,
        value: 'fish',
        label: 'Fishing'
    },
    // {
    //     icon: <Image src="/assets/icons/game-shows.svg" alt="game shows" width={18} height={18} />,
    //     value: 'COCK_FIGHTING',
    //     label: 'cock_fighting'
    // },
    // {
    //     icon: <Image src="/assets/icons/new-releases.svg" alt="new releases" width={18} height={18} />,
    //     value: 'BONUS',
    //     label: 'bonus.title'
    // },
    {
        icon: <Image src="/assets/icons/table-games.svg" alt="table games" width={18} height={18} />,
        value: 'poker',
        label: 'Poker'
    },
    {
        icon: <Image src="/assets/icons/feature-buy-in.svg" alt="feature buy in" width={18} height={18} />,
        value: '',
        label: 'others'
    }
    // {
    //     icon: <Image src="/assets/icons/providers.svg" alt="providers" width={18} height={18} />,
    //     value: 'LIVE_CASINO_PREMIUM',
    //     label: 'live_casino_premium'
    // }
];

export const headerTabs = [
    {
        icon: '/img/header/casino.png',
        label: 'Casino',
        path: '/casino'
    },
    {
        icon: '/img/header/slots.png',
        label: 'Slots',
        path: '/slots'
    },
    {
        icon: '/img/header/racing.png',
        label: 'Racing',
        path: '/racing'
    },
    {
        icon: '/img/header/bitup.png',
        label: 'BitUp Game',
        path: '/bitup'
    }
];

export const sidebarConfig = [
    {
        type: 'button',
        name: 'Bonus',
        // path: '/bonus',
        image: '/assets/images/bonus-chest.png' // We will need to mock this or use CSS
    },
    {
        type: 'row',
        items: [
            { name: 'Quest', icon: '🎯', path: '/quest', color: '#6a0dad' },
            { name: 'Spin', icon: '🎡', path: '/spin', color: '#a020f0' }
        ]
    },
    {
        type: 'banner',
        image: '/assets/images/sidebar-banner.png'
    },
    {
        name: 'Casino',
        type: 'item',
        icon: {
            path: '/assets/icons/icons-1.webp',
            active: '/assets/icons/icons-1.webp',
            x: -96,
            y: 0
        },
        path: '/casino',
        children: [
            {
                name: 'Pick For You',
                icon: { path: '/assets/icons/icons-5.webp', x: -128, y: -224 }, // Placeholder coords
                path: '/pick-for-you'
            },
            {
                name: 'Favorites',
                icon: { path: '/assets/icons/icons-5.webp', x: -194, y: -32 },
                path: '/favorites'
            },
            {
                name: 'Recent',
                icon: { path: '/assets/icons/icons-5.webp', x: -160, y: -192 },
                path: '/recent'
            },
            {
                name: 'Live Casino',
                icon: { path: '/assets/icons/icons-5.webp', x: -160, y: -192 },
                path: '/live-casino'
            },
            {
                name: 'Hot Games',
                icon: { path: '/assets/icons/icons-5.webp', x: -194, y: -32 },
                path: '/hot-games'
            },
            {
                name: 'New Releases',
                icon: { path: '/assets/icons/icons-5.webp', x: -160, y: -192 }, // Placeholder
                path: '/new-releases'
            },
            {
                name: 'Feature Buy-In',
                icon: { path: '/assets/icons/icons-5.webp', x: -160, y: -192 }, // Placeholder
                path: '/feature-buy-in'
            },
            {
                name: 'Blackjack',
                icon: { path: '/assets/icons/icons-5.webp', x: -160, y: -192 }, // Placeholder
                path: '/blackjack'
            },
            {
                name: 'Table Games',
                icon: { path: '/assets/icons/icons-5.webp', x: -256, y: -64 },
                path: '/table-games'
            }
        ]
    },
    {
        name: 'Up & Down',
        type: 'item',
        icon: {
            path: '/assets/icons/icons-1.webp',
            x: -160,
            y: -160
        },
        path: '/up-down'
    }
];

export const casinoMenus = [
    {
        name: 'casino',
        icon: {
            path: '/assets/icons/icons-1.webp',
            active: '/assets/icons/icons-1.webp',
            x: -96,
            y: 0
        },
        path: '/casino',
        children: [
            {
                name: 'Hot Game',
                icon: {
                    path: '/assets/icons/icons-5.webp',
                    active: '/assets/icons/icons-6.webp',
                    x: -194,
                    y: -32
                },
                path: '/gamelist/Hot Game'
            },
            {
                name: 'Live Casino',
                icon: {
                    path: '/assets/icons/icons-5.webp',
                    active: '/assets/icons/icons-6.webp',
                    x: -160,
                    y: -192
                },
                path: '/casino/live?type=Live Casino'
            },
            {
                name: 'Slots',
                icon: {
                    path: '/assets/icons/icons-5.webp',
                    active: '/assets/icons/icons-6.webp',
                    x: -128,
                    y: -224
                },
                path: '/casino/slot?type=Slots'
            },
            // {
            //     name: 'lottery',
            //     icon: {
            //         path: '/assets/icons/icons-5.webp',
            //         active: '/assets/icons/icons-6.webp',
            //         x: -64,
            //         y: -256
            //     },
            //     path: '/casino/LOTTERY'
            // },
            // {
            //     name: 'Qipai',
            //     icon: {
            //         path: '/assets/icons/icons-5.webp',
            //         active: '/assets/icons/icons-6.webp',
            //         x: -96,
            //         y: -162
            //     },
            //     path: '/casino/QIPAI'
            // },
            // {
            //     name: 'P2P',
            //     icon: {
            //         path: '/assets/icons/icons-5.webp',
            //         active: '/assets/icons/icons-6.webp',
            //         x: -96,
            //         y: -223
            //     },
            //     path: '/casino/P2P'
            // },
            {
                name: 'Fishing',
                icon: {
                    path: '/assets/icons/icons-5.webp',
                    active: '/assets/icons/icons-6.webp',
                    x: -194,
                    y: -32
                },
                path: '/casino/fish?type=Fishing'
            },
            // {
            //     name: 'cock_fighting',
            //     icon: {
            //         path: '/assets/icons/icons-5.webp',
            //         active: '/assets/icons/icons-6.webp',
            //         x: -66,
            //         y: -128
            //     },
            //     path: '/casino/COCK_FIGHTING'
            // },
            // {
            //     name: 'bonus.title',
            //     icon: {
            //         path: '/assets/icons/icons-5.webp',
            //         active: '/assets/icons/icons-6.webp',
            //         x: -226,
            //         y: 0
            //     },
            //     path: '/casino/BONUS'
            // },
            {
                name: 'Poker',
                icon: {
                    path: '/assets/icons/icons-5.webp',
                    active: '/assets/icons/icons-6.webp',
                    x: -256,
                    y: -64
                },
                path: '/casino/poker?type=Poker'
            },
            {
                name: 'others',
                icon: {
                    path: '/assets/icons/icons-5.webp',
                    active: '/assets/icons/icons-6.webp',
                    x: -160,
                    y: -32
                },
                path: '/casino/OTHER?type=Others'
            }
            // {
            //     name: 'live_casino_premium',
            //     icon: {
            //         path: '/assets/icons/icons-5.webp',
            //         active: '/assets/icons/icons-6.webp',
            //         x: -160,
            //         y: -96
            //     },
            //     path: '/casino/LIVE_CASINO_PREMIUM'
            // }
        ]
    },
    {
        name: 'sports',
        icon: {
            path: '/assets/icons/icons-1.webp',
            active: '/assets/icons/icons-1.webp',
            x: -160,
            y: -160
        },
        path: '/sports'
    },
    {
        name: 'Store',
        icon: {
            path: '/assets/icons/icons-5.webp',
            active: '/assets/icons/icons-6.webp',
            x: -64,
            y: -224
        },
        path: '/store'
    },
    {
        name: 'vip_club',
        icon: {
            path: '/assets/icons/icons-5.webp',
            active: '/assets/icons/icons-6.webp',
            x: 0,
            y: -256
        },
        path: '/vip'
    },
    {
        name: 'bonus.title',
        icon: {
            path: '/assets/icons/icons-5.webp',
            active: '/assets/icons/icons-6.webp',
            x: -128,
            y: -65
        },
        path: '/bonus'
    },
    {
        name: 'dropMenu.affiliate',
        icon: {
            path: '/assets/icons/icons-5.webp',
            active: '/assets/icons/icons-6.webp',
            x: 0,
            y: -32
        },
        path: '/affiliate/dashboard'
    },
    {
        name: 'helpCenter',
        icon: {
            path: '/assets/icons/icons-5.webp',
            active: '/assets/icons/icons-6.webp',
            x: -257,
            y: -160
        },
        path: '/help-center'
    }
];
