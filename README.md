# Front-end Skeleton
A Grunt, Jekyll and Livereload powered starting point I use for front-end development.

## Install
Run `npm install` to download dependencies then use the Grunt Tasks mentioned below.

## Grunt Config
package.json is used to define the Grunt configuration:

**Shortname**: `fes` # Used to name JS and CSS  
**Assets Path**: `path_assets: /`

## Jekyll Config
_config.yml is used to define the Jekyll configuration:

**Shortname**: `shortname: fes` # Used to name JS and CSS  
**Assets Path**: `path_assets: /`  
**Mobile**: `mobile: true` # Used to name JS and CSS  
**Development**: `env: dev`  
**Staging**: `env: stg`  
**Production**: `env: prd`  
**Debug**: `debug: false|true` # Default is false

The env and debug settings are available in files processed by Jekyll using `site.env` and `site.debug`, this allows the targeting functionality at a specific environment.

Example using `site.env` to include development javascript in when `env: dev`:

	{% if site.env == 'dev' %}
		Do this in development
	{% else %}
		Do this in production
	{% endif %}

## Grunt Tasks

### `grunt`
Build using `_config.yml` destination `_deploy`.

### `rake deploy` (currently only works on Mac)
Build a **production release `_deploy.zip`** using `_config.yml` temporary destination `_deploy`. Scripts (`/js/shortname.plugins.js` and `/js/shortname.js`) are concatenated to `/js/shortname.js` this along with `/css/shortname.css`.

### `grunt dev`
Build using `_config.yml` destination `_site` and run server on [localhost:8080](http://localhost:8080/) with auto-regeneration.

## Acknowledgements
* Grunt http://gruntjs.com
* Jekyll http://jekyllrb.com/
* HTML5 Boilerplate http://html5boilerplate.com/
* jQuery http://jquery.com/
* Modernizr http://www.modernizr.com/
* Zepto.js http://zeptojs.com/
