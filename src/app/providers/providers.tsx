import type { JSX } from 'react';

interface IProviders {
    readonly children: JSX.Element;
}

export const Providers: React.FunctionComponent<IProviders> = ({ children }) => {
    return <>{children}</>;
};
