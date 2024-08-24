import { createContext } from 'react';
import { IGame } from '@shared';

export const GameApiContext = createContext<IGame>(null);
