window.Trellino.Views.NewCardView = Backbone.View.extend({
  template: JST["new_card"],
  render: function () {
    var renderedContent = this.template({list: this.model});
    this.$el.html(renderedContent);
    return this;
  }
});
