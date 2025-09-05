import type { JSX } from 'react';
import { Provider } from 'react-redux';
import { setupStore } from '../store';

interface IProviders {
    readonly children: JSX.Element;
}
const store = setupStore();
export const Providers: React.FunctionComponent<IProviders> = ({
    children,
}) => {
    return <Provider store={store}>{children}</Provider>;
};
