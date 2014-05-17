window.Trellino.Models.Card = Backbone.Model.extend({
  initialize: function (options) {
    this.listId = options["list_id"]
  },
  urlRoot: function () {
    return "/api/lists/" + this.listId + "/cards";
  }
});
