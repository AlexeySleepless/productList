import {
    TextField,
    InputAdornment,
    IconButton,
    Paper,
    useTheme,
} from '@mui/material';
import { Close, Search } from '@mui/icons-material';
import type { IFilters } from '../model/types';
import { useState, type ChangeEvent } from 'react';
import { useDebounce } from '@shared/lib/restUtils';

interface IProductsFilters {
    filters: IFilters;
    setFilters: (newFilters: IFilters) => void;
}

export const ProductsFilters: React.FunctionComponent<IProductsFilters> = ({
    filters,
    setFilters,
}) => {
    const { searchQuery } = filters;
    const [uiQuery, setUiQuery] = useState<string>(searchQuery);
    const debounceSetFilters = useDebounce(setFilters, 50);

    const setNewQuery = (searchQuery: string): void => {
        setUiQuery(searchQuery);
        debounceSetFilters({ ...filters, searchQuery });
    };
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const searchQuery = event.target.value;
        setNewQuery(searchQuery);
    };
    const clearSearch = () => {
        setNewQuery('');
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
                value={uiQuery}
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
