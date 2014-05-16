window.Trellino.Views.BoardShowView = Backbone.CompositeView.extend({
  initialize: function () {
    this.model.lists().each(this.addList.bind(this))
    this.addNewListView();
    this.listenTo(this.model, 'sync change', this.render)
    this.listenTo(this.model.lists(), 'add', this.addList)
  },
  template: JST["board_show"],
  render: function () {
    var renderedContent = this.template({board: this.model});
    this.$el.html(renderedContent);
    this.attachSubviews();

    return this;
  },
  addNewListView: function () {
    var newListView = new Trellino.Views.NewListView({
      model: this.model
    });
    this.addSubview("#new-board-list", newListView)
  },
  addList: function (list) {
    var listView = new Trellino.Views.ListShowView({model: list});
    this.addSubview("#all-lists", listView);
  },
})
