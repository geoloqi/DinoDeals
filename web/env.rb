require 'bundler/setup'
Bundler.require
Bundler.require :development if development?

# This one-liner will interpolate your config.yml file with ERB to fill in environment variables
CONFIG = YAML.load(ERB.new(File.read(File.join(File.dirname(__FILE__), 'config.yml'))))

# Configure the Sqoot gem
Sqoot.configure do |config|
  config.affiliate_token = CONFIG['sqoot']['affiliate_token']
  config.authentication_token = 'foo'
end

# Create a hash of categories we want to use on the Sqoot API https://www.sqoot.com/docs/categories
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

# Constant for how far around each user to search for deals when the import is run
DEAL_SEARCH_RADIUS = 10000

# Constant for how large to make the trigger zone for each deal
DEAL_PLACE_RADIUS =  800

# Configure Geoloqi gem
Geoloqi.config :client_id => CONFIG['geoloqi']['client_id'], :client_secret => CONFIG['geoloqi']['client_secret']

# Helper for quickly accessing a list of all layers made by the applications
def get_layers
  Geoloqi::Session.new(:access_token => CONFIG['geoloqi']['app_access_token']).get('layer/list')[:layers]
end
