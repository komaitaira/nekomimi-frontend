const path = require('path');
// webpackモジュールを読み込む
const webpack = require('webpack');
// html-webpack-pluginモジュールを読み込む
const HtmlWebpackPlugin = require('html-webpack-plugin');

const src = path.join(__dirname, 'src');
const dist = path.join(__dirname, 'dist');

// 'production' か 'development' を指定
const MODE = "development";

// ソースマップの利用有無(productionのときはソースマップを利用しない)
const enabledSourceMap = MODE === "development";

module.exports = {
  // developmentモードで実行します
  mode: MODE,
  // ビルドを実行するファイルパス
  entry: path.resolve(src, 'js/index.js'),
  output: {
    // 生成されるファイル名
    filename: 'index.bundle.js',
    // 生成先のディレクトリ
    path: dist
  },
  resolve: {
    // import文のパス指定にnode_modulesを省略できるようにします
    modules: ['node_modules'],
    // .jsまたは.jsxの拡張子を省略できるようにします
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        // ルールを適用するファイルの正規表現
        test: /\.(js|jsx)$/,
        // node_modules以下のファイルには適用しないようにします
        exclude: /node_modules/,
        // 使用するloader
        loader: 'babel-loader',
        options: {
          // ソースマップの利用有無
          sourceMap: enabledSourceMap
        },
      }
    ]
  },
  devServer: {
    contentBase: dist, // 開発サーバーを立ち上げる参照ディレクトリ
    hot: true, // hot-reloadを有効にします
    port: 3000 // サーバーを立ち上げるポート番号
  },
  plugins: [
    // hot-reloadを有効にするプラグインを追加
    new webpack.HotModuleReplacementPlugin(),
    // HtmlWebpackPluginプラグインを追加
    new HtmlWebpackPlugin()
  ]
};