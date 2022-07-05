import { configFtp } from "../config/ftp.js";
import vinylFtp from "vinyl-ftp";
import util from "gulp-util";

export const ftp = () => {
    configFtp.log = util.log;
    const ftpConnect = vinylFtp.create(configFtp);
    return app.gulp.src(`${app.path.buildFolder}/**/*.*`, {})
        .pipe(app.plugins.plumber( //search for errors
            app.plugins.notify.onError({ //notify about errors
                title: "FTP",
                massage: "Error: <%= error.message %>"
            })))
        .pipe(ftpConnect.dest(`/${app.path.ftp}/${app.path.rootFolder}`));
}