module.exports = {
  plugins: {
    autoprefixer: {
      overrideBrosersList: ['Android >= 4.0', 'iOS >= 7'],
    },
    'postcss-pxorem': {
      rootValu: 16,
      propList: ['*'],
      selectorBlackList: [':root'],
    },
  },
}
