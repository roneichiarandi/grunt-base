module.exports = function( grunt ) {

// Load all tasks
require('load-grunt-tasks')(grunt);

// Paths
var PathConfig = {
  dev: 'dev/',
  build: 'assets/',
};

// Set the scripts
var scripts = [
  '<%= config.dev %>**/js/**.js'
];

// Grunt config
grunt.initConfig({

  // Config path
  config: PathConfig,

  // Create folder of build
  mkdir: {
    all: {
      options: {
        mode: 0777,
        create: ['<%= config.build %>', '<%= config.dev %>js', '<%= config.dev %>styl', '<%= config.dev %>media']
      },
    },
  },

  // Clean files after build
  clean: {
    dist: {
      src: [
           '<%= config.build %>css/*',
           '<%= config.build %>js/*'
      ]
    },
    image: {
      src: [ '<%= config.build %>media/*' ]
    }
  },

  // Less
  // less: {
  //   dev: {
  //    options: {
  //     paths: ["<%= config.dev %>**/less"]
  //    },
  //     files: {
  //       '<%= config.build %>css/style.css': '<%= config.dev %>**/less/style.less'
  //     }
  //   },
  //   min: {
  //    options: {
  //      paths: ["<%= config.dev %>**/less"],
  //      yuicompress: true,
  //      compress: true
  //    },
  //     files: {
  //       '<%= config.build %>css/style.min.css': '<%= config.dev %>**/less/style.less'
  //     }
  //   }
  // },

  // Stylus
  stylus: {
    dev: {
      options: {
        banner: '/* Author: Ronei Chiarandi, http://roneichiarandi.com.br, <%= grunt.template.today("yyyy") %> */\n', //coment first line css
        paths: ['<%= config.dev %>styl'],
        compress: false,
        urlfunc: 'embedurl' // use embedurl('test.png') in our code to trigger Data URI embedding 
      },
      files: {
        '<%= config.build %>style.css': ['<%= config.dev %>**/styl/style.styl'] // compile and concat into single file 
      }
    },
    min: {
      compile: {
        options: {
          banner: '/* Author: Ronei Chiarandi, http://roneichiarandi.com.br, <%= grunt.template.today("yyyy") %> */\n', //coment first line css
          compress: true,
          paths: ['<%= config.dev %>**/styl'],
          urlfunc: 'embedurl' // use embedurl('test.png') in our code to trigger Data URI embedding 
        },
        files: {
          // '<%= config.build %>style.css': ['<%= config.dev %>**/styl/style.styl'] // compile and concat into single file 
          src: [ '<%= config.dev %>**/styl/style.styl' ],
          dest: '<%= config.build %>style.css',
          ext: '.css'
        }
      }
    }
  },

  // Uglify
  uglify: {
    dev: {
      options: {
        beautify : true
      },
      files : {
        '<%= config.build %>js/scripts.js': scripts
      }
    },
    min: {
      option: {
        mangle : false
      },
      files : {
        '<%= config.build %>js/scripts.min.js' : scripts
      }
    }
  },

  // JShint
  jshint: {
    files: [
      '<%= config.dev %>js/**/*.js',
      'Gruntfile.js'
    ]
  },

  // Imagemin
  imagemin: {
    min: {
      options: {
        optimizationLevel: 3
      },
      files: [{
        expand: true,
        cwd: '<%= config.dev %>media/',
        src: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif'],
        dest: '<%= config.build %>media/'
      }],
    }
  },

  // Watch
  watch : {
    options: {
      debounceDelay: 500,
    },
    // less: {
    //   files : [
    //   '<%= config.dev %>**/*.less'
    //   ],
    //   tasks : ['less:dev']
    // },
    stylus: {
      files : [
      '<%= config.dev %>**/*.styl'
      ],
      tasks : ['stylus:dev']
    },
    js: {
      files : [
      '<%= config.dev %>**/js/*.js',
      'Gruntfile.js'
      ],
      tasks : ['uglify:dev']
    },
    images: {
      files : [
        '<%= config.dev %>**/*.{png,jpg,jpeg,gif}',
      ],
      tasks : ['imagemin']
    }
  }
});
// Build
grunt.registerTask( 'default', ['mkdir:all'] );
grunt.registerTask( 'js-test', ['jshint'] );
grunt.registerTask( 'build', [ 'clean', 'stylus:dev', 'uglify:dev', 'imagemin' ] );
grunt.registerTask( 'build-min', [ 'clean', 'stylus:min', 'uglify:min', 'imagemin' ] );
grunt.registerTask( 'images', [ 'clean:image', 'imagemin'] );

// Watch
grunt.registerTask( 'w', ['watch'] );

};
