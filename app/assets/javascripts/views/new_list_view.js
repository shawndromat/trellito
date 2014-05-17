window.Trellino.Views.NewListView = Backbone.View.extend({
  events: {
    "submit form" : "submit"
  },
  template: JST["new_list"],
  render: function () {
    var renderedContent = this.template({board: this.model});
    this.$el.html(renderedContent);
    return this;
  },
  submit: function (event) {
    var view = this;
    event.preventDefault();
    var formData = $(event.target).serializeJSON();
    var list = new Trellino.Models.List(formData["list"]);
    debugger
    list.save({}, {
      success: function () {
        view.model.lists().add(list);
        view.render();
      }
    })
  },
})
