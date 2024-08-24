import { type FC } from 'react';
import { Vector2D } from 'shared/types';

interface IColorPickerProps {
    color: string;
    setColor: (color: string) => void;
    coords: Vector2D;

}

export const ColorPicker: FC<IColorPickerProps> = ({ color, setColor, coords }) => {
    return (
        <input value={color} onChange={(event) => setColor(event.target.value)} type='color' style={{ position: 'absolute', top: coords.y, left: coords.x }} />
    );
};
