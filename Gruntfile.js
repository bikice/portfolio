module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify-es');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-includes');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-replace');
  grunt.loadNpmTasks('grunt-processhtml');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-terser');

  var target = grunt.cli.tasks || 'develop';

  grunt.log.subhead('Task Start');
  grunt.log.writeln('Task:' + grunt.cli.tasks);
  grunt.log.writeln('Usage: grunt deploy or grunt develop');

  grunt.initConfig({
    buildpath: target,
    tmpFolder: 'build',
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      tmp: ['<%= tmpFolder %>/'],
      develop: ['develop'],
      deploy: ['deploy']
    },

    includes: {
      html: {
        options: {
          wrapper: 'src/html/parts/wrapper.html',
          includePath: 'src/html/parts',
          flatten: true
        },
        files: [{ expand: true, cwd: 'src/html/sites', src: '**/*.html', dest: '<%= tmpFolder %>/html/original' }]
      }
    },

    replace: {
      home: {
        options: {
          patterns: [
            { match: /<\s*body[^>]*>/g, replacement: '<body class="bg-img">'},
            { match: /\b(\w*Kristof Kamin Webdesign\w*)\b/g, replacement: 'Welcome - Kristof Kamin Webdesign'},
            { match: /\b(\w*nav-item home\w*)\b/g, replacement: 'nav-item current'}
          ]
        },
        files: [
          { expand: true, cwd: '<%= tmpFolder %>/html/original', src: 'home.html', dest: '<%= tmpFolder %>/html/original' }
        ]
      },
      about: {
        options: {
          patterns: [
            { match: /\b(\w*Kristof Kamin Webdesign\w*)\b/g, replacement: 'About Me - Kristof Kamin Webdesign' },
            { match: /\b(\w*nav-item about\w*)\b/g, replacement: 'nav-item current'}
          ]
        },
        files: [{ expand: true, cwd: '<%= tmpFolder %>/html/original', src: 'about.html', dest: '<%= tmpFolder %>/html/original' }]
      },
      work: {
        options: {
          patterns: [
            { match: /\b(\w*Kristof Kamin Webdesign\w*)\b/g, replacement: 'My Work - Kristof Kamin Webdesign' },
            { match: /\b(\w*nav-item work\w*)\b/g, replacement: 'nav-item current'}
          ]
        },
        files: [{ expand: true, cwd: '<%= tmpFolder %>/html/original', src: 'work.html', dest: '<%= tmpFolder %>/html/original' }]
      },
      contact: {
        options: {
          patterns: [
            { match: /\b(\w*Kristof Kamin Webdesign\w*)\b/g, replacement: 'Contact me - Kristof Kamin Webdesign' },
            { match: /\b(\w*nav-item contact\w*)\b/g, replacement: 'nav-item current'}
          ]
        },
        files: [{ expand: true, cwd: '<%= tmpFolder %>/html/original', src: 'contact.html', dest: '<%= tmpFolder %>/html/original' }]
      },
      imprint: {
        options: {
          patterns: [
            { match: /\b(\w*Kristof Kamin Webdesign\w*)\b/g, replacement: 'Imprint - Kristof Kamin Webdesign' }
          ]
        },
        files: [{ expand: true, cwd: '<%= tmpFolder %>/html/original', src: 'imprint.html', dest: '<%= tmpFolder %>/html/original' }]
      },
      dataProtection: {
        options: {
          patterns: [
            { match: /\b(\w*Kristof Kamin Webdesign\w*)\b/g, replacement: 'Data Protection - Kristof Kamin Webdesign' }
          ]
        },
        files: [{ expand: true, cwd: '<%= tmpFolder %>/html/original', src: 'data-protection.html', dest: '<%= tmpFolder %>/html/original' }]
      }
    },

    processhtml: {
      minify: {
        files: [{ expand: true, cwd: '<%= tmpFolder %>/html/original', src: ['**/*.html'], dest: '<%= tmpFolder %>/html/processed' }]
      },
      develop: {
        files: [{ expand: true, cwd: '<%= tmpFolder %>/html/original', src: ['**/*.html'], dest: '<%= tmpFolder %>/html/processed' }]
      }
    },

    htmlmin: {
      minify: {
        options: {
          removeComments: true,
          collapseWhitespace: true,
          html5: true
        },
        files: [{ expand: true, cwd: '<%= tmpFolder %>/html/processed', src: ['**/*.html'], dest: '<%= tmpFolder %>/html/minified' }]
      },
      develop: {
        files: [{ expand: true, cwd: '<%= tmpFolder %>/html/processed', src: ['**/*.html'], dest: '<%= tmpFolder %>/html/minified' }]
      }
    },

    sass: {
      dist: {
        options: {
          style: 'expanded',
          loadPath: ['node_modules/bootstrap/scss','<%= tmpFolder %>/scss']
        },
        files: [{ expand: true, cwd: 'src/css', src: ['**/*.scss'], dest: '<%= tmpFolder %>/css/compiled', ext: '.css' }]
      },
    },

    autoprefixer: {
      options: {
        browsers: [
          'last 2 versions',
          'ie >= 9',
          'Android >= 2.3',
          'ChromeAndroid > 20',
          'FirefoxAndroid > 20',
          'iOS >= 8'
        ]
      },
      multiple_files: {
        expand: true,
        flatten: true,
        src: '<%= tmpFolder %>/css/compiled/*.css',
        dest: '<%= tmpFolder %>/css/prefixed/'
      },
    },

    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1,
        sourceMap: true
      },
      combine: {
        files: { '<%= tmpFolder %>/css/<%= pkg.name %>.min.css': ['<%= tmpFolder %>/css/prefixed/*.css'] }
      }
    },

    concat: {
      options: {
        separator: ';'
      },
      minify: {
        src: ['<%= tmpFolder %>/js/*.js'],
        dest: '<%= tmpFolder %>/js/<%= pkg.name %>.js'
      }
    },

    uglify: {
      minify: {
        options: {
          mangle: {
            toplevel: true,
            properties: {
              reserved: [
                'getElementsByClassName', 'on', 'documentElement',
                'clientHeight', 'innerHeight', 'innerWidth',
                'getBoundingClientRect', 'querySelector', 'querySelectorAll',
                'top', 'right', 'bottom', 'left', 'height', 'width',
                'classList', 'add', 'remove', 'scrollTop', 'addEventListener'
              ]
            }
          },
          banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
        },
        files: { '<%= tmpFolder %>/js/<%= pkg.name %>.min.js': ['<%= tmpFolder %>/js/<%= pkg.name %>.js'] }
      }
    },

    terser: {
      options: {},
      minify: { '<%= tmpFolder %>/js/<%= pkg.name %>.min.js': ['<%= tmpFolder %>/js/<%= pkg.name %>.js'] },
    },

    copy: {
      tmp: {
        files: [
          { expand: true, cwd: 'src/css', src: '**/*.scss', dest: '<%= tmpFolder %>/scss' },
          { expand: true, cwd: 'src/js', src: '**/*.js', dest: '<%= tmpFolder %>/js' },
          { expand: true, cwd: 'src/images', src: '**/*.{png,jpg,svg}', dest: '<%= tmpFolder %>/images' },
          { expand: true, cwd: 'src', src: '.htaccess', dest: '<%= tmpFolder %>/' }
        ]
      },
      develop: {
        files: [
          { expand: true, cwd: '<%= tmpFolder %>/html/processed', src: '**.html', dest: '<%= buildpath %>/' },
          { expand: true, cwd: '<%= tmpFolder %>/css/prefixed', src: '**/*.css', dest: '<%= buildpath %>/css' },
          { expand: true, cwd: '<%= tmpFolder %>/js', src: '**/*.js', dest: '<%= buildpath %>/js' },
          { expand: true, cwd: '<%= tmpFolder %>/images', src: '**/*', dest: '<%= buildpath %>/images' },
          { expand: true, cwd: 'node_modules/jquery/dist', src: 'jquery.js', dest: '<%= buildpath %>/js' },
          { expand: true, cwd: 'node_modules/bootstrap/dist/css', src: 'bootstrap.css', dest: '<%= buildpath %>/css' },
          { expand: true, cwd: 'node_modules/bootstrap/dist/js', src: 'bootstrap.js', dest: '<%= buildpath %>/js' },
          { expand: true, cwd: 'node_modules/popper.js/dist/umd', src: 'popper.js', dest: '<%= buildpath %>/js' },
          { expand: true, cwd: 'node_modules/tooltip.js/dist/umd', src: 'tooltip.js', dest: '<%= buildpath %>/js' },
          { expand: true, cwd: 'node_modules/@fortawesome/fontawesome-free', src: '**/*', dest: '<%= buildpath %>/fonts/fontawesome' },
          { expand: true, cwd: 'node_modules/typed.js/lib', src: 'typed.js', dest: '<%= buildpath %>/js' }
        ]
      },
      deploy: {
        files: [
          { expand: true, cwd: '<%= tmpFolder %>/html/minified', src: '**.html', dest: '<%= buildpath %>/' },
          { expand: true, cwd: '<%= tmpFolder %>/', src: 'css/<%= pkg.name %>.min.css', dest: '<%= buildpath %>/' },
          { expand: true, cwd: '<%= tmpFolder %>/', src: 'js/<%= pkg.name %>.min.js', dest: '<%= buildpath %>/' },
          { expand: true, cwd: 'node_modules/jquery/dist', src: 'jquery.min.js', dest: '<%= buildpath %>/js' },
          { expand: true, cwd: '<%= tmpFolder %>/images', src: '**/*', dest: '<%= buildpath %>/images' },
          { expand: true, cwd: 'node_modules/bootstrap/dist/css', src: 'bootstrap.min.css', dest: '<%= buildpath %>/css' },
          { expand: true, cwd: 'node_modules/bootstrap/dist/js', src: 'bootstrap.min.js', dest: '<%= buildpath %>/js' },
          { expand: true, cwd: 'node_modules/popper.js/dist/umd', src: 'popper.min.js', dest: '<%= buildpath %>/js' },
          { expand: true, cwd: 'node_modules/tooltip.js/dist/umd', src: 'tooltip.min.js', dest: '<%= buildpath %>/js' },
          { expand: true, cwd: 'node_modules/@fortawesome/fontawesome-free', src: '**/*', dest: '<%= buildpath %>/fonts/fontawesome' },
          { expand: true, cwd: 'node_modules/typed.js/lib', src: 'typed.min.js', dest: '<%= buildpath %>/js' },
          { expand: true, cwd: '<%= tmpFolder %>/', src: '.htaccess', dest: '<%= buildpath %>/' }
        ]
      }
    },

    eslint: { target: ['build/js/*.js'] }
  });

  grunt.registerTask('develop', ['clean:tmp', 'clean:develop', 'copy:tmp', 'includes', 'replace', 'eslint', 'processhtml:develop', 'htmlmin:develop', 'sass', 'autoprefixer', 'copy:develop']);
  grunt.registerTask('deploy', ['clean:tmp', 'clean:deploy', 'copy:tmp', 'includes', 'replace', 'eslint', 'processhtml:minify', 'htmlmin:minify', 'sass', 'autoprefixer', 'cssmin', 'concat', 'uglify', 'copy:deploy']);

};
