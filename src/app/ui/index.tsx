import { type FC } from 'react';
import { GameCursor, GameField, GamePlayer } from '@entities/game';
import { Providers } from '../providers';
import css from './style.module.css';
import '../styles/index.css';

export const App: FC = () => {
    const height = 600;
    const width = 1000;

    return (
        <Providers>
            <div className={css.block}>
                <GameField height={height} width={width} />

                <div className={css.players} style={{ width: width }}>
                    <GamePlayer
                        position={{ x: 50, y: height / 2 }}
                        initialDirection={{ x: 0, y: -1 }}
                        initialForce={4}
                        radius={40}
                        bulletDirection={1}
                    />

                    <GamePlayer
                        position={{ x: width - 50, y: height / 3 }}
                        initialDirection={{ x: 0, y: 1 }}
                        initialForce={4}
                        radius={40}
                        bulletDirection={-1}
                    />

                </div>

                <span className={css.info}>
                    Для остановки / возобновления игры нажмите SPACE
                    <br />
                    Смена цвета: пкм при остановленной игре
                </span>

                <GameCursor />
            </div>

        </Providers>
    );
};
