const { src, dest, series, watch } = require(`gulp`),
    htmlValidator = require(`gulp-html`),
    htmlCompressor = require(`gulp-htmlmin`),
    CSSLinter = require(`gulp-stylelint`),
    babel = require(`gulp-babel`),
    jsLinter = require(`gulp-eslint`),
    jsCompressor = require(`gulp-uglify`),
    browserSync = require(`browser-sync`),
    cleanCSS = require('gulp-clean-css'),
    reload = browserSync.reload;

let validateHTML = () => {
  return src(`*.html`).pipe(htmlValidator())
  .pipe(dest(`temp`));
};

let compressHTML = () => {
  return src(`*.html`)
  .pipe(htmlCompressor({collapseWhitespace: true}))
  .pipe(dest(`prod`));
};

let lintCSS = () => {
  return src(`css/style.css`)
  .pipe(CSSLinter({
    failAfterError: false,
    reporters: [
      {formatter: `string`, console: true}
    ]
  }))
  .pipe(dest(`temp/css`));
};

let compressCSS = () => {
  return src('css/*.css')
  .pipe(cleanCSS({compatibility: 'ie8'}))
  .pipe(dest('prod/css'));
};

let lintJS = () => {
  return src(`js/*.js`)
  .pipe(jsLinter())
  .pipe(jsLinter.formatEach(`compact`));
};

let transpileJSForDev = () => {
  return src(`js/*.js`)
  .pipe(babel())
  .pipe(jsCompressor())
  .pipe(dest(`temp/js`));
};

let transpileJSForProd = () => {
  return src(`js/*.js`)
  .pipe(babel())
  .pipe(jsCompressor())
  .pipe(dest(`prod/js`));
 };

 let imageForProd = () => {
   return src(`img/*`)
   .pipe(dest(`prod/img`));
 };

let browserChoice = `default`;

let serve = () => {
  browserSync({
    notify: true,
    browser: browserChoice,
    reloadDelay: 5000,
    server: {
      baseDir: `temp`
    }
  });

  watch(`js/*.js`, series(lintJS, transpileJSForDev))
  .on(`change`, reload);

  watch(`css/*.css`, lintCSS)
  .on(`change`, reload);

  watch(`*.html`, validateHTML)
  .on(`change`, reload);
};

exports.validateHTML = validateHTML;
exports.compressHTML = compressHTML;
exports.lintCSS = lintCSS;
exports.compressCSS = compressCSS;
exports.lintJS = lintJS;
exports.transpileJSForDev = transpileJSForDev;
exports.transpileJSForProd = transpileJSForProd;
exports.imageForProd = imageForProd;
exports.serve = series(
  validateHTML,
  lintCSS,
  lintJS,
  transpileJSForDev,
  serve
);
exports.build = series(
  compressHTML,
  compressCSS,
  transpileJSForProd,
  imageForProd
);
