import type { IProduct } from '../model/types';

const products: IProduct[] = [
    {
        id: 1,
        label: 'Молоко',
        isChecked: false,
        important: true,
        favorite: false,
        type: 'кисломолочка',
    },
    {
        id: 2,
        label: 'Сахар',
        isChecked: false,
        important: false,
        favorite: false,
        type: 'бакалея',
    },
    {
        id: 3,
        label: 'Бананы',
        isChecked: true,
        important: false,
        favorite: false,
        type: 'фрукты',
    },
    {
        id: 4,
        label: 'Йогурт',
        isChecked: true,
        important: true,
        favorite: true,
        type: 'кисломолочка',
    },
    {
        id: 5,
        label: 'сыр-косичка',
        isChecked: true,
        important: false,
        favorite: true,
        type: 'кисломолочка',
    },
];

export async function getProducts(): Promise<IProduct[]> {
    await new Promise<void>(res => {
        setTimeout(() => {
            res();
        }, 1000);
    });
    return [...products];
}

export async function updateProduct(data: IProduct): Promise<void> {
    await new Promise<void>(res => {
        setTimeout(() => {
            res();
        }, 2000);
    });
    const needIndex = products.findIndex(product => product.id === data.id);
    if (needIndex > -1) {
        products[needIndex] = data;
    }
}

export async function deleteProduct(id: number): Promise<void> {
    await new Promise<void>(res => {
        setTimeout(() => {
            res();
        }, 2000);
    });
    const needIndex = products.findIndex(product => product.id === id);
    if (needIndex > -1) {
        products.splice(needIndex, 1);
    }
}

export async function createProduct(data: IProduct): Promise<void> {
    await new Promise<void>(res => {
        setTimeout(() => {
            res();
        }, 2000);
    });
    products.push(data);
}
