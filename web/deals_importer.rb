require File.join(File.dirname(__FILE__), 'env')

geoloqi = Geoloqi::Session.new :access_token => CONFIG['geoloqi']['app_access_token']
