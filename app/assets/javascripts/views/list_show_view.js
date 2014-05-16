window.Trellino.Views.ListShowView = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },
  events: {
    "click .remove-list": "removeList"
  },
  template: JST["list_show"],
  render: function () {
    var renderedContent = this.template({list: this.model});
    this.$el.html(renderedContent);
    return this;
  },
  leave: function () {
    this.remove();
  },
  removeList: function (event) {
    event.preventDefault();
    this.model.destroy();
  }
});
