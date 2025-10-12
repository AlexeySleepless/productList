import type { OptimisticUpdateOptions } from './types';

export const handleOptimisticUpdate = async <T>({
    patchResult,
    queryFulfilled,
    dispatch,
    action,
}: OptimisticUpdateOptions<T>): Promise<void> => {
    try {
        await queryFulfilled;
    } catch {
        patchResult.undo();
        if (action && dispatch) {
            dispatch(action);
        }
    }
};
