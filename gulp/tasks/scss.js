import dartSass from "sass"; //sass preprocessor
import gulpSass from "gulp-sass"; //plugin to start sass preprocessor
import rename from "gulp-rename"; //change names of files

import cleanCss from "gulp-clean-css"; //compress css file
import webpcss from "gulp-webpcss"; //show webp images
import autoprefixer from "gulp-autoprefixer"; //add prefixes
import groupCssMediaQueries from "gulp-group-css-media-queries"; //group media queries

const sass = gulpSass(dartSass);

export const scss = () => {
    return app.gulp.src(app.path.src.scss, { sourcemaps: app.isDev })
        .pipe(app.plugins.plumber( //search for errors
            app.plugins.notify.onError({ //notify about errors
                title: "SCSS",
                massage: "Error: <%= error.message %>"
            })))
        .pipe(app.plugins.replace(/@img\//g, "../img/")) //repair files paths to avoid some problems that will apear during work with fileInclude
        .pipe(sass({ outputStyle: "expanded" }))
        .pipe(app.plugins.if(
            app.isBuild, groupCssMediaQueries()))
        .pipe(app.plugins.if(
            app.isBuild, webpcss({ webClass: ".webp", noWebpClass: ".no-webp" })))
        .pipe(app.plugins.if(
            app.isBuild, autoprefixer({ grid: true, overrideBrowserslist: ["last 3 versions"], cascade: true })))
        .pipe(app.gulp.dest(app.path.build.css)) //not compressed version of css file
        .pipe(app.plugins.if(
            app.isBuild, cleanCss())) //compress css file
        .pipe(rename({ extname: ".min.css" })) //change file extension name
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(app.plugins.browsersync.stream());
}