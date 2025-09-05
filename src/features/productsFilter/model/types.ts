export interface IFilters {
    searchQuery: string;
    sortType: sortType;
}

export const sorts = {
    NONE: 'NONE',
} as const;

export type sortType = keyof typeof sorts;
