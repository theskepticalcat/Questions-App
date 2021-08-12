const path = require('path'); //модуль из Node js, кот умеет работать с путями в вашей ОС
const HTMLPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


//оптимизация кода для лоадеров
const cssLoaders = extra => {
  const loaders = [
    MiniCssExtractPlugin.loader, 
    'css-loader'
  ];

  if (extra) {
    loaders.push(extra);
  }

  return loaders;
};



module.exports = {
    entry: './src/app.js',
    output: {
        filename: 'bundle.[chunkhash].js',
        path: path.resolve(__dirname, 'public')
    },

    devServer: {
        port: 8000
    },

    plugins: [
        new HTMLPlugin({
            template: './src/index.html'
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
          filename: 'bundle.[chunkhash].css',
        }),
    ],

    module: {
        rules: [
          {
            test: /\.s[ac]ss$/i,
            use: cssLoaders('sass-loader'), //прогнать через css-loader, а потом через style-loader
          },
        ],
      },
}