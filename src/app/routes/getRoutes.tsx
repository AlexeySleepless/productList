import type { RouteObject } from 'react-router';
import { addNavigateToFirst } from '@shared/lib/routerUtils';
import { ProductsPage } from '@pages/products';

export const getRoutes = (): RouteObject[] => {
    const routes: RouteObject[] = [
        {
            path: '/',
            children: [
                {
                    index: true,
                    element: <ProductsPage />,
                },
            ],
        },
    ];
    addNavigateToFirst(routes);
    return routes;
};
