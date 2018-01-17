module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'ReactI17n',
      externals: {
        react: 'React'
      }
    }
  }
}
