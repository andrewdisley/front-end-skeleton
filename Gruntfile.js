'use strict';
var path = require('path');
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;

var folderMount = function folderMount(connect, point) {
  return connect.static(path.resolve(point));
};

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      options: {
        separator: ';'
      },
      plugins: {
        src: [ /*'<%= pkg.path_assets %>/js/plugins/includefirst.js',*/ '<%= pkg.path_assets %>js/plugins/*.js' ],
        dest: '<%= pkg.path_assets %>js/<%= pkg.shortname %>.plugins.js'
      },
      main: {
        src: [ '<%= pkg.path_assets %>js/main.js' ],
        dest: '<%= pkg.path_assets %>js/<%= pkg.shortname %>.js'
      },
      deploy: {
        src: [ '<%= pkg.path_assets %>js/<%= pkg.shortname %>.plugins.js', '<%= pkg.path_assets %>js/<%= pkg.shortname %>.js' ],
        dest: '<%= pkg.path_assets %>js/<%= pkg.shortname %>.js'
      },
    },

    less: {
      dev: {
        options: {
          compress: false,
          yuicompress: false
        },
        files: {
          '<%= pkg.path_assets %>css/<%= pkg.shortname %>.css': '<%= pkg.path_assets %>css/less/main.less'
        }
      },
      prd: {
        options: {
          compress: true,
          yuicompress: true
        },
        files: {
          '<%= pkg.path_assets %>css/<%= pkg.shortname %>.css': '<%= pkg.path_assets %>css/less/main.less'
        }
      }
    },

    copy: {
      css_livereload: {
        files: [
          {
            src: ['<%= pkg.path_assets %>css/<%= pkg.shortname %>.css'],
            dest: '_site/<%= pkg.path_assets %>css/<%= pkg.shortname %>.css'
          }
        ]
      }
    },

    jekyll: {
      server : {
        src : './',
        dest: '_site',
        server : true,
        server_port : 8080,
        auto : true
      },
      dev: {
        src: './',
        dest: '_site',
      },
      prd: {
        src: './',
        dest: '_deploy'
      }
    },

    clean: {
      pre_dev: ['_site'],
      post_dev: [
        '_site/<%= pkg.path_assets %>css/less',
        '_site/<%= pkg.path_assets %>js/main.js',
        '_site/<%= pkg.path_assets %>js/plugins'
      ],
      pre_prd: ['_deploy'],
      post_prd: [
        '_deploy/<%= pkg.path_assets %>css/less',
        '_deploy/<%= pkg.path_assets %>js/main.js',
        '_deploy/<%= pkg.path_assets %>js/plugins',
        '_deploy/<%= pkg.path_assets %>js/libs/jquery-1.9.1.js',
        '_deploy/<%= pkg.path_assets %>js/libs/modernizr-latest.js',
        '_deploy/<%= pkg.path_assets %>js/libs/zepto.js'
      ]
    },

    regarde: {
      css: {
        files: [
          '<%= pkg.path_assets %>css/**/*.less',
        ],
        tasks: ['less:dev', 'copy:css_livereload', 'livereload'],
        options: {
          interrupt: true
        }
      },
      jekyll: {
        files: [
          '_config.yml',
          '*.html',
          '**/*.html',
          '!_site/*.html',
          '!_site/**/*.html',
          '<%= pkg.path_assets %>js/plugins/*.js',
          '<%= pkg.path_assets %>js/main.js',
          '<%= pkg.path_assets %>img/*.*',
          '!_site/img/*.*',
          'Gruntfile.js'
        ],
        tasks: ['dev_build', 'livereload'],
        options: {
          interrupt: true
        }
      }
    },

    connect: {
      server: {
        options: {
          hostname: null,
          port: 8080,
          base: '_site',
          middleware: function(connect, options) {
            return [lrSnippet, folderMount(connect, options.base)]
          }
        }
      }
    },

    shell: {
      staging: {
        command: 'rsync -rtzhv _deploy/ vpsX:/home/andrewdisley/sites/domain/public/'
      },
      assets: {
        command: [
          'cp -f _deploy/js/<%= pkg.shortname %>.js ../Dev/public/js/<%= pkg.shortname %>.js',
          'cp -f _deploy/css/<%= pkg.shortname %>.css ../Dev/public/css/<%= pkg.shortname %>.css'
        ].join('&&')
      }
    },

    compress: {
      prd: {
        options: {
          archive: '_deploy.zip'
        },
        files: [
          {expand: true, cwd: '_deploy/', src: ['**'] }
        ]
      }
    },

  });

  // Plugins
  grunt.loadNpmTasks('grunt-regarde');
  grunt.loadNpmTasks('grunt-jekyll');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-livereload');
  grunt.loadNpmTasks('grunt-shell');

  // Tasks
  grunt.registerTask('default', ['clean:pre_prd', 'less:prd', 'concat:plugins', 'concat:main', 'jekyll:prd', 'clean:post_prd']);
  grunt.registerTask('staging', ['clean:pre_prd', 'less:prd', 'concat', 'jekyll:prd', 'clean:post_prd', 'shell:staging']);
  grunt.registerTask('deploy', ['clean:pre_prd', 'less:prd', 'concat', 'jekyll:prd', 'clean:post_prd', 'compress:prd']);
  grunt.registerTask('dev_build', ['clean:pre_dev', 'less:dev', 'concat:plugins', 'concat:main', 'jekyll:dev', 'clean:post_dev']);
  grunt.registerTask('dev', ['livereload-start', 'dev_build', 'connect', 'regarde']);
  grunt.registerTask('assets', ['clean:pre_prd', 'less:prd', 'concat', 'jekyll:prd', 'clean:post_prd', 'shell:assets']);

};