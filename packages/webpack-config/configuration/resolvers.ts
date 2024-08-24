import type { ConfigProps, ResolversConfigType } from '../types';
import path from 'path';

const ConfigResolvers = ({ paths: { src } }: ConfigProps): ResolversConfigType => {
    return {
        extensions: ['.tsx', '.ts', '.js', '.module.css', '.css'],
        alias: {
            '@shared': path.resolve(src, 'shared'),
            '@entities': path.resolve(src, 'entities'),
            '@processes': path.resolve(src, 'processes'),
            '@features': path.resolve(src, 'features'),
            '@widgets': path.resolve(src, 'widgets'),
            '@pages': path.resolve(src, 'pages'),
            '@app': path.resolve(src, 'app'),
            '@': path.resolve(src),
        },
    };
};

export default ConfigResolvers;
