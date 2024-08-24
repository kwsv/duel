import { type FC } from 'react';
import { Vector2D } from 'shared/types';

interface IColorPickerProps {
    onBlur: () => void;
    color: string;
    setColor: (color: string) => void;
    coords: Vector2D;

}

export const ColorPicker: FC<IColorPickerProps> = ({ color, setColor, coords, onBlur }) => {
    return (
        <input
            value={color}
            onChange={(event) => setColor(event.target.value)}
            onBlur={() => onBlur()}
            type='color'
            style={{ position: 'absolute', top: coords.y, left: coords.x }}
        />
    );
};
