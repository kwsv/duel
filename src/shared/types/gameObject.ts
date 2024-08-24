import { MutableRefObject } from 'react';
import { IGame, IUpdateFunction } from './gameApi';
import { Vector2D } from './vectors';

type Refs<T> = {
    [P in keyof T]: MutableRefObject<T[P]>;
};

export interface IGameObjectFunctions {
    awake?: (game: IGame, thisObject: IGameObject) => void;
    update?: (props: IGameObject) => void;
    render?: (game: IGame, thisObject: IGameObject) => void;
    click?: (thisObject: IGameObject, position: Vector2D) => void;
    collision?: (target: IGameObject, thisObject: IGameObject, game: IGame) => IUpdateFunction | undefined;
}
export interface IGameObject extends IGameObjectFunctions, IGameObjectLabels, Refs<IGameObjectAttibutes> {
    id: string;
}

export interface IGameObjectLabels {
    tag: string;
}
export interface IGameObjectAttibutes {
    position: Vector2D;
    volume: number;
}
export interface IGameObjectHookProps extends IGameObjectFunctions, IGameObjectLabels, IGameObjectAttibutes {}
