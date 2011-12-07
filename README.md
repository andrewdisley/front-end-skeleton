# Front-end Skeleton
A Jekyll powered starting point I use for front-end development.

## Config and Environments
Multiple _config.yml files are used to define the Jekyll build environment:

**Development**: `env: dev`
**Production**: `env: prd`
**Debug**: `debug: false|true` # Default is false

The env and debug settings are available in files processed by Jekyll using `site.env` and `site.debug`, this allows the targeting functionality at a specific environment.

Example using `site.env` to include development javascript in when `env: dev`:

	{% if site.env == 'dev' %}
		<script src="/js/plugins.js"></script>
		<script src="/js/script.js"></script>
	{% else %}
		<script src="/js/fes.js"></script>
	{% endif %}

## Rake Tasks

### `rake build`
Build using `_config_dev.yml` destination `_site`.

### `rake deploy` (currently only works on Mac)
Build a **production release `_deploy.zip`** using `_config_prd.yml` temporary destination `_deploy`. Scripts (`/js/plugins.js` and `/js/script.js`) are concatenated to `/js/fes.js` this along with `/css/style.css` are minified using YUI Compressor (`/_toolkit/yuicompressor/yuicompressor-2.4.8pre.jar`).

### `rake server`
Build using `_config_dev.yml` destination `_site` and run server on [localhost:4000](http://localhost:4000/) with auto-regeneration.

### `rake server2`
Build using `_config_dev.yml` destination `_site` and run server on [localhost:4000](http://localhost:5000/) with auto-regeneration.

## Notes
`/css/_h5bp.css` is kept to do a diff against [HTML5 Boilerplate Styles](https://raw.github.com/h5bp/html5-boilerplate/master/css/style.css)
A [minimal build](http://www.modernizr.com/download/#-boxshadow-rgba-input-iepp-cssclasses-addtest-teststyles-testprop-testallprops-domprefixes-url_data_uri-load) of Modernizr is used.

## Acknowledgements
* Jekyll http://jekyllrb.com/
* HTML5 Boilerplate http://html5boilerplate.com/
* jQuery http://jquery.com/
* Modernizr http://www.modernizr.com/
* Zepto.js http://zeptojs.com/

## License
* jQuery: MIT/GPL license
* Modernizr: MIT/BSD license
* Normalize.css: Public Domain
* Zepto.js: MIT license
* Front-end Skeleton: Public Domain