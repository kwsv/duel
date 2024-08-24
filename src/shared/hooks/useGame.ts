import { useContext } from 'react';
import { GameApiContext } from '../contexts';

export const useGame = () => {
    return useContext(GameApiContext);
};
