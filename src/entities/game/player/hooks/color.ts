import { Vector2D } from '@shared';
import { useEffect, useState } from 'react';

export const useColorMenu = (initialColor: string, isStoped: boolean) => {
    const [hidden, setHidden] = useState(true);
    const [coords, setCoords] = useState<Vector2D>({ x: 0, y: 0 });
    const [color, setColor] = useState<string>(initialColor);

    const openMenu = (position: Vector2D) => {
        setCoords(position);
        setHidden(false);
    };
    const closeMenu = () => {
        setHidden(true);
    };

    useEffect(() => {
        if (!isStoped) {
            closeMenu();
        }
    }, [isStoped]);

    return { hidden, color, coords, setColor, openMenu, closeMenu };
};
