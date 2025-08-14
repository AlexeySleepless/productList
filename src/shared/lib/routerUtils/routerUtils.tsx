import { Navigate, type RouteObject } from 'react-router';

export const addNavigateToFirst = (routes: RouteObject[]) => {
    if (!routes.length) {
        return;
    }
    const rootPath = routes[0].path;
    if (!rootPath) {
        return;
    }
    const navigateToRoot: RouteObject = {
        path: `*`,
        element: <Navigate to={rootPath} />,
    };
    routes.push(navigateToRoot);
};
