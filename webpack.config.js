const path = require('path')

module.exports = {
  mode: 'production',
  entry: './background.js',
  output: {
    path: path.resolve(__dirname, 'public', 'js'),
    filename: 'background.bundle.js',
  },
  performance: {
    maxEntrypointSize: 1024000,
    maxAssetSize: 1024000
  }
}
