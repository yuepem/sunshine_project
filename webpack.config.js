module.exports = {
  // ... existing configuration ...
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
      },
    ],
  },
  ignoreWarnings: [
    (warning) =>
      warning.module &&
      warning.module.resource.includes('@mediapipe/tasks-vision'),
  ],
};