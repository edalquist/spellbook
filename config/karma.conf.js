module.exports = function(config){
    config.set({
    basePath : '../',

    files : [
      'app/lib/angular/angular.js',
      'app/lib/angular/angular-*.js',
      'app/lib/bootstrap-custom/ui-bootstrap-custom-0.10.0.js',
      'app/lib/bootstrap-custom/ui-bootstrap-custom-tpls-0.10.0.js',
      'app/js/**/*.js',
      'test/lib/jquery/*.js',
      'test/lib/jasmine-jquery/*.js',
      'test/lib/angular/*.js',
      'test/unit/**/*.js',
      { pattern: 'app/data/*.json',
          watched: true,
          served:  true,
          included: false
      }
    ],

    exclude : [
      'app/lib/angular/angular-loader.js',
      'app/lib/angular/*.min.js',
      'app/lib/angular/angular-scenario.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
      'karma-junit-reporter',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-jasmine'
    ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

})}
