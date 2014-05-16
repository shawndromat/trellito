window.Trellino.Views.BoardShowView = Backbone.CompositeView.extend({
  initialize: function () {
    this.addNewListView();
    this.listenTo(this.model, 'sync change', this.render)
    this.listenTo(this.model.lists(), 'add sync', this.render)
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
})
