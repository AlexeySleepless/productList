import { alpha, ListItem, type ListItemProps } from '@mui/material';

export const StyledListItem: React.FunctionComponent<ListItemProps> = ({
    children,
    sx,
    ...props
}) => {
    return (
        <ListItem
            disablePadding
            sx={{
                padding: '5px',
                alignItems: 'stretch',
                minHeight: '60px',
                '&:hover': {
                    backgroundColor: alpha('rgb(25,118,210)', 0.15),
                },
                '@media (pointer: coarse)': {
                    '&:hover': {
                        backgroundColor: 'transparent',
                    },
                    '&:focus-visible': {
                        backgroundColor: 'transparent',
                    },
                },
                ...sx,
            }}
            {...props}
        >
            {children}
        </ListItem>
    );
};
