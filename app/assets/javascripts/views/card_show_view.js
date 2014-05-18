window.Trellino.Views.CardShowView = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },
  template: JST["card_show"],
  render: function () {
    var renderedContent = this.template({card: this.model});
    this.$el.html(renderedContent);
    return this;
  }
})
