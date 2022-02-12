const fs = require('fs');

class ExtractSourceMapPlugin {
  apply(compiler) {
    compiler.hooks.emit.tap('ExtractSourceMapPlugin', (compilation) => {
      let fileAsset = compilation.assets["main.js"]
      let fileContent = fileAsset.source()

      let sourceMapFileAsset = compilation.assets["main.js.map"]
      let sourceMapFileContent = sourceMapFileAsset.source()

      compilation.deleteAsset('main.js.map')
      fs.writeFile('./server/main.js.map', sourceMapFileContent, (err) => {
        console.log('sourcemap file copied.')
      })
    })

    compiler.hooks.afterEmit.tap('ExtractSourceMapPlugin', (compilation) => {
      let path = './output/main.js'

      fs.readFile(path, (err, data) => {
        if (err) throw err;

        let raw = data.toString()
        let reg = /sourceMappingURL=(.*)$/
        let after = raw.replace(reg, 'sourceMappingURL=http://localhost:8000/main.js.map')

        fs.writeFile(path, after, (err) => {
          if (err) throw err;

          console.log('after modify the SourceMap URL')
        })
      })
    })
  }
}

module.exports.ExtractSourceMapPlugin = ExtractSourceMapPlugin