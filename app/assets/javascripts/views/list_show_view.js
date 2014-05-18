window.Trellino.Views.ListShowView = Backbone.CompositeView.extend({
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.cards(), 'add', this.addCard);
    this.listenTo(this.model.cards(), 'sync', this.render)

    var newCardView = new Trellino.Views.NewCardView({model: this.model});
    this.addSubview("#new-card", newCardView);
    this.model.cards().each(this.addCard.bind(this));
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
  },
  addCard: function (card) {
    console.log("show");
    var cardShow = new Trellino.Views.CardShowView({model: card});
    this.addSubview('.cards', cardShow)
  }
});
