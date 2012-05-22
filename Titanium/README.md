This folder is the a complete DinoDeals Titanium Project. Just import it into Titanium and fill out the `Resources/config.js` file with your Geoloqi `clientId` and `clientSecret`.

Build the project and thats it!

Geoloqi Titanium Documentation : https://developers.geoloqi.com/titanium

## Deploy the DinoDeals Server
You will also need to deploy th DinoDeals server. Follow the direction in the readme at https://github.com/geoloqi/DinoDeals/tree/master/web to deploy the server to Heroku for free.

Once you have deployed the server asd the url of the server to `config.js` as `baseURL` (trailing slash required).

## Android Instructions

You can compile and run this program from within the Titanium IDE or by
using the Titanium command-line tools. For the latter, simply run the
following command from your terminal:

    $ titanium run --dir=~/path/to/project --platform=android --android=/path/to/android-sdk

> Using the command-line tools should force Titanium to launch the built
> application on a running emulator, instead of creating and launching a
> new AVD.
