const gulp = require('gulp');
const path = require('path');
const webpack = require('webpack');
const runSequence = require('run-sequence');
const del = require('del');
const nodemon = require('gulp-nodemon');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackConfig = require('./webpack.config');
console.log(webpackConfig)
const _ = require('lodash');
//启动前删除build目录
const DEBUG = process.env.NODE_ENV == 'development';
gulp.task('clear', function () {
    return del(['./build/']);
});
//打包vue
gulp.task('webpack', function() {
    console.log('## 代码编译开始');
    var myConfig = Object.create(webpackConfig);
    myConfig.output = {
        path: path.join(__dirname, '/build/static/'),
        filename: '[name].js',
        publicPath: '../static/'
    };
    webpack(myConfig, function (err, state) {
        console.log('## 代码编译完成');
    })
})

gulp.task('webpack:prod', function() {
    console.log('## 代码编译开始');
    var myConfig = webpackConfig;
    
    myConfig.output = {
        path: path.join(__dirname, '/build/static/'),
        filename: '[name].[chunkhash:6].js',
        publicPath: '../static/'
    };
    console.log(myConfig)
    webpack(myConfig, function (err, state) {
        console.log('## 代码编译完成');
    })
})
gulp.task('copy', function() {
    gulp.src(path.join(__dirname, '/src/views/login.html'))
            .pipe(gulp.dest(path.join(__dirname, '/build/views')));
})
//监控文件改动
gulp.task('watch', function() {
    gulp.watch(['./src/*.*', './src/**/*.*', './src/**/**/*.*'], ['webpack']);
})
//开发重启node服务
gulp.task('develop', function (){
    return nodemon({
        script: './app.js',
        ext: 'js',
        watch: 'server',
        stdout: false,
        delay: 1,
    }).on('readable', function onReadable() {
        this.stdout.pipe(process.stdout);
        this.stderr.pipe(process.stderr);
    });
});

gulp.task('default', function() {
  runSequence(
    'clear',
    'webpack',
    'watch',
    'copy'
  );
});

gulp.task('build', function() {
    runSequence(
      'clear',
      'webpack:prod',
      'copy'
    );
})