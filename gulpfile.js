"use strict";

const gulp          = require("gulp");
const config        = require("./config.json");
const NbeatRegistry = require("@northernbeat/gulp-tasks");
const reg           = new NbeatRegistry(config);

gulp.registry(reg);

gulp.task("default", gulp.series("build-jquery-plugins"));
