require 'bundler/setup'
Bundler.require
Bundler.require :development if development?

CONFIG = YAML.load_file(File.join(File.dirname(__FILE__), 'config.yml'))

Sqoot.configure do |config|
  config.affiliate_token = CONFIG['sqoot']['affiliate_token']
end

CATEGORIES = {
  "Auto" =>             'automotive-services',
  "Bars + Clubs" =>     'bars-clubs',
  "Bowling" =>          'bowling',
  "Cleaning" =>         'home-services',
  "Concerts" =>         'concerts',
  "Dental" =>           'dental',
  "Massage" =>          'massage',
  "Men's Clothing" =>   'mens-clothing',
  "Museums" =>          'museums',
  "Outdoors" =>         'outdoor-adventures',
  "Photography" =>      'photography-services',
  "Restaurants" =>      'restaurants',
  "Sporting Events" =>  'sporting-events',
  "Theatre" =>          'theater',
  "Women's Clothing" => 'womens-clothing'
}

Geoloqi.config :client_id => CONFIG['geoloqi']['client_id'], :client_secret => CONFIG['geoloqi']['client_secret']

def get_layers
  Geoloqi::Session.new(:access_token => CONFIG['geoloqi']['app_access_token']).get('layer/list')[:layers]
end
