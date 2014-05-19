window.Trellino.Views.BoardShowView = Backbone.CompositeView.extend({
  initialize: function () {
    this.model.lists().each(this.addList.bind(this));
    this.addNewListView();
    this.listenTo(this.model, 'sync change', this.render);
    this.listenTo(this.model.lists(), 'add', this.addList);
    this.listenTo(this.model.lists(), 'remove', this.removeList);
  },
  events: {
    "click #add-member": "addMemberView"
  },
  template: JST["board_show"],
  render: function () {
    var renderedContent = this.template({board: this.model});
    this.$el.html(renderedContent);
    this.attachSubviews();
    $('.list').find(".remove-list").hide();
    $('.list').hover(function (){
      $(this).find(".remove-list").show();
    }, function (){
      $(this).find(".remove-list").hide();
    });

    $('.card-show').find(".remove-card").hide();
    $('.card-show').hover(function (){
      $(this).find(".remove-card").show();
    }, function (){
      $(this).find(".remove-card").hide();
    });

    // $( ".draggable" ).draggable();
    $(".sortable-list").sortable({
      axis: "x",
      connectWith: ".sortable-list",
     });
    return this;
  },
  addNewListView: function () {
    var newListView = new Trellino.Views.NewListView({
      model: this.model
    });
    this.addSubview("#new-board-list", newListView)
  },
  addList: function (list) {
    var listView = new Trellino.Views.ListShowView({model: list});
    this.addSubview("#all-lists", listView);
  },
  removeList: function (list) {
    var subview = _.find(
      this.subviews()["#all-lists"],
      function (subview) {
        return subview.model === list;
      }
    );

    this.removeSubview("#all-lists", subview);
  },
  addMemberView: function (event) {
    event.preventDefault();
    var newMemberView = new Trellino.Views.AddMemberView({
      model: this.model
    });
    this.addSubview("#add-member-div", newMemberView);
  }
})
