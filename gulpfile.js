// main module
import gulp from "gulp";

// import pathes
import { path } from "./gulp/config/path.js";

// import general plagins
import { plugins } from "./gulp/config/plugins.js";

//send values  to global variable
global.app = {
    isBuild: process.argv.includes("--build"),
    isDev: !process.argv.includes("--build"),
    path: path,
    gulp: gulp,
    plugins: plugins
};

//import tasks
import { copy } from "./gulp/tasks/copy.js";
import { reset } from "./gulp/tasks/reset.js";
import { html } from "./gulp/tasks/html.js";
import { server } from "./gulp/tasks/server.js";
import { scss } from "./gulp/tasks/scss.js";
import { js } from "./gulp/tasks/js.js";
import { images } from "./gulp/tasks/images.js";
import { otfToTtf, ttfToWoff, fontsStyle } from "./gulp/tasks/fonts.js";
import { svgSprite } from "./gulp/tasks/svgSprite.js";
import { zip } from "./gulp/tasks/zip.js";
import { ftp } from "./gulp/tasks/ftp.js";

// watch changes
function watcher() {
    gulp.watch(path.watch.files, copy); //first parameter - watching a directory whete files placed, and if some of files from that directory changes start second parameter - function, that will process changes
    gulp.watch(path.watch.html, html);
    gulp.watch(path.watch.scss, scss);
    gulp.watch(path.watch.js, js);
    gulp.watch(path.watch.images, images);
}

export { svgSprite };

// process fonts
const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle);

const mainTask = gulp.series(fonts, gulp.parallel(copy, html, scss, js, images));

// build scenarios of executing tasks
const dev = gulp.series(reset, mainTask, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTask);
const deployZip = gulp.series(reset, mainTask, zip);
const deployFtp = gulp.series(reset, mainTask, ftp);

// export scenarios
export { dev };
export { build };
export { deployZip };
export { deployFtp };

//executing default scenario
gulp.task("default", dev);