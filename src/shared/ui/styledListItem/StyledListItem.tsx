import { type ListItemProps } from '@mui/material';
import classes from './styledListItem.module.css';

export const StyledListItem: React.FunctionComponent<ListItemProps> = ({
    children,
}) => {
    return <li className={classes.listItem}>{children}</li>;
};
