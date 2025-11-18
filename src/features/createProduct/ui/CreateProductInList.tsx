import { ListItemIcon, ListItemText, type ListItemProps } from '@mui/material';
import { StyledListItem } from '@shared/ui/styledListItem';
import Add from '@mui/icons-material/Add';

interface ICreateProductInList extends ListItemProps {
    label?: string;
}

export const CreateProductInList: React.FunctionComponent<
    ICreateProductInList
> = ({ label, sx, ...restProps }) => {
    return (
        <StyledListItem
            sx={{
                display: 'flex',
                alignItems: 'center',
                ...sx,
            }}
            {...restProps}
        >
            <ListItemIcon
                sx={{
                    minWidth: 50,
                    minHeight: 50,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'black',
                }}
            >
                <Add />
            </ListItemIcon>
            <ListItemText
                primary={label}
                slotProps={{
                    primary: {
                        sx: {
                            fontSize: '1rem',
                            userSelect: 'none',
                        },
                    },
                }}
            />
        </StyledListItem>
    );
};
