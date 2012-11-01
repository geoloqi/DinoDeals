# Require the environment file
require './env.rb'

# Before each route is run create a new geoloqi session for the user.
before do
  http_auth = request.env['HTTP_AUTHORIZATION'] || params[:lq_access_token]
  @geoloqi = Geoloqi::Session.new :access_token => (http_auth ? http_auth.gsub('Bearer ', '') : nil)
end

# Home page
get '/' do
  erb :index
end

# The Titanium App will request this to get a list of categories the user is subscribed to
get '/api/categories' do
  
  # Get a list of all the layers created by the application
  layers = Geoloqi::Session.new(:access_token => CONFIG[:geoloqi][:app_access_token]).get('layer/list')[:layers]
  
  # Get a list of all the layers the user is  subscribed to
  subscribed = @geoloqi.get('layer/subscriptions')
  
  # Start building a response
  resp = { :categories => [] }
  
  # For each layer add a entry to the response with layer id, layer name, and subscription status
  layers.each do |l|
    resp[:categories].push({
      :id => l[:layer_id],
      :name => l[:name],
      :subscribed => !subscribed.select {|s| s[:layer_id] == l[:layer_id]}.empty?
    })
  end
  
  # Respond with JSON
  content_type :json
  resp.to_json
end