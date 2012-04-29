require 'bundler/setup'
Bundler.require
Bundler.require :development if development?

configure do

  CONFIG = YAML.load_file(File.join(File.dirname(__FILE__), 'config.yml'))

  Sqoot.configure do |config|
    config.affiliate_token = CONFIG['sqoot']['affiliate_token']
  end

  set :geoloqi_client_id,     CONFIG['geoloqi']['client_id']
  set :geoloqi_client_secret, CONFIG['geoloqi']['client_secret']
end

get '/' do
  'hello'
end