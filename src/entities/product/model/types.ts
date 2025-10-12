export interface IProduct {
    id: number;
    label: string;
    isChecked: boolean;
}

export interface IProductProps {
    product: IProduct;
    updateAction?: React.ReactNode;
    deleteAction?: React.ReactNode;
    toggleAction?: React.ReactNode;
}
