require 'bundler/setup'
Bundler.require
Bundler.require :development if development?

configure do

  CONFIG = YAML.load_file(File.join(File.dirname(__FILE__), 'config.yml'))

  Sqoot.configure do |config|
    config.affiliate_token = CONFIG['sqoot']['affiliate_token']
  end

end

get '/' do
  'hello'
end
