require 'bundler/setup'
Bundler.require
Bundler.require :development if development?

# This one-liner will interpolate your config.yml file with ERB to fill in environment variables
#CONFIG = YAML.load(ERB.new(File.read(File.join(File.dirname(__FILE__), "config.yml"))).result)

CONFIG = {
  geoloqi: {
    client_id: ENV["geoloqi_client_id"],
    client_secret: ENV["geoloqi_client_secret"],
    app_access_token: ENV["geoloqi_application_token"]
  },
  sqoot: {
    affiliate_token: ENV["sqoot_affiliate_token"]
  }
}

# Configure the Sqoot gem
Sqoot.configure do |config|
  config.affiliate_token = CONFIG[:sqoot][:affiliate_token]
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
Geoloqi.config :client_id => CONFIG[:geoloqi][:client_id], :client_secret => CONFIG[:geoloqi][:client_secret]

# Helper for quickly accessing a list of all layers made by the applications
def get_layers
  Geoloqi::Session.new(:access_token => CONFIG[:geoloqi][:app_access_token]).get('layer/list')[:layers]
end





# Remove this when the response attr is added back to the gem
# See https://github.com/geoloqi/geoloqi-ruby/pull/3
=begin
module Geoloqi
  class Session
    attr_reader :response

    def run(meth, path, query=nil, headers={})
      renew_access_token! if auth[:expires_at] && Time.rfc2822(auth[:expires_at]) <= Time.now && !(path =~ /^\/?oauth\/token$/)
      retry_attempt = 0

      begin
        response = execute meth, path, query, headers
        @response = response # Make the response object available to the caller
        hash = JSON.parse response.body, :symbolize_names => @config.symbolize_names

        if hash.is_a?(Hash) && hash[:error] && @config.throw_exceptions
          if @config.use_dynamic_exceptions && !hash[:error].nil? && !hash[:error].empty?
            exception_class_name = hash[:error].gsub(/\W+/, '_').split('_').collect {|w| w.capitalize}.join+'Error'
            Geoloqi.const_set exception_class_name, Class.new(Geoloqi::ApiError) unless Geoloqi.const_defined? exception_class_name
            raise_class = Geoloqi.const_get exception_class_name
          else
            raise_class = ApiError
          end
          raise raise_class.new(response.status, hash[:error], hash[:error_description])
        end
      rescue Geoloqi::ApiError
        raise Error.new('Unable to procure fresh access token from API on second attempt') if retry_attempt > 0
        if hash[:error] == 'expired_token' && !(hash[:error_description] =~ /The auth code expired/)
          renew_access_token!
          retry_attempt += 1
          retry
        else
          fail
        end
      rescue JSON::ParserError
        raise Geoloqi::Error, "API returned invalid JSON. Status: #{response.status} Body: #{response.body}"
      end
      @config.use_hashie_mash ? Hashie::Mash.new(hash) : hash
    end

  end
end
=end