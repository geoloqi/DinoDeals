This is an offline application designed to be inserted into WebViews on native mobile apps.

To run locally
    
    node server.js

To build the `style.scss` file as you develop

		sass --watch css/style.scss:css/style.css

Every time a file changes you need change update app.manifest to force the new changes to appear in the browser