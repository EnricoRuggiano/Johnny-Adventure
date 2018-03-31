module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        connect: {
            server: {
                options: {
                    //hostname: "192.168.1.73",
                    port: 6969,
                    index: 'index.html',
                    keepalive: true
                }
            }
        }
    });

    // Load the grunt-web-server
    grunt.loadNpmTasks('grunt-contrib-connect');

    // Default task(s).
    grunt.registerTask('default', ['connect']);

};