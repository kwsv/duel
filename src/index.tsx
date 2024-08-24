import { createRoot } from 'react-dom/client';
import { App } from '@app';

const root = document.getElementById('root') as HTMLElement;

if (!root) {
    throw Error('root not found');
}

const react = createRoot(root);

react.render(<App />);
