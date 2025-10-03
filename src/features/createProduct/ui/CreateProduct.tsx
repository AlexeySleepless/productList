import { productsApi } from '@entities/product';
import Add from '@mui/icons-material/Add';
import { ListItemIcon, ListItemText } from '@mui/material';
import { StyledListItem } from '@shared/ui/styledListItem';

interface IСreateProductProps {
    triggerError?: (arg: string) => void;
}

export const CreateProduct: React.FunctionComponent<IСreateProductProps> = ({
    triggerError,
}) => {
    const label = 'Добавить продукт';
    const [createFn] = productsApi.useCreateProductMutation();
    const createProduct = (
        event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    ) => {
        event.stopPropagation();
    };
    return (
        <StyledListItem
            sx={{
                display: 'flex',
                alignItems: 'center',
            }}
            onClick={createProduct}
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
