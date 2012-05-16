require File.join(File.dirname(__FILE__), 'env')

geoloqi = Geoloqi::Session.new :access_token => CONFIG['geoloqi']['app_access_token']
sqoot = Sqoot::Client.new

geoloqi.get('layer/list')[:layers].each do |layer|

  layer_points = []

  user_clusters_resp = geoloqi.get("layer/user_clusters/#{layer[:layer_id]}")
  user_clusters_resp[:clusters].each do |c|
    layer_points.push({
      :latitude => c[:bounds][:center][:latitude],   # 'latitude' & 'longitude'
      :longitude => c[:bounds][:center][:longitude], # in the bounds object...
      :radius => (c[:bounds][:radius] + (DEAL_SEARCH_RADIUS/2))
    })
  end
  user_clusters_resp[:singles].each do |s|
    layer_points.push({
      :latitude => s[:lat],  # ...but it's 'lat' & 'lng'in everything else 
      :longitude => s[:lng],
      :radius => DEAL_SEARCH_RADIUS
    })
  end

  sqoot_deals = []

  layer_points.each do |lp|
    radius_in_miles = lp[:radius] / 1609.3
    offers = sqoot.offers(:location => "#{lp[:latitude]},#{lp[:longitude]}",
                          :radius => radius_in_miles,
                          :national => false,
                          :categories => CATEGORIES[layer[:name]],
                          :order => 'distance',
                          :per_page => 250)[:offers]
    offers.each do |offer|
      offer = offer[:offer]
      begin
        text = (!offer[:short_title].nil? && offer[:short_title].length > 0) ? offer[:short_title] : offer[:title]
        trigger_data = { :key => offer[:id],
                         :type => 'message',
                         :text => text,
                         :url => offer[:url],
                         :latitude => offer[:locations][0][:latitude],
                         :longitude => offer[:locations][0][:longitude],
                         :radius => DEAL_PLACE_RADIUS,
                         :place_key => offer[:id],
                         :place_layer_id => layer[:layer_id],
                         :place_name => offer[:locations][0][:name] }
        puts "\n\ncreating - #{text}"
        puts geoloqi.post 'trigger/create', trigger_data
      rescue Geoloqi::ApiError => gae
        # TODO error out nicer
        STDERR.puts "=========="
        STDERR.puts gae.message
        STDERR.puts trigger_data.inspect
        STDERR.puts offer
        STDERR.puts "=========="
        # binding.pry
      end
    end
  end
  
end

