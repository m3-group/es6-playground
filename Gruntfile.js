(function(module){
  'use strict';

  var extend = require('node.extend'),
      BASE_PORT = 8089,
      TEST_PORT = 8090;

  module.exports = function(grunt) {

    var base_server = {
      options: {
        base: './<%= meta.buildDir %>',
        hostname: '127.0.0.1',
        port: BASE_PORT,
        keepalive: true,
        middleware: function(connect, options) {
          return [
            // Serve static files.
            connect.static(String(options.base) /* Fixes bug: https://github.com/gruntjs/grunt-contrib-connect/issues/41 */),

            // Make empty directories browsable.
            connect.directory(options.base)
          ];
        }
      }
    };

    // Dupe server config for testing on diff port (able to keep grunt server running and test)
    var test_server = extend(true, {}, base_server);
    test_server.options.base = '.';
    test_server.options.keepalive = false;
    test_server.options.port = TEST_PORT;

    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      meta: {
        sourceDir: 'src',
        jsDir: 'js',
        testDir: 'test',
        buildDir: 'build'
      },
      connect: {
        server: base_server,
        test: test_server
      },
      copy: {
        index: {
          src: '<%= meta.sourceDir %>/index.html',
          dest: '<%= meta.buildDir %>/index.html',
        },
      },
      traceur: {
        options: {
        },
        build: {
          files: {
            '<%= meta.buildDir %>/<%= meta.jsDir %>/<%= pkg.name %>.js': ['<%= meta.sourceDir %>/<%= meta.jsDir %>/**/*.js'],
          }
        }
      },
      qunit: {
        files: ['<%= meta.testDir %>/**/*.html']
      },
      jshint: {
        files: ['Gruntfile.js', '<%= meta.sourceDir %>/<%= meta.jsDir %>/**/*.js', '<%= meta.testDir %>/**/*.js'],
        options: {
          esnext: true, /* Important for ES6 Harmony not to throw errors */
          globals: {
            jQuery: true,
            console: true,
            module: true,
            document: true
          }
        }
      },
      watch: {
        files: ['<%= jshint.files %>'],
        tasks: ['build']
      }
    });

    // A basic server for testing the app - this server only runs while grunt is running. Use keepalive: true for use as a development server
    // https://github.com/gruntjs/grunt-contrib-connect
    grunt.loadNpmTasks('grunt-contrib-connect');

    // https://github.com/gruntjs/grunt-contrib-copy
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-traceur');
    // ////////////////////// //
    // END GRUNT TASK LOADING //
    // ////////////////////// //

    grunt.registerTask('default', ['build']);
    grunt.registerTask('dev', ['watch']);
    grunt.registerTask('build', ['jshint', 'copy', 'traceur']);

    grunt.registerTask('test', ['jshint', 'connect:test', 'qunit']);

    // Spawn a basic HTTP server but keep it alive.
    grunt.registerTask('serve', ['connect:server']);

  };
}(module));