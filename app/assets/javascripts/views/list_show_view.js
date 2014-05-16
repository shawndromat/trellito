window.Trellino.Views.ListShowView = Backbone.View.extend({
  template: JST["list_show"],
  render: function () {
    var renderedContent = this.template({list: this.model});
    this.$el.html(renderedContent);
    return this;
  }
});
