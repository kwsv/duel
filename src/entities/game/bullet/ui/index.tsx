import { IGame, IGameObject, useGameObejct, Vector2D } from '@shared';
import { useRef, type FC } from 'react';

interface IGameBulletProps {
    radius: number;
    position: Vector2D;
    initialDirection: Vector2D;
    initialForce: number;
    onPlayer: (target: IGameObject) => void;
    onWall: () => void;
    color: string;
}

export const GameBullet: FC<IGameBulletProps> = ({ initialDirection, color, initialForce, radius, onWall, onPlayer, ...props }) => {
    const force = useRef(initialForce);
    const direction = useRef(initialDirection);

    const render = ({ context }: IGame, { position, volume }: IGameObject) => {
        const ctx = context();
        ctx.beginPath();
        ctx.arc(position.current.x, position.current.y, volume.current, 0, 2 * Math.PI, false);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#003300';
        ctx.stroke();
    };

    const update = ({ position }: IGameObject) => {
        position.current.x += force.current * direction.current.x;
    };

    const collision = (target: IGameObject, { id }: IGameObject, { destroyObject }: IGame) => {
        if (target.id === 'wall') {
            return () => {
                onWall();
                destroyObject(id);
            };
        } else if (target.tag === 'player') {
            return () => {
                onPlayer(target);
                destroyObject(id);
            };
        }
    };

    useGameObejct({
        tag: 'bullet',
        collision,
        render,
        update,
        volume: radius,
        ...props,
    });
    return (
        <>
        </>
    );
};
