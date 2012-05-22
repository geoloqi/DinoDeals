# Install

1. `gem install heroku`
2. `heroku create dino-deals-server`
3. `bundle install`

# Setup Config Variables

3. `heroku config:add geoloqi_client_id=YOUR_GEOLOQI_CLIENT_ID`
4. `heroku config:add geoloqi_client_secret=YOUR_GEOLOQI_CLIENT_SECRET`
5. `heroku config:add geoloqi_application_token=YOUR_GEOLOQI_APPLICATION_ACCESS_TOKEN`
6. `heroku config:add sqoot_affiliate_token=YOUR_SQOOT_AFFILIATE_TOKEN`

Squoot is a paid service with a 30 day free trial. If you do not want to pay for Sqoot use Geoloqis affiliate token `3c5gx9`

# Setup cron to update deals nightly

6. `heroku addons:add cron:daily`

# Launch on Heroku

7. `git add .`
8. `git commit -am"Deploy DinoDeals Server"`