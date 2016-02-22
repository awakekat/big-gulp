// ====== Include gulp
var gulp        = require('gulp');

// ===== Include Plugins
var jade        = require('gulp-jade');
var plumber     = require('gulp-plumber');
var notify      = require('gulp-notify');
var cssmin      = require('gulp-minify-css');
var sass        = require('gulp-sass');
var html2jade   = require('gulp-html2jade');
var rename      = require('gulp-rename');
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;


// ===== Options is for the Jade output. 2 spaces for tab.
var options     = {nspaces:2};

// ===== Variable for output directory
var outputDir   = 'dist/';


// ====== Jade Task
gulp.task('jade', function() {
  return gulp.src(['./jade/**/*.jade', '!./jade/{templates,templates/**/*,includes,convert}/*'])
      .pipe(plumber())
      .pipe(jade({
        pretty: true
      }))
      .pipe(gulp.dest('./dist/'))
      //.pipe(gulp.dest('./'))
      .pipe(gulp.dest(''))
      .pipe(notify('Jade to HTML - Successful'))
});


// ====== HTML2Jade Task
gulp.task('html2jade', function(){
  gulp.src('index.html')
    .pipe(html2jade(options))
    .pipe(gulp.dest(outputDir));
});
// ====== Compile SCSS
gulp.task('sass', function() {
    return gulp.src('scss/*.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(gulp.dest('css'))
        .pipe(notify('SCSS to CSS - Successful'))
        .pipe(reload({stream:true}));
});


// ====== Compile SCSS to Production
gulp.task('prosass', function() {
    return gulp.src('scss/*.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(outputDir + '/css'))
        .pipe(notify('SCSS to CSS - Successful'))
        .pipe(reload({stream:true}));
});


// ===== Image Compression Task with 'gulp build'
gulp.task('img', function () {
    var cache = require('gulp-cache'),
    imagemin = require('gulp-imagemin');

    return gulp.src('img/**/*')
        .pipe(cache(imagemin({
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest(outputDir + '/img'))
        .pipe(notify('Images Compressed - Successful'));
});


// ====== Copy files from bower_components
gulp.task('copy-foundation', function() {
   gulp.src('./bower_components/foundation/scss/**/*.*')
   .pipe(gulp.dest('./scss'));
});

gulp.task('copyfonts', function() {
   gulp.src('./bower_components/font-awesome/fonts/**/*.{ttf,woff,eof,svg}')
   .pipe(gulp.dest( outputDir + '/fonts'))
   .pipe(notify('Fonts copied - Successful'))
});


// ===== Browser Sync
gulp.task('browser-sync', function() {
    browserSync.init({
        proxy: "rdidjs.dev"
    });
});


// Watch files for changes
gulp.task('watch', ['jade', 'sass', 'img', 'browser-sync'], function () {
    gulp.watch("jade/*.jade", ['jade']);
    gulp.watch("scss/*.scss", ['sass']);
    gulp.watch('img/src/*.{png,jpg,gif}', ['img']);
});

// ===== Default Task
gulp.task('default', ['jade', 'sass', 'browser-sync']);

// ===== Production Build Task
gulp.task('build', ['fonts', 'prosass', 'scripts', 'img']);