window.Trellino.Models.List = Backbone.Model.extend({
  initialize: function (options) {
    this.boardId = options["board_id"];
  },
  url: function () {
    return "/api/boards/" + this.boardId + "/lists";
  },
});
