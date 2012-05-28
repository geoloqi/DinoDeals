# Install

1. `gem install heroku`
2. `heroku create dino-deals-server`
3. `bundle install`

# Setup Config Variables

4. `heroku config:add geoloqi_client_id=YOUR_GEOLOQI_CLIENT_ID`
5. `heroku config:add geoloqi_client_secret=YOUR_GEOLOQI_CLIENT_SECRET`
6. `heroku config:add geoloqi_application_token=YOUR_GEOLOQI_APPLICATION_ACCESS_TOKEN`
7. `heroku config:add sqoot_affiliate_token=YOUR_SQOOT_AFFILIATE_TOKEN`

Squoot is a paid service with a 30 day free trial. If you do not want to pay for Sqoot use Geoloqis affiliate token `3c5gx9`

# Setup the heroku cron addon to update deals nightly

8. `heroku addons:add cron:daily`

# Launch on Heroku

9. `git add .`
10. `git commit -am"Deploy DinoDeals Server"`
11. `git push heroku master`