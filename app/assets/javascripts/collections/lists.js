window.Trellino.Collections.BoardLists = Backbone.Collection.extend({
  initialize: function (options) {
    this.board = options.board
  },
  model: Trellino.Models.List,
  url: function () {
    return this.board.url() + "/lists";
  },
  getOrFetch: function (id) {
    var model = this.get(id);
    if (model) {
      model.fetch();
      return model;
    } else {
      var boardlists = this;
      model = new this.model({id: id});
      model.fetch({
        success: function () {
          boardlists.add(model);
        }
      });
      return model;
    }
  }
});
