import type { IProductProps } from '../model/types';
import React, { useState, type JSX } from 'react';
import { ProductLabel } from './productLabel/ProductLabel';
import { StyledListItem } from '@shared/ui/styledListItem';
import { Collapse, IconButton } from '@mui/material';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';

export const Product: React.FunctionComponent<IProductProps> = ({
    product,
    updateAction,
    deleteAction,
    toggleAction,
    infoUI,
}) => {
    const [expanded, setExpaned] = useState<boolean>(false);

    const handleExpandClick = () => {
        setExpaned(!expanded);
    };
    const readyTexField = updateAction ? (
        updateAction
    ) : (
        <ProductLabel product={product} />
    );

    let showInfoButton: JSX.Element | null = null;
    let info: JSX.Element | null = null;

    if (infoUI) {
        showInfoButton = (
            <IconButton
                onClick={handleExpandClick}
                aria-label={expanded ? 'Открыть описание' : 'Закрыть описание'}
                sx={{
                    minWidth: 50,
                    minHeight: 50,
                }}
            >
                {expanded ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
        );

        info = (
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                {infoUI}
            </Collapse>
        );
    }
    console.log('rerender', product.label);
    return (
        <>
            <StyledListItem>
                {toggleAction}
                {readyTexField}
                {showInfoButton}
                {deleteAction}
            </StyledListItem>
            {info}
        </>
    );
};
