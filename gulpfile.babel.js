import gulp from 'gulp';
import babel from 'gulp-babel';
import nodemon from 'gulp-nodemon';
import exit from 'gulp-exit';
import path from 'path';
import istanbul from 'gulp-istanbul';
import coveralls from 'gulp-coveralls';
import reporter from 'gulp-codeclimate-reporter';
import dotenv from 'dotenv';
import mocha from 'gulp-mocha';

dotenv.config();
gulp.task('transpile', () =>
  gulp.src(['server/**/*.js', '!server/dist/**'])
    .pipe(babel())
    .pipe(gulp.dest('server/dist'))
);
gulp.task('serve', ['transpile'], () => {
  nodemon({
    script: path.join('server', 'dist', 'server.js'),
    ext: 'js'
  });
});
gulp.task('pre-test', ['transpile'], () => {
  return gulp.src(['server/dist/**/*.js'])
    .pipe(istanbul())
    .pipe(istanbul.hookRequire());
});
gulp.task('run-tests', ['pre-test'], () => {
  return gulp.src(['server/dist/tests/route-test.js', 'server/dist/tests/model-test.js'], { read: false })
    .pipe(mocha({
      timeout: 100000
    }
    ))
    .pipe(istanbul.writeReports())
    .pipe(exit());
});
gulp.task('coveralls', ['run-tests'], () => {
  gulp.src('coverage/**/lcov.info')
    .pipe(coveralls())
    .pipe(exit());
});
gulp.task('codeclimate', ['coveralls'], () => {
  return gulp
    .src(['coverage/**/lcov.info'], { read: false })
    .pipe(reporter({ token: process.env.CODECLIMATE_REPO_TOKEN }))
    .pipe(exit());
});
gulp.task('transpile-template', () =>
  gulp.src(['template/js/style.js'])
    .pipe(babel())
    .pipe(gulp.dest('template/js/dist'))
);
