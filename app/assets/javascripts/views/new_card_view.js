window.Trellino.Views.NewCardView = Backbone.View.extend({
  className: "col-md-12",
  events:{
    "submit .card-form" : "submit"
  },
  template: JST["new_card"],
  render: function () {
    var renderedContent = this.template({list: this.model});
    this.$el.html(renderedContent);
    return this;
  },
  submit: function (event) {
    event.preventDefault();
    var view = this;
    var formData = $(event.target).serializeJSON();
    var card = new Trellino.Models.Card(formData["card"]);

    card.save({}, {
      success: function () {
        view.model.cards().add(card);
        view.render();
      }
    })
  },
});
