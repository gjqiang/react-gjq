/**
 * Created by gjqiang on 2017/7/11.
 */

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const autoprefixer = require('autoprefixer');

// 笨方法写多页面入口

// 单入口文件
const src = path.resolve(__dirname, 'src')
const index = path.resolve(src, 'frontend', 'index.js')

//判断当前运行环境是开发模式还是生产模式
const nodeEnv = process.env.NODE_ENV || 'development';
const isPro = nodeEnv === 'production';

console.log("当前运行环境：", isPro ? 'production' : 'development')

// 引入dev-server配置文件
const serverConfig = require('./config/server.js');

// ant  使用Icon需要
const svgDirs = [
    require.resolve('antd').replace(/warn\.js$/, ''), // 1. 属于 antd-mobile 内置 svg 文件
    // path.resolve(__dirname, 'src/my-project-svg-foler'),  // 2. 自己私人的 svg 存放目录
];

// 配置产检
const plugins = [
    // 分开打包html
    new HtmlWebpackPlugin({
        template: path.resolve(src, 'frontend', 'index.ejs'),
        filename: 'frontend/index.html',
        title: 'index',
    }),
    // 分开打包多个css
    new ExtractTextPlugin({
        filename: '[name].[contenthash:8].bundle.css',
        allChunks: true,
    }),
    // 抽离公共组件
    new webpack.DllReferencePlugin({
        context: __dirname,
        manifest: require('./manifest.json'),
    }),
]

// 配置devtool
let devtool

// 配置生成文件
let output = {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name]/index.[hash:8].bundle.js',       // --hot时使用，不推荐
    chunkFilename: '[name]-[id].[chunkhash:8].bundle.js', // 代码分割
}

// 根据环境加入插件
if (isPro) {
    plugins.push(
        // css压缩
        new OptimizeCssAssetsPlugin({}),
        // js压缩
        new UglifyJsPlugin({
            compress: {
                warnings: false,
            }
        })
    )

    output = {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',       // --hot时使用，不推荐
        chunkFilename: '[name]-[id].bundle.js', // 代码分割
    }

} else {
    plugins.push(
        new webpack.HotModuleReplacementPlugin()
    )
    devtool = 'cheap-module-source-map'
}

module.exports = {
    devtool,
    context: path.resolve(__dirname, './src'),
    // 配置服务器
    devServer: {
        contentBase: path.resolve(__dirname, './'), // New
        port: serverConfig.port,
        host: serverConfig.host,
        inline: true
    },
    entry: {
        'frontend/index': index
    },
    output,
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                enforce: 'pre',
                use: [
                    {
                        options: {
                            fix: true
                        },
                        loader: require.resolve('eslint-loader'),
                    },
                ],
                include: src,
            },
            {
                test: /\.(eot|woff|svg|ttf|woff2)(\?|$)/,
                loader: require.resolve('file-loader'),
                options: {
                    name: 'font/[name].[hash:8].[ext]',
                },
            },
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                loader: require.resolve('url-loader'),
                options: {
                    limit: 10000,
                    name: 'img/[name].[hash:8].[ext]',
                },
            },
            {
                test: /\.(js|jsx)$/,
                include: src,
                loader: require.resolve('babel-loader'),
                options: {
                    plugins: [
                        ['import', { libraryName: 'antd', style: true }],
                    ],
                    cacheDirectory: true,
                },
            },
            // 打包css
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        "css-loader",
                        {
                            loader: require.resolve('postcss-loader'),
                            options: {
                                ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
                                plugins: () => [
                                    require('postcss-flexbugs-fixes'),
                                    autoprefixer({
                                        browsers: [
                                            '>1%',
                                            'last 4 versions',
                                            'Firefox ESR',
                                            'not ie < 9', // React doesn't support IE8 anyway
                                        ],
                                        flexbox: 'no-2009',
                                    })
                                ]
                            }
                        }
                    ]
                }),
            },
            // 打包less
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback:"style-loader",
                    use: [
                        require.resolve('css-loader'),
                        {
                            loader: require.resolve('postcss-loader'),
                            options: {
                                ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
                                plugins: () => [
                                    require('postcss-flexbugs-fixes'),
                                    autoprefixer({
                                        browsers: [
                                            '>1%',
                                            'last 4 versions',
                                            'Firefox ESR',
                                            'not ie < 9', // React doesn't support IE8 anyway
                                        ],
                                        flexbox: 'no-2009',
                                    })
                                ]
                            }
                        },
                        {
                            loader: require.resolve('less-loader'),
                            options: {
                                modifyVars: { "@primary-color": "#1DA57A" },
                            }
                        }
                    ]
                })
            },
            // 打包scss
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback:"style-loader",
                    use: [
                        require.resolve('css-loader'),
                        {
                            loader: require.resolve('postcss-loader'),
                            options: {
                                ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
                                plugins: () => [
                                    require('postcss-flexbugs-fixes'),
                                    autoprefixer({
                                        browsers: [
                                            '>1%',
                                            'last 4 versions',
                                            'Firefox ESR',
                                            'not ie < 9', // React doesn't support IE8 anyway
                                        ],
                                        flexbox: 'no-2009',
                                    })
                                ]
                            }
                        },
                        {
                            loader: require.resolve('sass-loader'),
                        }
                    ]
                })
            }
        ]
    },
    resolve: {
        modules: ['node_modules', path.join(__dirname, './node_modules')],
        extensions: ['.web.js', '.js', '.json'], // webpack2 不再需要一个空的字符串
        alias: {
            src,
            frontend: 'src/frontend' // 补全路径
        }
    },
    plugins: plugins
};