window.Trellino.Models.Card = Backbone.Model.extend({
  initialize: function (options) {
    this.listId = options["list_id"]
  },
  urlRoot: function () {
    return "/api/lists/" + this.listId + "/cards";
  },
  // methodToURL: function (method, model) {
  //   switch
  //    'read': "/api/lists/" + this.listId + "/cards",
  //    'create': "/api/lists/" + this.listId + "/cards",
  //    'update': "/api/cards/" + this.id,
  //    'delete': "/api/cards/" + this.id
  //  },
  sync: function(method, model, options) {
    options = options || {};

    switch(method) {
    case 'read':
      options.url = "/api/lists/" + model.get('listId') + "/cards";
      break;
    case 'create':
      options.url = "/api/lists/" + model.get('listId') + "/cards";
      break;
    case 'update':
      options.url = "/api/cards/" + model.id;
      break;
    case 'delete':
      options.url = "/api/cards/" + model.id;
      break;
    }
    // model.methodToURL[method.toLowerCase()];

    return Backbone.sync.apply(this, arguments);
  }

});
