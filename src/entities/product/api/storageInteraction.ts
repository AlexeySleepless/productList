import type { IProduct } from '../model/types';

const products: IProduct[] = [
    {
        id: 1,
        label: 'Молоко',
        isChecked: false,
        important: false,
        type: 'кисломолочка',
    },
    {
        id: 2,
        label: 'Сахар',
        isChecked: false,
        important: false,
        type: 'бакалея',
    },
    {
        id: 3,
        label: 'Бананы',
        isChecked: false,
        important: false,
        type: 'фрукты',
    },
    {
        id: 4,
        label: 'Йогурт',
        isChecked: false,
        important: false,
        type: 'кисломолочка',
    },
    // { id: 5, label: 'Пуддинг', isChecked: false },
    // { id: 6, label: 'Яблоко', isChecked: false },
    // { id: 7, label: 'Хлеб', isChecked: false },
    // { id: 8, label: 'Молоко', isChecked: false },
    // { id: 9, label: 'Сыр', isChecked: false },
    // { id: 10, label: 'Банан', isChecked: false },
    // { id: 11, label: 'Яйцо', isChecked: false },
    // { id: 12, label: 'Картофель', isChecked: false },
    // { id: 13, label: 'Морковь', isChecked: false },
    // { id: 14, label: 'Курица', isChecked: false },
    // { id: 15, label: 'Огурец', isChecked: false },
    // { id: 16, label: 'Сметана', isChecked: false },
    // { id: 17, label: 'Кефир', isChecked: false },
    // { id: 18, label: 'Гречка', isChecked: false },
    // { id: 19, label: 'Сахар', isChecked: false },
    // { id: 20, label: 'Томат', isChecked: false },
];

export async function getProductTypes(): Promise<string[]> {
    await new Promise<void>(res => {
        setTimeout(() => {
            res();
        }, 1000);
    });
    const alreadyExistedTypes: Record<string, boolean> = {};
    const types: string[] = [];
    let type: string = '';
    for (const product of products) {
        type = product.type;
        if (type in alreadyExistedTypes || !type) {
            continue;
        }
        alreadyExistedTypes[type] = true;
        types.push(type);
    }
    return types;
}

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
