import type { DevServerConfigType, ConfigProps } from '../types';

const ConfigDevServer = ({ port, isDev }: ConfigProps): DevServerConfigType => {
    if (isDev) {
        return {
            port,
            hot: true,
            historyApiFallback: true,
        };
    }
};

export default ConfigDevServer;
