import { IGameObject, IGame, useGameObejct } from '@shared';
import { type FC } from 'react';

export const GameCursor: FC = () => {
    const awake = ({ gameField }: IGame, { position }: IGameObject) => {
        gameField.current.onmousemove = (event) => {
            position.current.x = event.offsetX;
            position.current.y = event.offsetY;
        };
    };

    useGameObejct({
        tag: 'cursor',
        awake,
        volume: 10,
        position: { x: 10, y: 10 },
    });

    return (
        <>
        </>
    );
};
