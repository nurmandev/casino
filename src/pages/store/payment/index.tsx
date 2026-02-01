import {
    Avatar,
    Box,
    Button,
    ButtonBase,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    IconButton,
    InputBase,
    InputLabel,
    ListItemText,
    Menu,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography,
    useMediaQuery,
    useTheme
} from '@mui/material';
import { t } from 'i18next';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useEffect, useMemo, useState } from 'react';
import { nowpayDeposit } from 'api';
import { useSnackbar } from 'notistack';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { useSelector } from 'store/store';
import { ICryptoCurrency } from 'types/user';
import { IDeposit } from 'types/deposit';
import PendingDeposit from 'components/deposit/pending';
import { paymentApi } from 'api/payment.api';

interface ICurrency {
    id: number;
    code: string;
    name: string;
    logo_url: string;
}

export type IPackage = {
    _id: string;
    goldCoins: string;
    freeCoins: string;
    price: number;
    status: string;
};

const ITEM_HEIGHT = 48;
const VISIBLE_COUNT = 6;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 6 + ITEM_PADDING_TOP
        }
    }
};

function StorePayment({
    isOpen: modalOpen,
    onClose,
    selectedPackage
}: {
    isOpen: boolean;
    onClose: () => void;
    selectedPackage?: IPackage;
}) {
    const theme = useTheme();

    const { cryptoCurrencies } = useSelector((state) => state.setting);
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { enqueueSnackbar } = useSnackbar();

    const commonCurrencies = useMemo(() => {
        const cryptoCurrency: any = Object.values(cryptoCurrencies);
        const merged: ICryptoCurrency[] = [].concat(...cryptoCurrency);
        return merged.filter((item: ICryptoCurrency) => item.common);
    }, [cryptoCurrencies]);

    const networks = useMemo(() => {
        if (Object.keys(cryptoCurrencies).length > 0) {
            return Object.keys(cryptoCurrencies);
        }
        return [];
    }, [cryptoCurrencies]);

    const selectToken = (crypto: ICryptoCurrency) => {
        setSelectedNetwork(crypto.network);
        setSelectedValue(crypto.code);
    };

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [selectedValue, setSelectedValue] = useState<string>('');
    const [selectedNetwork, setSelectedNetwork] = useState<string>(networks[0] || '');
    const [currencies, setCurrencies] = useState<ICurrency[]>([]);
    const [providerSearch, setProviderSearch] = useState<string>('');
    const [pendingDeposit, setPendingDeposit] = useState<IDeposit | null>(null);

    const selectedItem = useMemo(() => {
        return currencies.find((item: any) => item.code === selectedValue) || currencies[0];
    }, [currencies, selectedValue]);

    const filteredCurrencies = useMemo(() => {
        return currencies.filter((item: any) => item?.name?.toLowerCase().includes(providerSearch.toLowerCase()));
    }, [currencies, providerSearch]);

    const [isOpen, setIsOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClose = () => {
        setAnchorEl(null);
        setIsOpen((prev) => !prev);
        // setProviderSearch('');
    };

    const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
        setIsOpen((prev) => !prev);
        setAnchorEl(event.currentTarget);
    };

    const handleSelect = (code: string) => {
        setSelectedValue(code);
        handleClose();
    };

    const cancelDeposit = async (depositId: string) => {
        try {
            await paymentApi.cancelDeposit({ depositId });
            setPendingDeposit(null);
            enqueueSnackbar('Your request canceled successfully!');
        } catch (error: any) {
            enqueueSnackbar(typeof error === 'string' ? error : error.message, { variant: 'error' });
        }
    };

    const handleSubmit = async () => {
        if (!error && typeof selectedPackage?.price === 'number' && selectedPackage.price > 0) {
            try {
                setLoading(true);
                if (!selectedPackage) return;
                const response = await nowpayDeposit(selectedPackage.price, selectedItem.code);
                if (response.status) {
                    setPendingDeposit(response.pendingDeposit);
                } else {
                    enqueueSnackbar(response.message, { variant: 'error' });
                }
            } catch (error: any) {
                enqueueSnackbar(error.message, { variant: 'error' });
            } finally {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        if (selectedNetwork !== '' && Object.keys(cryptoCurrencies).length > 0) {
            setCurrencies(cryptoCurrencies[selectedNetwork] || []);
        }
    }, [selectedNetwork]);

    const Row = ({ index, style }: ListChildComponentProps) => {
        const item = filteredCurrencies[index];
        return (
            <MenuItem
                key={item.id}
                selected={item.code === selectedValue}
                onClick={() => handleSelect(item.code)}
                style={style}
            >
                <Stack flexDirection="row" alignItems="center" gap={1}>
                    <Box
                        component="img"
                        src={`http://nowpayments.io${item.logo_url}`}
                        alt={item.code}
                        sx={{ width: 20, height: 20 }}
                    />
                    <ListItemText primary={item.name} />
                </Stack>
            </MenuItem>
        );
    };
    return (
        <Dialog
            fullScreen={isMobile}
            open={modalOpen}
            onClose={onClose}
            sx={{
                '& .MuiDialogContent-root': {
                    overflow: 'visible'
                }
            }}
        >
            <DialogTitle sx={{ m: 0, p: 2 }}>
                <Typography variant="h6" component="div" textAlign="center">
                    {t('payment.deposit')}
                </Typography>
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500]
                    }}
                    size="large"
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            {!pendingDeposit ? (
                <DialogContent
                    sx={{
                        width: '100%',
                        minWidth: '350px',
                        p: 3,
                        maxWidth: 'lg',
                        alignSelf: 'center',
                        pt: 2
                    }}
                >
                    <Stack flexDirection={'row'} spacing={2} paddingTop={2} paddingBottom={4}>
                        <Box component="img" src="/assets/images/store/package_default.png" height={70} />
                        <Stack>
                            <Typography variant="h6" fontWeight="medium">
                                {selectedPackage?.goldCoins} Gold Coins
                            </Typography>
                            <Typography color="text.secondary">{selectedPackage?.freeCoins} Free Coins</Typography>
                            <Typography color="primary">${selectedPackage?.freeCoins}</Typography>
                        </Stack>
                    </Stack>
                    <Box sx={{ overflowX: 'auto', whiteSpace: 'nowrap', pb: 1, mb: 1 }}>
                        <Stack direction="row" spacing={1}>
                            {commonCurrencies.map((token, index) => (
                                <ButtonBase
                                    onClick={() => selectToken(token)}
                                    key={index}
                                    sx={{ borderRadius: 1, px: 1, py: 0.5 }}
                                >
                                    <Stack spacing={1} direction="row" alignItems="center">
                                        <Avatar
                                            src={`http://nowpayments.io${token.logo_url}`}
                                            alt={token.name}
                                            sx={{ width: 30, height: 30 }}
                                        />
                                        <Typography variant="body2">{token.name}</Typography>
                                    </Stack>
                                </ButtonBase>
                            ))}
                        </Stack>
                    </Box>
                    <Stack direction={{ md: 'row', sx: 'column' }} alignItems="center" gap={1}>
                        <Stack width={1}>
                            <InputLabel>{t('payment.selectNetwork')}</InputLabel>
                            <Select
                                size="small"
                                sx={{ textTransform: 'uppercase' }}
                                MenuProps={MenuProps}
                                value={selectedNetwork}
                                onChange={(e) => setSelectedNetwork(e.target.value)}
                            >
                                {networks.map((item, i) => (
                                    <MenuItem key={i} value={item} sx={{ textTransform: 'uppercase' }}>
                                        {item === 'null' ? 'No network' : item}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Stack>
                        <Stack width={1}>
                            <InputLabel>{t('payment.selectCurrency')}</InputLabel>
                            <FormControl sx={{ width: 1 }}>
                                <Box
                                    onClick={handleOpen}
                                    sx={{
                                        border: '1px solid',
                                        borderColor: 'background.border',
                                        borderRadius: 2,
                                        px: 2,
                                        py: 1,
                                        bgcolor: 'background.default',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        outline: 'none',
                                        '&:hover': {
                                            borderColor: 'text.primary'
                                        },
                                        ...(isOpen && {
                                            border: '2px solid',
                                            borderColor: 'primary.main'
                                        })
                                    }}
                                >
                                    {selectedItem ? (
                                        <Stack direction="row" alignItems="center" gap={1} maxWidth={0.9}>
                                            <Box
                                                component="img"
                                                src={`http://nowpayments.io${selectedItem.logo_url}`}
                                                alt={selectedItem.code}
                                                sx={{ width: 20, height: 20 }}
                                            />
                                            <Typography noWrap fontWeight={800} variant="caption">
                                                {selectedItem.name}
                                            </Typography>
                                        </Stack>
                                    ) : (
                                        <Typography color="text.secondary">{t('common.currency')}</Typography>
                                    )}

                                    {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                </Box>
                                <Menu
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                    PaperProps={{
                                        style: {
                                            maxHeight: ITEM_HEIGHT * (VISIBLE_COUNT + 2) + ITEM_PADDING_TOP,
                                            width: anchorEl ? anchorEl.clientWidth : 200
                                        }
                                    }}
                                >
                                    <Box sx={{ px: 1, pt: 1, pb: 1 }}>
                                        <InputBase
                                            placeholder={t('payment.searchToken')}
                                            fullWidth
                                            value={providerSearch}
                                            onChange={(e) => setProviderSearch(e.target.value)}
                                            sx={{
                                                bgcolor: 'background.layer4',
                                                borderRadius: 1,
                                                px: 1,
                                                fontSize: 14,
                                                height: 36,
                                                mb: 1
                                            }}
                                        />
                                    </Box>
                                    {filteredCurrencies.length > 0 ? (
                                        <FixedSizeList
                                            height={Math.min(VISIBLE_COUNT, filteredCurrencies.length) * ITEM_HEIGHT}
                                            width="100%"
                                            style={{ overflowX: 'hidden' }}
                                            itemSize={ITEM_HEIGHT}
                                            itemCount={filteredCurrencies.length}
                                            overscanCount={6}
                                        >
                                            {Row}
                                        </FixedSizeList>
                                    ) : (
                                        <MenuItem disabled>{t('no_results_found')}</MenuItem>
                                    )}
                                </Menu>
                            </FormControl>
                        </Stack>
                    </Stack>
                </DialogContent>
            ) : (
                <PendingDeposit pendingDeposit={pendingDeposit} cancelDeposit={cancelDeposit} />
            )}
            {!pendingDeposit && (
                <DialogActions sx={{ px: 3, pb: { md: 2, xs: 10 } }}>
                    <Button onClick={() => onClose()} color="error" variant="outlined">
                        {t('common.cancel')}
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        disabled={error || (selectedPackage?.price && selectedPackage?.price <= 0) || false}
                        color="primary"
                        loading={loading}
                    >
                        {t('common.submit')}
                    </Button>
                </DialogActions>
            )}
        </Dialog>
    );
}

export default StorePayment;
