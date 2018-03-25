const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const AngularCompilerPlugin = require('@ngtools/webpack').AngularCompilerPlugin;
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (env) => {
    const extractSass = new ExtractTextPlugin({
        filename: 'styles.css',
        allChunks: true
    });
    const isDevBuild = !(env && env.prod);
    const sharedConfig = {
        stats: { modules: false },
        context: __dirname,
        resolve: { extensions: [ '.js', '.ts' ] },
        output: {
            filename: '[name].js',
            publicPath: 'dist/' // Webpack dev middleware, if enabled, handles requests for this URL prefix
        },
        module: {
            rules: [
                { test: /\.ts$/, use: isDevBuild ? ['awesome-typescript-loader?silent=true', 'angular2-template-loader'] : '@ngtools/webpack' },
                { test: /\.html$/, use: 'html-loader?minimize=false' },
                { 
                    test: /\.css$/, 
                    use: [ 
                        { loader: 'to-string-loader' },
                        { loader: isDevBuild ? 'css-loader' : 'css-loader?minimize' }
                    ] 
                },
                { 
                    test: /\.scss(\?|$)/, 
                    use: extractSass.extract({ 
                        use: [
                            { loader: isDevBuild ? 'css-loader' : 'css-loader?minimize' }, 
                            { loader: 'sass-loader' }
                        ],
                        fallback: 'style-loader'
                    })
                },
                { test: /\.(png|jpg|jpeg|gif|woff|woff2|eot|ttf|svg)(\?|$)/, use: 'url-loader?limit=100000' }
            ]
        },
        plugins: [
            extractSass,
            new CheckerPlugin({
                useCache: true,
                isolatedModules: true,
                transpileOnly: true,
                useTranspileMode: true
            })
        ]
    };

    const clientBundleOutputDir = './wwwroot/dist';
    const clientBundleConfig = merge(sharedConfig, {
        entry: { 'main-client': './ClientApp/main.ts' },
        output: { path: path.join(__dirname, clientBundleOutputDir) },
        plugins: [
            new webpack.DllReferencePlugin({
                context: __dirname,
                manifest: require('./wwwroot/dist/vendor-manifest.json')
            })
        ].concat(isDevBuild ? [
            // Plugins that apply in development builds only
            new webpack.SourceMapDevToolPlugin({
                filename: '[file].map', // Remove this line if you prefer inline source maps
                moduleFilenameTemplate: path.relative(clientBundleOutputDir, '[resourcePath]') // Point sourcemap entries to the original file locations on disk
            })
        ] : [
            // Plugins that apply in production builds only
            new webpack.optimize.UglifyJsPlugin(),
            new AngularCompilerPlugin({
                tsConfigPath: './tsconfig.json',
                entryModule: path.join(__dirname, 'ClientApp/app/base.module#BaseModule'),
                exclude: ['./**/*.server.ts']
            })
        ])
    });

    return [clientBundleConfig];
};
