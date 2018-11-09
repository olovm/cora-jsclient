module.exports = function(config){
    var base_config={
        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['qunit'],

        // list of files / patterns to load in the browser
        files: [
            'src/main/webapp/script/**/*.js',
            'src/main/webapp/css/**/*.css',
            'src/test/script/**/*.js'
        ],

        // list of files to exclude
        exclude: [],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'src/main/webapp/script/*.js': ['coverage'],
            'src/main/webapp/script/!(lib)/**/*.js': ['coverage']
        },

        coverageReporter: {
            type: 'lcov',
            dir: 'reports/coverage',
            subdir: function (browser) {
                return browser.toLowerCase().split(/[ /-]/)[0];
            }
        },

        junitReporter: {
            outputFile: 'reports/tests/karma-junit.xml',
            useBrowserName: false,
            suite: ''
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['dots', 'junit', 'coverage'],

        customLaunchers: {
            FirefoxHeadless: {
                base: 'Firefox',
                flags: [ '-headless' ]
            },
            ChromiumHeadless: {
                base: 'Chromium',
                flags: [ '-no-sandbox', '-headless', '-remote-debugging-port=9222' ]
            }
        },

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity
    };

    base_config.singleRun=config.singleRun;
    base_config.browsers=config.browsers;

    return base_config;
};
