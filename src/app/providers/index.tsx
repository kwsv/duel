import { type FC, type PropsWithChildren } from 'react';
import { GameApiProvider } from './gameApiProvider';

export const Providers: FC<PropsWithChildren> = ({ children }) => {
    return (
        <GameApiProvider>
            { children }
        </GameApiProvider>
    );
};
