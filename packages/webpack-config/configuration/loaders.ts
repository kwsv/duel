import type { LoadersConfigType, ConfigProps } from '../types';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ReactRefreshTypeScript from 'react-refresh-typescript';

const LoadersConfig = ({ isDev }: ConfigProps): LoadersConfigType => {
    const cssLoaders = {
        test: /\.css$/i,
        use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
        ],
    };

    const assetsLoader = {
        test: /\.(jpg|png|svg|gif)$/,
        type: 'asset/resource',
        generator: {
            filename: `assets/images/${isDev ? '[name][ext]' : '[hash][ext][query]'}`,
        },
    };

    const tsLoader = {
        test: /\.tsx?$/,
        use: {
            loader: 'ts-loader',
            options: {
                getCustomTransformers: () => {
                    return {
                        before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
                    };
                },
                transpileOnly: isDev,
            },
        },
        exclude: /node_modules/,
    };

    return [tsLoader, cssLoaders, assetsLoader];
};

export default LoadersConfig;
