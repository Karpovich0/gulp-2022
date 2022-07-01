import fileInclude from "gulp-file-include";
import webpHtmlNosvg from "gulp-webp-html-nosvg";
import versionNumber from "gulp-version-number";

export const html = () => {
    return app.gulp.src(app.path.src.html)
        .pipe(app.plugins.plumber( //search for errors
            app.plugins.notify.onError({ //notify about errors
                title: "HTML",
                massage: "Error: <%= error.message %>"
            })))
        .pipe(fileInclude()) // u can insert html templates
        .pipe(app.plugins.replace(/@img\//g, "img/")) //repair files paths to avoid some problems that will apear during work with fileInclude
        .pipe(webpHtmlNosvg())
        .pipe(
            versionNumber({
                "value": "%DT%",
                "append": {
                    "key": "_v",
                    "cover": 0,
                    "to": [
                        "css", "js",
                    ]
                },
                "output": { "file": "gulp/version.json" }
            })
        )
        .pipe(app.gulp.dest(app.path.build.html))
        .pipe(app.plugins.browsersync.stream());
}