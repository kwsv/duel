import { Dispatch, SetStateAction, type MutableRefObject } from 'react';
import { Vector2D } from './vectors';
import { IGameObject } from './gameObject';

export interface IGame {
    context: () => CanvasRenderingContext2D;
    destroyObject: (id: IGameObject['id']) => void;
    registerObject: (object: IGameObject) => void;
    setStop: Dispatch<SetStateAction<boolean>>;
    click: (position: Vector2D, pagePosition: Vector2D) => void;
    gameField: MutableRefObject<HTMLCanvasElement>;
    isStoped: boolean;
}
export interface IUpdates extends Array<IUpdateFunction | undefined> {}

export interface IUpdateFunction {
    (): void;
}
