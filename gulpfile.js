"use strict";

var gulp    = require("gulp");
var config  = require("./nbeat.json");
var plugins = require("gulp-load-plugins")(config.gulp.loadPlugins);
    
gulp.task("default", ["build"]);
    
gulp.task("clean", require(config.nbeat.gulp + "/clean")(gulp, plugins, config));
gulp.task("build", require(config.nbeat.gulp + "/js-build")(gulp, plugins, config));
