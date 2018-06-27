const path = require('path');
const fs = require('fs');
const rimraf = require('rimraf');
const mkdirp = require('mkdirp');
const serialize = require('serialize-javascript');
const extractData = require('formatjs-extract-cldr-data');
const { rollup } = require('rollup');
const { uglify } = require('rollup-plugin-uglify');

const BUILD_DIRECTORY = path.resolve(__dirname, '..', 'src', 'locale-data');
const OUTPUT_DIRECTORY = path.resolve(__dirname, '..', 'locale-data');

const cldrData = extractData({
  pluralRules: true,
  relativeFields: true,
});

const formatData = localeData => `export default ${serialize(localeData)}`;

const buildData = (locale, localeData) =>
  new Promise((resolve, reject) => {
    fs.writeFile(
      path.join(BUILD_DIRECTORY, `${locale}.js`),
      formatData(localeData),
      err => {
        if (err) {
          reject(err);
        }

        resolve(locale);
      }
    );
  });

const main = () => {
  rimraf.sync(BUILD_DIRECTORY);
  mkdirp.sync(BUILD_DIRECTORY);
  rimraf.sync(OUTPUT_DIRECTORY);
  mkdirp.sync(OUTPUT_DIRECTORY);

  Object.entries(cldrData).forEach(async ([locale, localeData]) => {
    await buildData(locale, localeData);

    const bundle = await rollup({
      input: path.join(BUILD_DIRECTORY, `${locale}.js`),
      plugins: [uglify()],
    });

    await bundle.write({
      format: 'umd',
      file: path.join(OUTPUT_DIRECTORY, `${locale}.js`),
      name: `ReactI17nLocaleData.${locale}`,
    });
  });
};

main();
