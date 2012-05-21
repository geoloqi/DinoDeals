$(function(){
  window.OfflineApp = (function(_, Backbone, $){
    
    var access_token,
        Collection,
        Model,
        View,
        Routes,
        Router;
    
    Model = Backbone.Model.extend({
      defaults: {}
    });
    
    View = Backbone.View.extend({
      el: "#main",
      template: _.template($("#messageListTemplate").text()),
      events: {},
      initialize: function(){},
      render: function(collection){
        this.collection = collection;
        this.$el.html(this.template({messages: this.collection.toJSON()}));
        this.iscroll = new iScroll('scroll');
      }
    });
    list = new View();
    
    Collection = Backbone.Collection.extend({
      model: Model,
      view: list,
      localStorage: new Backbone.LocalStorage("MessagesCollection"),
      initialize: function(view){
        this.on("reset", function(){
          this.view.render(this);
        });

        this.reset(this.localStorage.findAll());
      },
      fetch: function(access_token){
        if(access_token){
          $.getJSON("http://api.geoloqi.com/1/timeline/messages?callback=?", {
            access_token: access_token,
            limit: 100
          }, _.bind(function(data, textStatus, jqXHR){

            this.destroyAll();

            _.each(data.items, _.bind(function(message){
              message.geoloqi_id = message.id;
              delete message.id;
              this.create(message);
            }, this));
            
            this.trigger("reset");

          }, this));
        }
      },
      destroyAll: function(){
        _.each(this.localStorage.findAll(), _.bind(function(message){
          this.get(message.id).destroy();
        }, this));
      }
    });
    triggers = new Collection();

    Routes = Backbone.Router.extend({
      routes:{
        "": "fetch",
        ":access_token": "fetch"
      },
      initialize: function(options){
        document.ontouchmove = function(event){ event.preventDefault(); };
        this.collection = options.collection;
        Backbone.history.start();
      },
      fetch: function(access_token){
        access_token = access_token || null;
        this.collection.fetch(access_token);
      }
    });
    router = new Routes({collection:triggers});
    
    
    return {
      triggers : triggers,
      list : list,
      router: router
    };

  })(_, Backbone, jQuery);
  
});