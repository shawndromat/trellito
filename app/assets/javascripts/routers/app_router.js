Trellino.Routers.AppRouter = Backbone.Router.extend({
  routes: {
    "" : "boardsIndex",
    "boards/:id": "boardShow"
  },
  boardsIndex: function () {
    Trellino.boards.fetch();
    var boardIndexView = new Trellino.Views.BoardIndexView({
      collection: Trellino.boards
    });

    this._swapView(boardIndexView);
  },
  boardShow: function (id) {
    var board = Trellino.boards.getOrFetch(id);
    board.fetch()
    var boardShowView = new Trellino.Views.BoardShowView({
      model: board
    })
    this._swapView(boardShowView);
  },
  _swapView: function (view) {
    if (this.currentView) {
      this.currentView.leave();
    }
    this.currentView = view;
    $('#content').html(this.currentView.render().$el)
  }
})
