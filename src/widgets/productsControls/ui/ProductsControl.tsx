import { ProductsSearch } from '@features/productsSearch';
import { useAppDispatch, useAppSelector } from '@shared/lib/store';
import { productsControlSlice } from '../model/productsControlReducer';

export const ProductsControl: React.FunctionComponent = () => {
    const searchQuery = useAppSelector(
        state => state.productsControlReducer.searchQuery,
    );
    const { setSearchQuery } = productsControlSlice.actions;
    const dispatch = useAppDispatch();
    return (
        <>
            <ProductsSearch
                searchQuery={searchQuery}
                setQuery={newQuery => dispatch(setSearchQuery(newQuery))}
            />
        </>
    );
};
