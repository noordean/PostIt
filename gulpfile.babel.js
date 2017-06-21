import gulp from 'gulp';
import babel from 'gulp-babel';
import nodemon from 'gulp-nodemon';
import jasmine from 'gulp-jasmine';
import exit from 'gulp-exit';
import path from 'path';

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



gulp.task('default', ['run-tests']);
