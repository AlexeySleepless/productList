import { ListItemIcon, ListItemText } from '@mui/material';
import { classes as externalClasses } from '@shared/ui/styledListItem';
import Add from '@mui/icons-material/Add';
import classes from './CreateProduct.module.css';

interface ICreateProductInList
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label?: string;
}

export const CreateProductInList: React.FunctionComponent<
    ICreateProductInList
> = ({ label, ...restProps }) => {
    return (
        <button
            {...restProps}
            className={`${externalClasses.listItem} ${classes.button}`}
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
                            textAlign: 'start',
                        },
                    },
                }}
            />
        </button>
    );
};
