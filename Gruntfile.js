module.exports = function(grunt) {

    grunt.initConfig({
        uglify: {
            my_target: {
              files: {
                'src/js/jquery.amaran.min.js': 
                ['src/js/jquery.amaran.js'] 
              }
            }
        },
        cssmin: {
		  combine: {
		    files: {
		      'src/css/jquery.amaran.min.css': ['src/css/jquery.amaran.css'],
              'src/css/theme/all-themes.css': ['src/css/theme/default.css','src/css/theme/inset-white.css','src/css/theme/metro.css','src/css/theme/user.css','src/css/theme/white.css']
		    }
		  }
		}
    });
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.registerTask('build', ['uglify','cssmin']);
}