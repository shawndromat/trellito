window.Trellino.Views.BoardIndexView = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.collection, 'sync add remove', this.render)
  },
  template: JST["board_index"],
  render: function () {
    var renderedContent = this.template({boards: this.collection});
    this.$el.html(renderedContent);
    return this;
  },
  leave: function () {
    this.remove();
  },
});
