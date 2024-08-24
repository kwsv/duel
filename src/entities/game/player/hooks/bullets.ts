import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { Vector2D } from '@shared';

export const useBullets = (cooldown: MutableRefObject<number>, direction: 1 | -1) => {
    const timeout = useRef<NodeJS.Timeout>();

    const [bullets, setBullets] = useState([]);

    const shoot = (position: Vector2D, offset: number) => {
        timeout.current = setTimeout(() => {
            addBullet(position, offset);
            shoot(position, offset);
        }, 1100 - cooldown.current);
    };

    const addBullet = (position: Vector2D, offset: number) => {
        setBullets((prev) => [...prev, {
            key: Date.now(),
            radius: 10,
            position: {
                x: position.x + offset * 2 * direction,
                y: position.y,
            },
            initialDirection: { x: direction, y: 0 },
            initialForce: 4,
        }]);
    };

    const removeBullet = (key: number) => {
        setBullets((prev) => prev.filter((bullet) => bullet.key !== key));
    };

    useEffect(() => {
        return () => clearTimeout(timeout.current);
    }, []);

    return { bullets, shoot, removeBullet, addBullet };
};
