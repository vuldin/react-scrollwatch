module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'ReactScrollwatch',
      externals: {
        react: 'React'
      }
    }
  }
}
