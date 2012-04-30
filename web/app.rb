require File.join(File.dirname(__FILE__), 'env')

before do
  http_auth = request.env['HTTP_AUTHORIZATION'] || params[:lq_access_token]
  @geoloqi = Geoloqi::Session.new :access_token => (http_auth ? http_auth.gsub('Bearer ', '') : nil)
end

get '/' do
  'hello'
end

get '/api/categories' do
  layers = Geoloqi::Session.new(:access_token => CONFIG['geoloqi']['app_access_token']).get('layer/list')[:layers]
  subscribed = @geoloqi.get('layer/subscriptions')
  resp = { :categories => [] }
  layers.each do |l|
    resp[:categories].push({
      :id => l[:layer_id],
      :name => l[:name],
      :subscribed => !subscribed.select {|s| s[:layer_id] == l[:layer_id]}.empty?
    })
  end
  content_type :json
  resp.to_json
end
