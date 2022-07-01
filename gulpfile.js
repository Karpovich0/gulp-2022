// main module
import gulp from "gulp";

// import pathes
import { path } from "./gulp/config/path.js";

// import general plagins
import { plugins } from "./gulp/config/plugins.js";

//send values  to global variable
global.app = {
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

// watch changes
function watcher() {
    gulp.watch(path.watch.files, copy); //first parameter - watching a directory whete files placed, and if some of files from that directory changes start second parameter - function, that will process changes
    gulp.watch(path.watch.html, html);
    gulp.watch(path.watch.scss, scss);
    gulp.watch(path.watch.js, js);
    gulp.watch(path.watch.images, images);
}

const mainTask = gulp.parallel(copy, html, scss, js, images);

// build scenarios of executing tasks
const dev = gulp.series(reset, mainTask, gulp.parallel(watcher, server));

//executing default scenario
gulp.task("default", dev);