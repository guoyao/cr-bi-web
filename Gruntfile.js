module.exports = function (grunt) {
    "use strict";

    grunt.initConfig({
        // Wipe out previous builds and test reporting.
        clean: ['dist/', 'test/reports'],

        // Run your source code through JSHint's defaults.
        jshint: {
            all: ['Gruntfile.js', 'app/**/*.js', 'test/<%= karma.options.frameworks[0] %>/**/*.spec.js'],
            options: {
                jshintrc: '.jshintrc',
                ignores: ['app/libs/**/*.js']
            }
        },

        bower: {
            install: {
                options: {
                    copy: false,
                    cleanTargetDir: true
                }
            }
        },

        copy: {
            dependencies: {
                files: [
                    {
                        'app/libs/require.js': 'vendor/bower/requirejs/require.js',
                        'app/libs/text.js': 'vendor/bower/requirejs-text/text.js',
                        'app/libs/jquery.js': 'vendor/bower/jquery/jquery.js',
                        'app/libs/json2.js': 'vendor/libs/json2.js',
                        'app/libs/underscore.js': 'vendor/bower/lodash/dist/lodash.underscore.js',
                        'app/libs/backbone.js': 'vendor/bower/backbone/backbone.js',
                        'app/libs/backbone.marionette.js': 'vendor/bower/backbone.marionette/lib/backbone.marionette.js',
                        'app/libs/gui.js': 'vendor/bower/gui/dist/js/gui.js',
                        'app/libs/jquery.cookie.js': 'vendor/bower/jquery.cookie/jquery.cookie.js',
                        'app/libs/jquery.dateFormat.js': 'vendor/libs/jquery.dateFormat-1.0.js'
                    },
                ]
            },
            resources: {
                files: [{expand: true, src: ['vendor/**/images/**'], dest: 'dist'}]
            }
        },

        // This task uses James Burke's excellent r.js AMD builder to take
        // modules and concatenate them into a single file.
        requirejs: {
            options: grunt.file.readJSON('app/optimizer.json'),
            optimize: {
                options: {
                    fileExclusionRegExp: /less|optimizer\.json/
                }
            }
        },

        recess: {
            dist: {
                options: {
                    compile: true,
                    compress: false
                },
                files: {
                    'dist/css/common.css': 'app/less/common.less',
                    'dist/css/index.css': 'app/less/index.less',
                    'dist/css/login.css': 'app/less/login.less'
                }
            }
        },

        // This task simplifies working with CSS inside Backbone Boilerplate
        // projects.  Instead of manually specifying your stylesheets inside the
        // HTML, you can use `@imports` and this task will concatenate only those
        // paths.
        styles: {
            // Out the concatenated contents of the following styles into the below
            // development file path.
            'dist/css/libs.css': {
                prefix: "./app/less/",

                // Point this to where your `index.css` file is location.
                src: 'app/less/libs.less',

                // Rewrite image paths during release to be relative to the `./` directory.
                forceRelative: '../'
            }
        },

        // Minfiy the distribution CSS.
        cssmin: {
            release: {
                files: {
                    'dist/css/libs.min.css': ['dist/css/libs.css'],
                    'dist/css/common.min.css': ['dist/css/common.css'],
                    'dist/css/index.min.css': ['dist/css/index.css'],
                    'dist/css/login.min.css': ['dist/css/login.css']
                }
            }
        },

        processhtml: {
            release: {
                files: {
                    'dist/index.html': ['app/index.html']
                }
            }
        },

        server: {
            options: {
                host: '0.0.0.0',
                port: 3000,
                prefix: 'dist'
            },

            development: {},

            release: {},

            test: {
                options: {
                    forever: false,
                    port: 3001
                }
            }
        },

        compress: {
            release: {
                options: {
                    archive: 'dist/source.min.js.gz'
                },
                files: ['dist/source.min.js']
            }
        },

        // Unit testing is provided by Karma.  Change the two commented locations
        // below to either: mocha, jasmine, or qunit.
        karma: {
            options: {
                basePath: process.cwd(),
                singleRun: true,
                captureTimeout: 7000,
                autoWatch: true,
                logLevel: 'ERROR',

                reporters: ['progress', 'coverage'],
                browsers: ['PhantomJS'],

                // Change this to the framework you want to use.
                frameworks: ['mocha'],

                plugins: [
                    'karma-mocha',
                    'karma-phantomjs-launcher',
                    'karma-coverage'
                ],

                preprocessors: {
                    'app/**/*.js': 'coverage'
                },

                coverageReporter: {
                    type: 'lcov',
                    dir: 'test/coverage'
                },

                files: [
                    // You can optionally remove this or swap out for a different expect.
                    'vendor/bower/chai/chai.js',
                    'vendor/bower/requirejs/require.js',
                    'test/runner.js',

                    { pattern: 'app/**/*.js', included: false },
                    // Derives test framework from Karma configuration.
                    {
                        pattern: 'test/<%= karma.options.frameworks[0] %>/**/*.spec.js',
                        included: false
                    },
                    { pattern: 'vendor/**/*.js', included: false }
                ]
            },

            // This creates a server that will automatically run your tests when you
            // save a file and display results in the terminal.
            daemon: {
                options: {
                    singleRun: false
                }
            },

            // This is useful for running the tests just once.
            run: {
                options: {
                    singleRun: true
                }
            }
        },

        coveralls: {
            options: {
                coverage_dir: 'test/coverage/PhantomJS 1.9.2 (Linux)/'
            }
        }
    });

    // Grunt contribution tasks.
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-recess');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-bower-task');

    // Third-party tasks.
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-karma-coveralls');
    grunt.loadNpmTasks('grunt-processhtml');

    // Grunt BBB tasks.
    grunt.loadNpmTasks('grunt-bbb-server');
    grunt.loadNpmTasks('grunt-bbb-styles');

    // Requirejs tasks.
    grunt.loadNpmTasks('grunt-contrib-requirejs');

    // When running the default Grunt command, just lint the code.
    grunt.registerTask('dist', [
        'clean',
        'jshint',
        'bower',
        'copy:dependencies',
        'requirejs',
        'copy:resources',
        'recess',
        'styles',
        'cssmin',
        'processhtml'
    ]);

    grunt.registerTask('default', ['dist']);

    grunt.registerTask('s', ['server:development']);

    grunt.registerTask('test', ['karma:run']);
};
