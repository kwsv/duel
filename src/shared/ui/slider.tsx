import { InputHTMLAttributes, type FC } from 'react';

export const Slider: FC<InputHTMLAttributes<HTMLInputElement>> = ({ ...props }) => {
    return (
        <input type='range' {...props} />
    );
};
