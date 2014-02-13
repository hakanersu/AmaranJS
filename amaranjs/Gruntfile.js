module.exports = function(grunt) {
    grunt.initConfig({
        uglify: {
            my_target: {
              files: {
                'assets/js/main.min.js': 
                ['assets/js/main.js'] 
              }
            }
        },
        cssmin: {
		  combine: {
		    files: {
		      'assets/css/main.min.css': ['assets/css/main.css']
		    }
		  }
		},
    less: {
      development: {
        options: {
          paths: ["assets/css"]
        },
        files: {
          "assets/css/main.css": "assets/css/main.less"
        }
      }
    },
    watch: {
        src: {
          files: ['assets/css/main.less', 'assets/js/main.js'], 
          tasks: ['build'],
        },
      }
    });
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('build', ['uglify','cssmin','less']);
    
}