import dartSass from "sass"; //sass preprocessor
import gulpSass from "gulp-sass"; //plugin to start sass preprocessor
import rename from "gulp-rename"; //change names of files

import cleanCss from "gulp-clean-css"; //compress css file
import webpcss from "gulp-webpcss"; //show webp images
import autoprefixer from "gulp-autoprefixer"; //add prefixes
import groupCssMediaQueries from "gulp-group-css-media-queries"; //group media queries

const sass = gulpSass(dartSass);

export const scss = () => {
    return app.gulp.src(app.path.src.scss, { sourcemaps: true })
        .pipe(app.plugins.plumber( //search for errors
            app.plugins.notify.onError({ //notify about errors
                title: "SCSS",
                massage: "Error: <%= error.message %>"
            })))
        .pipe(app.plugins.replace(/@img\//g, "../img/")) //repair files paths to avoid some problems that will apear during work with fileInclude
        .pipe(sass({ outputStyle: "expanded" }))
        .pipe(groupCssMediaQueries())
        .pipe(webpcss({ webClass: ".webp", noWebpClass: ".no-webp" }))
        .pipe(autoprefixer({ grid: true, overrideBrowserslist: ["last 3 versions"], cascade: true }))
        .pipe(app.gulp.dest(app.path.build.css)) //not compressed version of css file
        .pipe(cleanCss()) //compress css file
        .pipe(rename({ extname: ".min.css" })) //change file extension name
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(app.plugins.browsersync.stream());
}