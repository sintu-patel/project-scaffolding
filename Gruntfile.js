module.exports = function(grunt) {
  grunt.loadNpmTasks("assemble");
  grunt.initConfig({
    assemble: {
      options: {
        partials: ['dev/partials/*.hbs'],
        layout: ['dev/pages/index.hbs'],
        data: ['data/*.json']
      },
      site: {
        src: ['dev/pages/*.hbs'],
        dest: 'build/'
      }
    }
  });
  return grunt.registerTask('grunt-assemble', ['assemble']);
};