require 'bundler/setup'
Bundler.require
Bundler.require :development if development?

configure do

  set :geoloqi_client_id,     CONFIG['geoloqi']['client_id']
  set :geoloqi_client_secret, CONFIG['geoloqi']['client_secret']

end

get '/' do
  'hello'
end
