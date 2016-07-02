// ====== Include gulp
var gulp        = require('gulp');

// ===== Include Plugins
//var jade      = require('gulp-jade');
var livereload  = require('gulp-livereload');
var sass        = require('gulp-sass');
var plumber     = require('gulp-plumber');
var imagemin    = require('gulp-imagemin');
var notify      = require('gulp-notify');
var cssmin      = require('gulp-minify-css');
//var html2jade   = require('gulp-html2jade');


// ===== Options is for the Jade output. 2 spaces for tab.
//var options     = {nspaces:2};

// ===== Variable for output directories
//var rootDir   = './';
var outputDir   = './site/003';


// ====== THE TASK LIST ========
// Comment out the notifys if they bug ya!

// ====== Jade Task
// gulp.task('jade', function() {
//     return gulp.src(['./jade/**/*.jade', '!./jade/{templates,templates/**/*,includes,convert}/*'])
//         .pipe(plumber(plumberErrorHandler))
//         .pipe(jade({
//           pretty: true
//         }))
//         .pipe(gulp.dest('./dist/'))
//         .pipe(gulp.dest(outputDir))
//         .pipe(gulp.dest('./'))
//         .pipe(notify('Jade to HTML - Successful'))
// });


// ====== Compile SCSS
gulp.task('sass', function() {
    gulp.src('./scss/**/*.scss')
        .pipe(plumber(plumberErrorHandler))
        .pipe(sass())
        //.pipe(gulp.dest('css/'))
        .pipe(gulp.dest(outputDir + '/css'))
        .pipe(livereload())
        .pipe(notify('SCSS to CSS - Successful'));
});




// ===== Finalize Concatenate & Minify JS with 'gulp build'
// gulp.task('scripts', function() {
//     return gulp.src(['js/**/*.js'])
//         //.pipe(concat('main.js'))
//         //.pipe(gulp.dest(outputDir))
//         //.pipe(rename('main.min.js'))
//         //.pipe(uglify())
//         .pipe(gulp.dest(outputDir + '/js'))
//         //.pipe(plumber())
//         .pipe(notify('Scripts - Successful'))
// });

// ===== Image Compression Task with 'gulp build'
gulp.task('imagemin', function () {
    var cache = require('gulp-cache'),
        imagemin = require('gulp-imagemin');

    return gulp.src('./images/**/*')
        .pipe(cache(imagemin({
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest(outputDir + '/images'))
        .pipe(notify('Images Compressed - Successful'));
});

// ===== Misc Tasks with 'gulp build'
// gulp.task('misc', function () {
//     return gulp.src([
//         '*.{ico,png,txt}',
//         '.htaccess'
//         ])
//         .pipe(gulp.dest(outputDir))
//         .pipe(notify('Misc files moved - Successful'));
// });


// ===== Convert HTML to Jade - This ROCKS!!
// == Place html files in folder called h2j.
// == Run with 'gulp h2j' in terminal, outputs to jade/convert
gulp.task('h2j', function () {
    return gulp.src('h2j/*.html')
        .pipe(html2jade(options))
        .pipe(gulp.dest('h2j/convert/'))
        .pipe(notify('HTML to Jade - Successful'));
});

// ===== Browser Sync
// gulp.task('browser-sync', ['jade','sass'], function() {
//     browserSync.init([outputDir + './'], {
//         // comment when using proxy
//         port:8080,
//         server: {baseDir: "./site/003"}
//         // uncomment when using proxy localhost
//         //proxy: "localanchor.dev",
//         //notify: true
//     });
// });

// ====== Watch Task with 'gulp watch' after starting browser-sync
gulp.task('watch', function() {
    livereload.listen();
    //gulp.watch('jade/**/*.jade', ['jade']);
    gulp.watch('./scss/**/*.scss', ['sass']);
    //gulp.watch('js/**/*.js', ['scripts']);
    glup.watch(['./css/style.css'], function (files){livereload.changed(files)
    });

});

// ===== Default Task
gulp.task('default', ['watch'] );
