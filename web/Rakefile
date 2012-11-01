require File.join(File.dirname(__FILE__), 'env')

namespace :categories do
	desc "Create the initial categories to sort deals into"
	task :create do

		# Create a new geoloqi session as the application
		geoloqi = Geoloqi::Session.new :access_token => CONFIG[:geoloqi][:app_access_token]

		# For each category in our env.rb create a geoloqi layer to store deals for that category
		CATEGORIES.each do |k,v|
		  puts "\n\ncreating layer category for #{k}..."
		  puts geoloqi.post 'layer/create', {:name => k, :key => v, :public => 1}
		end

	end

	desc "Delete all categories to sort deals into"
	task :delete do

		# Create a new geoloqi session as the application
		geoloqi = Geoloqi::Session.new :access_token => CONFIG[:geoloqi][:app_access_token]

		geoloqi.get('layer/list')[:layers].each do |layer|
			puts "\n\ndeleting layer - #{layer[:name]}"
			puts geoloqi.post("layer/delete/#{layer[:layer_id]}")
		end

	end
end

namespace :deals do

	desc "Deactivate all deals by setting `date_to` to now"
	task :clean do

		# Create a new geoloqi session as the application
		geoloqi = Geoloqi::Session.new :access_token => CONFIG[:geoloqi][:app_access_token]

		geoloqi.get('layer/list')[:layers].each do |layer|
			puts "Processing layer #{layer[:layer_id]}: #{layer[:name]}"

			geoloqi.get('place/list', :layer_id => layer[:layer_id])[:places].each do |place|
				puts "\tPlace: #{place[:name]}"

				geoloqi.get('trigger/list', :place_id => place[:place_id])[:triggers].each do |trigger|
					puts "\t\tTrigger: #{trigger[:trigger_id]} #{trigger[:key]}"
					puts "\t\t\t#{trigger[:text]}"

					# puts geoloqi.post("trigger/delete/#{trigger[:trigger_id]}", {})
					puts geoloqi.post("trigger/update/#{trigger[:trigger_id]}", {
						date_to: DateTime.now.iso8601
					})
					puts "\n"
				end

				# puts geoloqi.post("place/delete/#{place[:place_id]}", {})

			end
		end

	end

	desc "Remove all existing deals from all categories"
	task :delete do

		# Create a new geoloqi session as the application
		geoloqi = Geoloqi::Session.new :access_token => CONFIG[:geoloqi][:app_access_token]

		geoloqi.get('layer/list')[:layers].each do |layer|
			puts "Processing layer #{layer[:layer_id]}: #{layer[:name]}"

			geoloqi.get('place/list', :layer_id => layer[:layer_id])[:places].each do |place|
				puts "\tPlace: #{place[:name]}"

				geoloqi.get('trigger/list', :place_id => place[:place_id])[:triggers].each do |trigger|
					puts "\t\tTrigger: #{trigger[:trigger_id]} #{trigger[:key]}"
					puts "\t\t\t#{trigger[:text]}"
					
					puts geoloqi.post("trigger/delete/#{trigger[:trigger_id]}", {})
					
					puts "\n"
				end

				puts geoloqi.post("place/delete/#{place[:place_id]}", {})

			end
		end

	end

	desc "Import deals from Sqoot"
	task :import do

		# Create a new geoloqi session as the application
		geoloqi = Geoloqi::Session.new :access_token => CONFIG[:geoloqi][:app_access_token]
		
		# Create a new Sqoot client
		sqoot = Sqoot::Client.new

		# Get all layers created by the application
		geoloqi.get('layer/list')[:layers].each do |layer|

			# Store location to search for deals nearby
		  layer_points = []

		  # Get information about the distribution of users subscribed to each layer
		  user_clusters_resp = geoloqi.get("layer/user_clusters/#{layer[:layer_id]}")
		  
		  # For each cluster of users add a point to search for deals nearby
		  user_clusters_resp[:clusters].each do |c|
		    layer_points.push({
		      :latitude => c[:bounds][:center][:latitude],   # 'latitude' & 'longitude'
		      :longitude => c[:bounds][:center][:longitude], # in the bounds object...
		      :radius => (c[:bounds][:radius] + (DEAL_SEARCH_RADIUS/2))
		    })
		  end

		  # For each single users add a point to search for deals nearby
		  user_clusters_resp[:singles].each do |s|
		    layer_points.push({
		      :latitude => s[:lat],  # ...but it's 'lat' & 'lng'in everything else 
		      :longitude => s[:lng],
		      :radius => DEAL_SEARCH_RADIUS
		    })
		  end

		  # Store deals in an array
		  sqoot_deals = []

		  # For each layer_points search for nearby deals
		  layer_points.each do |lp|
		    radius_in_miles = lp[:radius] / 1609.3

		    # Get nearby deals from Sqoot
		    begin
			    offers = sqoot.offers(:location => "#{lp[:latitude]},#{lp[:longitude]}",
			                          :radius => radius_in_miles,
			                          :national => false,
			                          :categories => CATEGORIES[layer[:name]],
			                          :order => 'distance',
			                          :per_page => 250)[:offers]
		    rescue Exception => e
	        # TODO error out nicer
	        STDERR.puts "=========="
	        STDERR.puts "ERROR FETCHING DEALS"
	        STDERR.puts e.message
	        STDERR.puts "=========="
	        next
		    end

		    if offers.size
			    offers.each do |offer|
			    
			      offer = offer[:offer]
			    	
			    	# For each deal create a trigger in Geoloqi on the appropriate layer.
			    	# You can deduplicate triggers by providing a `key` in the parmeters.
			    	# Provide a url to be opened when the push notification is opened.
			    	# In this case `dinodeals://` is defined by the DinoDeals app.
			      begin
			        text = (!offer[:short_title].nil? && offer[:short_title].length > 0) ? offer[:short_title] : offer[:title]
			        base_string = "You found a new deal"
			        end_string = offer[:locations][0][:name] ? " at #{offer[:locations][0][:name]}" : "" 
  						trigger_data = { :key => offer[:id],
			                         :type => 'message',
			                         :text => "#{base_string}#{end_string}".strip,
			                         :url => "dinodeals://open?url=#{Rack::Utils.escape(offer[:url])}",
			                         :latitude => offer[:locations][0][:latitude],
			                         :longitude => offer[:locations][0][:longitude],
			                         :radius => DEAL_PLACE_RADIUS,
			                         :date_to => offer[:expires_at],
			                         :one_time => 1,
			                         :place_key => Digest::SHA2.hexdigest(offer[:locations][0].to_json),
			                         :place_layer_id => layer[:layer_id],
			                         :place_name => offer[:locations][0][:name].strip,
			                         :extra => {
			                           :deal_text => text
			                         	}
			                        }
			        puts "\n\ncreating - #{text}"
			        trigger = geoloqi.post 'trigger/create', trigger_data
			        puts trigger

			        # If the trigger already existed with that key, then update it
			        if geoloqi.response.status == 409
			        	# Only send fields that existed in the trigger response, we don't need to send the place_* fields in the update request
			        	puts geoloqi.post "trigger/update/#{trigger[:trigger_id]}", trigger_data.reject {|key,value| !trigger[key]}
			        end

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
		  
		end
	end
end

task :default do
  puts "All available rake tasks"
  system('rake -T')
end