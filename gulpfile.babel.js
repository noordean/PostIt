import gulp from 'gulp';
import babel from 'gulp-babel';
import nodemon from 'gulp-nodemon';
import jasmine from 'gulp-jasmine';
import exit from 'gulp-exit';
import path from 'path';
import istanbul from 'gulp-istanbul';
import coveralls from 'gulp-coveralls';
import reporter from 'gulp-codeclimate-reporter';
import dotenv from 'dotenv';

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

gulp.task('run-tests', ['transpile'], () => {
  gulp.src(path.join('server', 'dist', 'tests', 'route-test.js'))
  .pipe(jasmine())
  .pipe(exit());
});

// the coverage task depends on 'pre-test' and 'test' to give coverage report
gulp.task('pre-test', () =>
  gulp.src(['server/dist/**/*.js'])
    .pipe(istanbul())
    .pipe(istanbul.hookRequire())
);

gulp.task('test', ['pre-test'], () =>
  gulp.src([path.join('server', 'dist', 'tests', 'route-test.js')])
    .pipe(jasmine())
    .pipe(istanbul.writeReports())
);

gulp.task('coverage', ['test'], () => {
  gulp.src('coverage/**/lcov.info')
    .pipe(coveralls())
    .pipe(exit());
});

gulp.task('codeclimate', ['coverage'], () => {
  return gulp
    .src(['coverage/**/lcov.info'], {read: false} )
    .pipe(reporter({ token: process.env.CODECLIMATE_REPO_TOKEN }))
  ;
});

gulp.task('transpile-template', () =>
  gulp.src(['template/js/style.js'])
    .pipe(babel())
    .pipe(gulp.dest('template/js/dist'))
);