import { type Configuration } from 'webpack';
import type { ConfigProps, EnvVariables, ConfigurationPaths } from './types';
import LoadersConfig from './configuration/loaders';
import ConfigResolvers from './configuration/resolvers';
import ConfigPlugins from './configuration/plugins';
import ConfigDevServer from './configuration/devServer';

const WebpackConfig = (
    { mode, port }: EnvVariables,
    paths: ConfigurationPaths,
): Configuration => {
    const props: ConfigProps = {
        isDev: mode === 'development',
        isProd: mode === 'production',
        port: port ?? 3000,
        paths,
    };

    return {
        mode: mode ?? 'development',
        entry: paths.entry,
        devtool: props.isDev ? 'inline-source-map' : false,
        output: {
            path: paths.output,
            filename: '[name].[contenthash].js',
            clean: true,
            assetModuleFilename: 'assets/[hash][ext][query]',
        },
        module: {
            rules: LoadersConfig(props),
        },
        resolve: ConfigResolvers(props),
        plugins: ConfigPlugins(props),
        devServer: ConfigDevServer(props),
    };
};
export { EnvVariables, ConfigurationPaths, Configuration };

export default WebpackConfig;
