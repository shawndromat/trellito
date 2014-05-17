window.Trellino.Collections.ListCards = Backbone.Collection.extend({
  initialize: function (models, options) {
    this.list = options.list;
  },
  url: function () {
    return "/api/lists/" + this.list.id + "/cards";
  },
  model: Trellino.Models.Card,
  getOrFetch: function (id) {
    var model = this.get(id);
    if (model) {
      model.fetch();
      return model;
    } else {
      var cards = this;
      model = new this.model({id: id});
      model.fetch({
        success: function () {
          cards.add(model);
        }
      });
      return model;
    }
  }
});
