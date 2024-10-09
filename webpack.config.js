module.exports = {
  // ... existing configuration ...
  
  devtool: false,
  module: {
    rules: [
      // ... existing rules ...
      {
        test: /\.mjs$/,
        enforce: 'pre',
        use: ['source-map-loader'],
        resolve: {
          fullySpecified: false,
        },
        exclude: /node_modules\/@mediapipe\/tasks-vision/, // Exclude the problematic module
      },
    ],
  },
  // eslint-disable-next-line
  ignoreWarnings: [
    (warning) =>
      warning.module &&
      warning.module.resource.includes('@mediapipe/tasks-vision'),
  ],
};