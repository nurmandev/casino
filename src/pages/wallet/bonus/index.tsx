import { useTranslate } from 'locales';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
// @mui
import { Button, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
// utils
import { fDateTime } from 'utils/format-time';
// api
import { bonusApi } from 'api/bonus.api';
// types
import { IPlayerBonus } from 'types/bonus';
// components
import LoadTable from 'components/load-table';
import EmptyTable from 'components/empty-table';
import TablePaginationCustom from 'components/table/table-pagination-custom';
//
import BonusSearchTool from './search-tool';

const STATUS: { [key: string]: string } = {
    pending: 'warning',
    active: 'info',
    claimed: 'success',
    expired: 'error',
    delete: 'error'
};

const BonusPage = () => {
    const { t } = useTranslate();
    const { enqueueSnackbar } = useSnackbar();

    const [totalRows, setTotalRows] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);
    const [status, setStatus] = useState<string>('all');
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<IPlayerBonus[]>([]);

    const getBonusList = async () => {
        try {
            setLoading(true);
            const response = await bonusApi.getBonusList({
                status,
                rowsPerPage,
                currentPage: currentPage + 1
            });
            setTotalRows(response.total);
            setData(response.data);
        } catch (error) {
            console.log('Error for getting withdraw history');
        } finally {
            setLoading(false);
        }
    };

    const claimBonus = async (bonusId: string) => {
        try {
            setLoading(true);
            const updatedData = await bonusApi.claimBonus(bonusId);
            if (updatedData) {
                setData((pre) =>
                    pre.map((item) => (item._id === bonusId ? { ...item, status: updatedData.status } : item))
                );
            }
            enqueueSnackbar('Successfully claimed!', { variant: 'success' });
        } catch (error: any) {
            enqueueSnackbar(error.message, { variant: 'error' });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getBonusList();
    }, [status]);

    return (
        <Stack sx={{ pt: 3, px: { md: 3, xs: 1 }, minHeight: '400px', bgcolor: 'background.card', borderRadius: 3 }}>
            <Stack gap={2}>
                <BonusSearchTool status={status} onChangeStatus={setStatus} />
                <Stack sx={{ overflow: 'auto' }}>
                    <Table
                        sx={{
                            th: {
                                py: 1
                            },
                            td: {
                                borderBottom: 0
                            }
                        }}
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell>{t('bonus.table.name')}</TableCell>
                                <TableCell>{t('bonus.table.amount')}</TableCell>
                                <TableCell>{t('bonus.table.goal')}</TableCell>
                                <TableCell>{t('bonus.table.process')}</TableCell>
                                <TableCell align="center">{t('bonus.table.status')}</TableCell>
                                <TableCell align="center">{t('bonus.table.type')}</TableCell>
                                <TableCell align="center" sx={{ minWidth: 180 }}>
                                    {t('bonus.table.expiryDate')}
                                </TableCell>
                                <TableCell>{t('bonus.table.action')}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading && <LoadTable colSpan={8} />}
                            {!loading &&
                                data.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell sx={{ width: { xs: '30%', sm: 'auto' } }}>
                                            {item.bonus.name}
                                        </TableCell>
                                        <TableCell>{item.amount.toFixed(2)}</TableCell>
                                        <TableCell>{item.goalAmount}</TableCell>
                                        <TableCell sx={{ width: { xs: '96px', sm: 'auto' } }}>
                                            {item.processAmount.toFixed(2)}
                                        </TableCell>
                                        <TableCell align="right">
                                            <Typography
                                                variant="body2"
                                                color={STATUS[item.status]}
                                                sx={{
                                                    textTransform: 'capitalize'
                                                }}
                                            >
                                                {item.status}
                                            </Typography>
                                        </TableCell>
                                        <TableCell
                                            align="right"
                                            sx={{
                                                fontWeight: 600,
                                                textTransform: 'capitalize'
                                            }}
                                        >
                                            {item.bonus.option}
                                        </TableCell>
                                        <TableCell align="right">{fDateTime(item.bonus.expireDate)}</TableCell>
                                        <TableCell align="right">
                                            {item.status === 'active' && (
                                                <Button
                                                    size="small"
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={() => claimBonus(item._id)}
                                                >
                                                    {t('bonus.claim')}
                                                </Button>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            <EmptyTable noData={!data.length && !loading} colSpan={8} />
                        </TableBody>
                    </Table>
                </Stack>
                <TablePaginationCustom
                    count={totalRows}
                    page={currentPage}
                    rowsPerPage={rowsPerPage}
                    onPageChange={(_, newPage) => setCurrentPage(newPage)}
                    onRowsPerPageChange={(e) => setRowsPerPage(Number(e.target.value))}
                />
            </Stack>
        </Stack>
    );
};

export default BonusPage;
