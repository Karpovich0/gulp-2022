import replace from "gulp-replace"; // search and replace
import plumber from "gulp-plumber"; // errors processing
import notify from "gulp-notify"; // notification about errors
import browsersync from "browser-sync"; // live server
import newer from "gulp-newer"; // search for unchenged files. For example - images

export const plugins = {
    replace: replace,
    plumber: plumber,
    notify: notify,
    browsersync: browsersync,
    newer: newer
}