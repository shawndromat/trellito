window.Trellino.Models.Card = Backbone.Model.extend({
  initialize: function (options) {
    this.listId = options["list_id"]
  },
  urlRoot: function () {
    return "/api/lists/" + this.listId + "/cards";
  },
  methodToURL: {
     'read': "/api/lists/" + this.listId + "/cards",
     'create': "/api/lists/" + this.listId + "/cards",
     'update': "/api/cards" + this.id,
     'delete': "/api/cards" + this.id
   },
  sync: function(method, model, options) {
    options = options || {};
    options.url = model.methodToURL[method.toLowerCase()];

    return Backbone.sync.apply(this, arguments);
  }

});
