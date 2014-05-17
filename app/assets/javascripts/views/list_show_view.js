window.Trellino.Views.ListShowView = Backbone.CompositeView.extend({
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    var newCardView = new Trellino.Views.NewCardView({model: this.model})
    this.addSubview("#new-card", newCardView)
  },
  events: {
    "click .remove-list": "removeList"
  },
  template: JST["list_show"],
  render: function () {
    var renderedContent = this.template({list: this.model});
    this.$el.html(renderedContent);
    this.attachSubviews();
    return this;
  },
  removeList: function (event) {
    event.preventDefault();
    this.model.destroy();
  }
});
