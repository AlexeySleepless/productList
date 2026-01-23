import {
    TextField,
    InputAdornment,
    IconButton,
    Paper,
    useTheme,
} from '@mui/material';
import { Close, Search } from '@mui/icons-material';
import { useState, type ChangeEvent } from 'react';
import { useDebounce } from '@shared/lib/restUtils';

interface IProductsSearch {
    searchQuery: string;
    setQuery: (newQuery: string) => void;
}

export const ProductsSearch: React.FunctionComponent<IProductsSearch> = ({
    searchQuery,
    setQuery,
}) => {
    const [uiQuery, setUiQuery] = useState<string>(searchQuery);
    const debounceSetQuery = useDebounce(setQuery, 50);

    const setNewQuery = (searchQuery: string): void => {
        setUiQuery(searchQuery);
        debounceSetQuery(searchQuery);
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
