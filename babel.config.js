module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      // style: (name) => `${name}/index.less`,
      style: (name) => `${name}/style/less`
    }, 'vant']
  ]
}
