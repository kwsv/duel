import { useId, useEffect, useRef } from 'react';
import { useGame } from './useGame';
import { IGameObjectHookProps } from 'shared/types';

export const useGameObejct = ({ position: initialPosition, volume: initialVolume, ...objProps }: IGameObjectHookProps) => {
    const id = useId();
    const volume = useRef(initialVolume);
    const position = useRef(initialPosition);

    const { registerObject, isStoped } = useGame();

    useEffect(() => {
        registerObject({ id, position, volume, ...objProps });
    }, []);

    return { isStoped };
};
