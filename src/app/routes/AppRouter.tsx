import { createBrowserRouter, RouterProvider } from 'react-router';
import { getRoutes } from './getRoutes';

export const AppRouter: React.FunctionComponent = () => {
    const router = createBrowserRouter(getRoutes());
    return <RouterProvider router={router}></RouterProvider>;
};
