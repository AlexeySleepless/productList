import {
    TextField,
    InputAdornment,
    IconButton,
    Paper,
    useTheme,
} from '@mui/material';
import { Close, Search } from '@mui/icons-material';
import type { IFilters } from '../model/types';
import type { ChangeEvent } from 'react';

interface IProductsFilters {
    filters: IFilters;
    setFilters: (newFilters: IFilters) => void;
}

export const ProductsFilters: React.FunctionComponent<IProductsFilters> = ({
    filters,
    setFilters,
}) => {
    const { searchQuery } = filters;
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const searchQuery = event.target.value;
        setFilters({ ...filters, searchQuery });
    };
    const clearSearch = () => {
        setFilters({ ...filters, searchQuery: '' });
    };

    const theme = useTheme();
    return (
        <Paper
            elevation={2}
            sx={{
                padding: 2,
                borderRadius: 3,
                bgcolor: theme.palette.background.default,
            }}
        >
            <TextField
                label="Поиск"
                variant="outlined"
                fullWidth
                value={searchQuery}
                onChange={handleChange}
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search />
                            </InputAdornment>
                        ),
                        endAdornment: searchQuery && (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={clearSearch}
                                    edge="end"
                                    aria-label="clear search"
                                >
                                    <Close />
                                </IconButton>
                            </InputAdornment>
                        ),
                    },
                }}
            />
        </Paper>
    );
};
