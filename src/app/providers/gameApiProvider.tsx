import { type FC, type PropsWithChildren } from 'react';
import { GameApiContext, useGameApi } from '@shared';

interface IGameApiProviderProps {
}

export const GameApiProvider: FC<PropsWithChildren<IGameApiProviderProps>> = ({ children }) => {
    const gameApi = useGameApi();

    return (
        <GameApiContext.Provider value={gameApi}>
            { children }
        </GameApiContext.Provider>
    );
};
