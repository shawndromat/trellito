window.Trellino.Collections.Boards = Backbone.Collection.extend({
  url: "/api/boards",
  model: Trellino.Models.Board,
  getOrFetch: function (id) {
    var model = this.get(id);
    if (model) {
      model.fetch();
      return model;
    } else {
      var boards = this;
      model = new this.model({id: id});
      model.fetch({
        success: function () {
          boards.add(model);
        }
      });
      return model;
    }
  }
});
Trellino.boards = new Trellino.Collections.Boards;
