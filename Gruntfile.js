module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      sourceDir: 'src',
      testDir: 'test',
      buildDir: 'build'
    },
    traceur: {
      options: {
      },
      build: {
        files: {
          '<%= meta.buildDir %>/<%= pkg.name %>.js': ['<%= meta.sourceDir %>/**/*.js'],
        }
      }
    },
    qunit: {
      files: ['<%= meta.testDir %>/**/*.html']
    },
    jshint: {
      files: ['Gruntfile.js', '<%= meta.sourceDir %>/**/*.js', '<%= meta.testDir %>/**/*.js'],
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

  grunt.loadNpmTasks('grunt-traceur');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['build']);
  grunt.registerTask('dev', ['watch']);
  grunt.registerTask('test', ['jshint', 'qunit']);
  grunt.registerTask('build', ['jshint', 'qunit', 'traceur']);

};