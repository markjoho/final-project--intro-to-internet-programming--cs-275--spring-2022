const { src, dest, series, watch } = require(`gulp`),
    htmlValidator = require(`gulp-html`),
    htmlCompressor = require(`gulp-htmlmin`),
    CSSLinter = require(`gulp-stylelint`),
    babel = require(`gulp-babel`),
    jsLinter = require(`gulp-eslint`),
    browserSync = require(`browser-sync`),
    cleanCSS = require('gulp-clean-css').
    jsCompressor = require(`gulp-uglify`),
    reload = browserSync.reload;
    compressImages = require(`gulp-image`);

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
  return src(`dev/css/*.css`)
    .pipe(CSSLinter({
      failAfterError: false,
      reporters: [
        {formatter: `string`, console: true}
      ]
    }));
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


let compressImages = () => {
    return src(`img/*.png`)
        .pipe(imageCompressor({
            optipng: [`-i 1`, `-strip all`, `-fix`, `-o7`, `-force`],
            pngquant: [`--speed=1`, `--force`, 256],
            zopflipng: [`-y`, `--lossy_8bit`, `--lossy_transparent`],
            jpegRecompress: [`--strip`, `--quality`, `medium`, `--min`, 40,
                `--max`, 80],
            mozjpeg: [`-optimize`, `-progressive`],
            gifsicle: [`--optimize`],
            svgo: [`--enable`, `cleanupIDs`, `--disable`, `convertColors`],
            quiet: false
        }))
        .pipe(dest(`prod/img`));
};

let browserChoice = `default`;

async function brave () {
    browserChoice = `brave browser`;
}

async function chrome () {
    browserChoice = `google chrome`;
}

async function edge () {
    // In Windows, the value might need to be “microsoft-edge”. Note the dash.
    browserChoice = `microsoft edge`;
}

async function firefox () {
    browserChoice = `firefox`;
}

async function opera () {
    browserChoice = `opera`;
}

async function safari () {
    browserChoice = `safari`;
}

async function vivaldi () {
    browserChoice = `vivaldi`;
}

async function allBrowsers () {
    browserChoice = [
        `brave browser`,
        `google chrome`,
        `microsoft edge`, // Note: In Windows, this might need to be microsoft-edge
        `firefox`,
        `opera`,
        `safari`,
        `vivaldi`
    ];
}

let serve = () => {
    browserSync({
        notify: true,
        reloadDelay: 50,
        browser: browserChoice,
        server: {
            baseDir: [
                `temp`
            ]
        }
    });

    watch(`js/*.js`, series(lintJS, transpileJSForDev))
      .on(`change`, reload);

    watch(`css/*.css`, lintCSS)
      .on(`change`, reload);

    watch(`html/*.html`, validateHTML)
      .on(`change`, reload);

    watch(`img/*`)
        .on(`change`, reload);
};


exports.validateHTML = validateHTML;
exports.compressHTML = compressHTML;
exports.compressCSS = compressCSS;
exports.lintCSS = lintCSS;
exports.lintJS = lintJS;
exports.transpileJSForDev = transpileJSForDev;
exports.transpileJSForProd = transpileJSForProd;
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
  transpileJSForProd);
