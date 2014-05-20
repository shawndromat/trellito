window.Trellino.Views.CardShowView = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },
  events:{
    'click .remove-card': 'removeCard'
  },
  className: "card-show",
  template: JST["card_show"],
  render: function () {
    $(this.el).attr('data-card-id', this.model.id);
    var renderedContent = this.template({card: this.model});
    this.$el.html(renderedContent);
    return this;
  },
  removeCard: function () {
    event.preventDefault();
    this.model.destroy();
  }
})
