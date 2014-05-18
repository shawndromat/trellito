window.Trellino.Views.AddMemberView = Backbone.View.extend({
  events: {
    "submit form": "submit"
  },
  template: JST["add_member"],
  render: function () {
    var renderedContent = this.template({board: this.model});
    this.$el.html(renderedContent);
    return this;
  },
  submit: function (event) {
    event.preventDefault();
    var formData = $(event.target).serializeJSON();
    console.log(formData);
    this.model.save(formData, {patch: true})
  },
});
