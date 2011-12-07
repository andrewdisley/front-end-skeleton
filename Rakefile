# Front-end Skeleton | http://github.com/andrewdisley/front-end-skeleton

task :default => :build

def win?
  Config::CONFIG['host_os'] =~ /mswin/
end

def mac?
  Config::CONFIG['host_os'] =~ /darwin/
end

def compress()
  if mac?
    sh 'cat _deploy/js/plugins.js _deploy/js/script.js > _deploy/js/fes.js'
    sh 'java -jar _toolkit/yuicompressor/yuicompressor-2.4.8pre.jar _deploy/js/fes.js -o _deploy/js/fes.js --charset utf-8'
    sh 'java -jar _toolkit/yuicompressor/yuicompressor-2.4.8pre.jar _deploy/css/style.css -o _deploy/css/fes.css --charset utf-8'
    sh 'rm _deploy/js/plugins.js'
    sh 'rm _deploy/js/script.js'
    sh 'rm _deploy/css/style.css'
  end
end

def jekyll(opts = '')
  if win?
    sh 'rmdir /s /q _site'
    sh 'mkdir _site'
  end
  if mac?
    sh 'rm -rf _site'
  end
  sh 'jekyll ' + opts
end

desc 'Jekyll build'
task :build do
  if win?
    sh 'copy _config_dev.yml _config.yml'
  end
  if mac?
   sh 'cp _config_dev.yml _config.yml'
   # sh RUBY_PLATFORM
  end
  jekyll
end

desc 'Jekyll Server and auto-regeneration on port 4000'
task :server do
  if win?
    sh 'copy _config_dev.yml _config.yml'
  end
  if mac?
    sh 'cp _config_dev.yml _config.yml'
  end
  jekyll('--server 4000 --auto')
end

desc 'Jekyll Server and auto-regeneration on port 5000'
task :server2 do
  if win?
    sh 'copy _config_dev.yml _config.yml'
  end
  if mac?
    sh 'cp _config_dev.yml _config.yml'
  end
  jekyll('--server 5000 --auto')
end

desc 'Build production ready version, compress CSS and JS, zip to _deploy.zip'
task :deploy do
  if mac?
    sh 'rm -rf _deploy'
    sh 'cp _config_prd.yml _config.yml'
    jekyll('_deploy')
    compress()
    sh 'rm -rf _deploy.zip'
    sh 'cd _deploy; zip -r ../_deploy.zip *'
    sh 'rm -rf _deploy'
  end
end
