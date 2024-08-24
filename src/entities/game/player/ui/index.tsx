import { useRef, useState, type FC } from 'react';
import { useGameObejct, IGameObject, IGame, Vector2D, Slider, IUpdateFunction, ColorPicker } from '@shared';
import { GameBullet } from '../../bullet';
import { useBullets, useColorMenu } from '../hooks';
import css from './style.module.css';

interface IGamePlayerProps {
    radius: number;
    position: Vector2D;
    initialDirection: Vector2D;
    initialForce: number;
    bulletDirection: 1 | -1;
}

export const GamePlayer: FC<IGamePlayerProps> = ({ radius, initialDirection, bulletDirection, initialForce, ...props }) => {
    const [hitCount, setHitCount] = useState(0);

    // * gameObject fuctions
    const direction = useRef(initialDirection);
    const force = useRef(initialForce);

    const awake = ({}: IGame, { position, volume }: IGameObject) => {
        shoot(position.current, volume.current);
    };
    const render = ({ context }: IGame, { position, volume }: IGameObject) => {
        const ctx = context();
        ctx.beginPath();
        ctx.arc(position.current.x, position.current.y, volume.current, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'green';
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#003300';
        ctx.stroke();
    };
    const update = ({ position, volume }: IGameObject) => {
        if (direction.current.y === 1) {
            position.current.y = Math.min(600, position.current.y + volume.current + force.current * direction.current.y) - volume.current;
        } else {
            position.current.y = Math.max(0, position.current.y - volume.current + force.current * direction.current.y) + volume.current;
        }
    };
    const collision = (target: IGameObject, { position }: IGameObject): IUpdateFunction => {
        if (target.id === 'wall') {
            return () => direction.current.y *= -1;
        } else if (target.tag === 'cursor') {
            if (target.position.current.y - position.current.y > 0) {
                return () => direction.current.y = -1;
            } else {
                return () => direction.current.y = 1;
            }
        } else if (target.tag === 'bullet') {
            return () => setHitCount((prev) => prev + 1);
        }
    };

    // * bullets
    const cooldown = useRef(100);
    const { bullets, removeBullet, shoot } = useBullets(cooldown, bulletDirection);

    // * game
    const { isStoped } = useGameObejct({
        tag: 'player',
        awake,
        collision,
        click,
        render,
        update,
        volume: radius,
        ...props,
    });

    // * color menu
    function click(_: IGameObject, position: Vector2D) {
        openMenu(position);
    }
    const { hidden, coords, color, setColor, openMenu } = useColorMenu('#ff0000', isStoped);

    return (
        <div className={css.block}>
            {bullets.map(({ key, ...bullet }) => {
                return (
                    <GameBullet
                        color={color}
                        onWall={() => removeBullet(key)}
                        onPlayer={() => removeBullet(key)}
                        key={key}
                        {...bullet}
                    />
                );
            })}

            <h4>
                Количество попаданий:
                {hitCount}
            </h4>

            <h4 className={css.info}>
                Скорость движения
                <Slider
                    min={1}
                    max={5}
                    step={1}
                    defaultValue={force.current}
                    onChange={(event) => force.current = Number(event.target.value)}
                />
            </h4>

            <h4 className={css.info}>
                Скорость стрельбы
                <Slider
                    min={100}
                    max={1000}
                    step={100}
                    defaultValue={cooldown.current}
                    onChange={(event) => cooldown.current = Number(event.target.value)}
                />
            </h4>

            {!hidden && <ColorPicker color={color} setColor={setColor} coords={coords} />}
        </div>
    );
};
