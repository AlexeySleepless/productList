export interface IProduct {
    id: number;
    label: string;
    isChecked: boolean;
    important: boolean;
    type: string;
}

export interface IProductProps {
    product: IProduct;
    updateAction?: React.ReactNode;
    deleteAction?: React.ReactNode;
    toggleAction?: React.ReactNode;
    infoUI?: React.ReactNode;
}
