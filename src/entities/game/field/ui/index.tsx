import { type FC } from 'react';
import { useGame, Button } from '@shared';

interface IGameFieldProps {
    width: number;
    height: number;
}

export const GameField: FC<IGameFieldProps> = ({ width, height }) => {
    const { gameField, isStoped, setStop, click } = useGame();

    return (
        <>

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

            <Button onClick={() => setStop((prev) => !prev)}>
                {isStoped ? 'Возобновить' : 'Пауза'}
            </Button>
        </>
    );
};
