import svgSpriteModule from "gulp-svg-sprite";
export const svgSprite = () => {
    return app.gulp.src(`${app.path.src.svgicons}`, {})
        .pipe(app.plugins.plumber( //search for errors
            app.plugins.notify.onError({ //notify about errors
                title: "SVG SPRITE",
                massage: "Error: <%= error.message %>"
            })))
        .pipe(svgSpriteModule({
            mode: {
                stack: {
                    sprite: `../icons/icons.svg`,
                    example: true // html page with result
                }
            }
        }))
        .pipe(app.gulp.dest(`${app.path.build.images}`));

};