module.exports = function(grunt) {

    'use strict';

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        // global variables
        globalConfig: {
            src: 'sources/',
            dest: '_dist/'
        },

        // js compression and concatenation
        uglify : {
            options : {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
                // compress: {
                //     sequences: true, // join consecutive statemets with the “comma operator”
                //     properties: true, // optimize property access: a["foo"] → a.foo
                //     dead_code: true, // discard unreachable code
                //     conditionals: true, // optimize if-s and conditional expressions
                //     booleans: true, // optimize boolean expressions
                //     loops: true, // optimize loops
                //     unused: true, // drop unused variables/functions
                //     if_return: true, // optimize if-s followed by return/continue
                //     join_vars: true // join var declarations
                // },
                mangle: false,
                beautify: true
            },

            dist : {
                files : {
                    '<%= globalConfig.dest %>js/main.js':[
                        '<%= globalConfig.src %>scripts/framework/**/*.js',
                        '<%= globalConfig.src %>scripts/application/**/*.js',
                        '<%= globalConfig.src %>scripts/main.js'
                    ]
                }
            },

            plugins: {
                dest: '<%= globalConfig.dest %>js/lib/plugins.js',
                src: [
                    '<%= globalConfig.src %>scripts/plugins/fpsmeter.js',
                    '<%= globalConfig.src %>scripts/plugins/pixi.js',
                    '<%= globalConfig.src %>scripts/plugins/class.js',
                    '<%= globalConfig.src %>scripts/plugins/easegame/**/*.js'
                ]
            }
        },

        jshint: {
            all: [
                    '<%= globalConfig.src %>scripts/framework/**/*.js',
                    '<%= globalConfig.src %>scripts/application/**/*.js',
                    '<%= globalConfig.src %>scripts/main.js'
            ],
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            }
        },

        // image compression
        // imagemin: {
        //     options: {
        //         cache: false
        //     },

        //     dynamic: {
        //         files: [{
        //             expand: true,
        //             cwd: '<%= globalConfig.src %>/img/',
        //             src: ['**/*.{png,jpg,gif}'],
        //             dest: '<%= globalConfig.dest %>/img/'
        //         }]
        //     }
        // },
        plugins: {
            js2: {
                tasks: ['uglify:plugins']
            }
        }, // watch

        watch: {
            js: {
                files: ['<%= jshint.all %>'],
                tasks: ['jshint','uglify:dist']
            }
        } // watch
    });

    // load plugins
    require('load-grunt-tasks')(grunt);

    // tasks
    grunt.registerTask('js', [ 'jshint', 'uglify' ]);
    grunt.registerTask('js2', ['uglify' ]);
    grunt.registerTask('w', ['watch']);
};
