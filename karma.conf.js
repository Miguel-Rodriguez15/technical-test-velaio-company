module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    files: [
      'src/**/*.js',
      'src/**/*.spec.js',
    ],
    exclude: [],
    preprocessors: {},
    reporters: ['progress', 'spec'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    plugins: [
      require('karma-jasmine'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma'),
      require('karma-chrome-launcher') // Asegúrate de que esto esté presente
    ],
    browsers: ['Chrome'], // Configura para usar Chrome
    singleRun: false,
    concurrency: Infinity
  });
};
