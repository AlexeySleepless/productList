import { useAppSelector } from '@shared/lib/store';
import { selectUniqueProductTypes } from '../api/selectors';
import { shallowEqual } from 'react-redux';

export const useUnicTypes = () => {
    return useAppSelector(selectUniqueProductTypes, shallowEqual);
};
