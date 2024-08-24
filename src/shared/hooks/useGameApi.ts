import { useEffect, useRef, useState } from 'react';
import { IGameObject, IGame, Vector2D, IUpdates } from '../types';

export const useGameApi = (): IGame => {
    const gameField = useRef<HTMLCanvasElement>();
    const objects = useRef<Array<IGameObject>>([]);
    const requestAnimation = useRef<number>();
    const [isStoped, setStop] = useState<boolean>(false);

    // obejcts interaction

    const destroyObject = (id: IGameObject['id']): void => {
        objects.current = objects.current.filter((object) => object.id !== id);
    };

    const registerObject = (object: IGameObject): void => {
        object.awake?.(game, { ...object });
        objects.current.push(object);
    };

    const game: IGame = {
        context: () => gameField.current.getContext('2d'),
        destroyObject,
        registerObject,
        setStop,
        click,
        gameField,
        isStoped,
    };

    // collision and updates
    const getWall = (tag: string, position: Vector2D): IGameObject => {
        return { id: 'wall', tag, volume: { current: 0 }, position: { current: position } };
    };

    const handleCollision = (currentObject: IGameObject): IUpdates => {
        const { position, collision, volume } = currentObject;
        const objectUpdates: IUpdates = [];

        // walls collision checking
        if (position.current.x + volume.current > gameField.current.width || position.current.x - volume.current < 0) {
            objectUpdates.push(collision?.(getWall('horizontalWall', { x: gameField.current.width, y: position.current.y }), { ...currentObject }, game));
        }
        if (position.current.y + volume.current >= gameField.current.height || position.current.y - volume.current <= 0) {
            objectUpdates.push(collision?.(getWall('verticalWall', { x: position.current.x, y: gameField.current.height }), { ...currentObject }, game));
        }

        // obejcts collision checking
        for (const obj of objects.current.filter((object) => object.id !== currentObject.id)) {
            const pos: Vector2D = { x: currentObject.position.current.x, y: obj.position.current.y };

            const firstDistance = Math.abs(pos.y - currentObject.position.current.y) + Math.abs(pos.x - currentObject.position.current.x);
            const secondDistance = Math.abs(pos.y - obj.position.current.y) + Math.abs(pos.x - obj.position.current.x);
            const distance = Math.sqrt(firstDistance ** 2 + secondDistance ** 2);

            if (distance <= currentObject.volume.current + obj.volume.current) {
                objectUpdates.push(collision?.({ ...obj }, { ...currentObject }, game));
            }
        }
        return objectUpdates;
    };

    function update(): void {
        const context = gameField.current.getContext('2d');
        const updates: Array<IUpdates> = [];
        context.clearRect(0, 0, gameField.current.width, gameField.current.height);
        for (const object of objects.current) {
            const objectUpdates = handleCollision(object);
            if (objectUpdates.length) {
                updates.push(objectUpdates);
            }
        }
        for (const objectUpdates of updates) {
            for (const updateObj of objectUpdates) {
                updateObj?.();
            }
        }

        for (const object of objects.current) {
            object.render?.(game, { ...object });
            object.update?.({ ...object });
        }
        if (!isStoped) {
            requestAnimation.current = requestAnimationFrame(update);
        }
    }

    // click handling
    function click(position: Vector2D, pagePosition: Vector2D): void {
        for (const obj of objects.current) {
            const pos: Vector2D = { x: position.x, y: obj.position.current.y };

            const firstDistance = Math.abs(pos.y - position.y) + Math.abs(pos.x - position.x);
            const secondDistance = Math.abs(pos.y - obj.position.current.y) + Math.abs(pos.x - obj.position.current.x);
            const distance = Math.sqrt(firstDistance ** 2 + secondDistance ** 2);

            if (distance <= obj.volume.current) {
                obj.click?.(obj, pagePosition);
            }
        }
    }

    // start & stop game
    useEffect(() => {
        requestAnimation.current = requestAnimationFrame(update);
        return () => cancelAnimationFrame(requestAnimation.current);
    }, [isStoped]);

    return game;
};
