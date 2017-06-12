import gulp from 'gulp';
import babel from 'gulp-babel';
import nodemon from 'gulp-nodemon';
import path from 'path';

gulp.task('transpile', () =>
  gulp.src(['server/*.js'])
    .pipe(babel())
    .pipe(gulp.dest('server/dist'))
);


gulp.task('serve', ['transpile'], () => {
  nodemon({
    script: path.join('server', 'dist', 'server.js'),
    ext: 'js'
  });
});

gulp.task('default', ['serve']);
