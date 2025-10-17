import { createContext, useContext } from 'react';

export interface ITriggerContext {
    triggerError?: (arg: string) => void;
    triggerConfirm?: (arg1: () => Promise<void>, arg2: string) => void;
}

export const TriggerContext = createContext<ITriggerContext | null>(null);

export const useTriggerContext = () => {
    const context = useContext(TriggerContext);
    if (!context) {
        throw Error('Trigger context must be used within provider');
    }
    return context;
};
