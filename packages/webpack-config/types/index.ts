import type { ModuleOptions, Configuration } from 'webpack';
import { Configuration as DevServerConfigType } from 'webpack-dev-server';

export interface ConfigProps {
    isProd: boolean;
    isDev: boolean;
    paths: ConfigurationPaths;
    port: number;
}

export interface EnvVariables {
    mode?: 'production' | 'development';
    port?: number;
}

export interface ConfigurationPaths {
    entry: string;
    output: string;
    html: string;
    src: string;
}

export type LoadersConfigType = ModuleOptions['rules'];

export type PluginsConfigType = Configuration['plugins'];

export type ResolversConfigType = Configuration['resolve'];

export { DevServerConfigType };
