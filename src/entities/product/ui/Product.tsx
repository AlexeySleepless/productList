import type { IProductProps } from '../model/types';
import React, { useState, type JSX } from 'react';
import { ProductLabel } from './productLabel/ProductLabel';
import { classes } from '@shared/ui/styledListItem';
import { Collapse } from '@mui/material';
import { Button } from '@shared/ui/button';
import { SvgIcon } from '@shared/ui/svgIcon';

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
        const buttonData = expanded
            ? {
                  label: 'Открыть описание',
                  path: (
                      <path d="m12 8-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"></path>
                  ),
              }
            : {
                  label: 'Закрыть описание',
                  path: (
                      <path d="M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
                  ),
              };
        showInfoButton = (
            <>
                <Button
                    onClick={handleExpandClick}
                    aria-label={buttonData.label}
                >
                    <SvgIcon>{buttonData.path}</SvgIcon>
                </Button>
            </>
        );

        info = (
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                {infoUI}
            </Collapse>
        );
    }
    console.log('rerender', product.label);
    return (
        <li>
            <div className={classes.listItem}>
                {toggleAction}
                {readyTexField}
                {showInfoButton}
                {deleteAction}
            </div>
            {info}
        </li>
    );
};
