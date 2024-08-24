import { type FC } from 'react';
import { useGame } from '@shared';

interface IGameFieldProps {
    width: number;
    height: number;
}

export const GameField: FC<IGameFieldProps> = ({ width, height }) => {
    const { gameField, setStop, click } = useGame();

    document.onkeydown = (event) => {
        if (event.code === 'Space') {
            setStop((prev) => !prev);
        }
    };

    return (
        <canvas
            onContextMenu={(event) => {
                event.preventDefault();
                click(
                    { x: event.nativeEvent.offsetX, y: event.nativeEvent.offsetY },
                    { x: event.pageX, y: event.pageY },
                );
            }}
            ref={gameField}
            width={width}
            height={height}
            style={{ border: '1px solid black' }}
        >
            <p>
                Ваш браузер не поддерживает canvas.
            </p>
        </canvas>
    );
};
