const path = require('path');
const fs = require('fs');
const rimraf = require('rimraf');
const mkdirp = require('mkdirp');
const serialize = require('serialize-javascript');
const extractData = require('formatjs-extract-cldr-data');

const BUILD_DIRECTORY = path.resolve(__dirname, '..', 'src', 'locale-data');

const cldrData = extractData({
  pluralRules: true,
  relativeFields: true,
});

const formatData = localeData => `export default ${serialize(localeData)}`;

const buildData = () => Object.keys(cldrData)
  .map((locale) => new Promise((resolve, reject) => {
    fs.writeFile(
      `${BUILD_DIRECTORY}/${locale}.js`,
      formatData(cldrData[locale]),
      (err) => {
        if (err) {
          reject(err);
        }

        resolve();
      }
    );
  }));

const main = () => {
  rimraf.sync(BUILD_DIRECTORY);
  mkdirp.sync(BUILD_DIRECTORY);

  Promise.all(buildData())
    .then(() => {
      console.log('Done building!');
    });
};

main();
