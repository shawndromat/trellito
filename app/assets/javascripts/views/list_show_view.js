window.Trellino.Views.ListShowView = Backbone.CompositeView.extend({
  className: "list container",
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.cards(), 'add', this.addCard);
    this.listenTo(this.model.cards(), 'sync reset sort change', this.render);
    this.listenTo(this.model.cards(), 'remove', this.removeCard);

    var newCardView = new Trellino.Views.NewCardView({model: this.model});
    this.addSubview(".new-card", newCardView);
    this.model.cards().each(this.addCard.bind(this));
  },
  events: {
    "click .remove-list": "removeList",
  },
  template: JST["list_show"],
  render: function () {
    $(this.el).attr('data-list-id', this.model.id);
    var renderedContent = this.template({list: this.model});
    this.$el.html(renderedContent);

    var subviews = _(this.subviews()[".cards"]).sortBy(function (subview) {
      return subview.model.get('rank');
    })

    this.subviews()[".cards"] = subviews;

    this.attachSubviews();

    this.$(".sortable-card").sortable({
      connectWith: ".sortable-card",
      tolerance: "intersect"
     });

    return this;
  },
  removeList: function (event) {
    event.preventDefault();
    this.model.destroy();
  },
  removeCard: function (card) {
    var subview = _.find(
      this.subviews()[".cards"],
      function (subview) {
        return subview.model === card;
      }
    );

    this.removeSubview(".cards", subview);
  },
  addCard: function (card) {
    var cardShow = new Trellino.Views.CardShowView({model: card});
    this.addSubview('.cards', cardShow);
  },
});
