window.Trellino.Views.BoardShowView = Backbone.CompositeView.extend({
  initialize: function () {
    this.listenTo(this.model, 'sync change', this.render);
    this.listenTo(this.model.lists(), 'add', this.addList);
    this.listenTo(this.model.lists(), 'sync reset sort change', this.render);
    this.listenTo(this.model.lists(), 'remove', this.removeList);

    this.addNewListView();
    this.model.lists().each(this.addList.bind(this));
  },
  events: {
    "click #add-member": "addMemberView",
    "mouseenter .list,.card-show": "showGlyphicon",
    "mouseleave .list,.card-show": "hideGlyphicon",
    "sortupdate .sortable-list": "saveListRank",
    "sortupdate .sortable-card": "saveBoard",
  },
  template: JST["board_show"],
  render: function () {
    var renderedContent = this.template({board: this.model});
    this.$el.html(renderedContent);

    var subviews = _(this.subviews()["#all-lists"]).sortBy(function (subview) {
      return subview.model.get('rank');
    })

    this.subviews()["#all-lists"] = subviews;
    this.attachSubviews();

    $(".sortable-list").sortable({
      axis: "x",
     });

    this.$(".sortable-card").sortable({
      connectWith: ".sortable-card",
      tolerance: "intersect"
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
  },
  saveListRank: function () {
    var view = this;
    _.each($('.list'), function (list, index) {
      var listId = parseInt($(list).attr('data-list-id'));
      var listObj = view.model.lists().get(listId);
      if (listObj.get('rank') !== index + 1 ) {
        listObj.set('rank', index + 1);
        listObj.save({});
      }
    })
  },
  saveCardRank: function (listEl, listObj) {
    var view = this;
    _.each(listEl.find('.card-show'), function (card, index) {
      var cardId = parseInt($(card).attr('data-card-id'));
      var cardObj = listObj.cards().get(cardId);
      if (cardObj) {
        if (cardObj.get('rank') !== index + 1) {
          cardObj.set('rank', index + 1);
          cardObj.save({id: cardId});
        }
      }
    })
    return listObj;
  },
  saveBoard: function (event, ui) {
    var view = this;
    var senderEl = $(event.target).parent();
    var senderId = parseInt(senderEl.attr('data-list-id'));
    var senderObj = view.model.lists().get(senderId);

    var receiverEl = $(event.toElement).parent().parent();
    var receiverId = parseInt(receiverEl.attr('data-list-id'));
    var receiverObj = view.model.lists().get(receiverId);

    var cardEl = $(event.toElement)
    var cardId = parseInt(cardEl.attr('data-card-id'));
    var cardObj = senderObj.cards().get(cardId);


    if (senderId !== receiverId) {
      senderObj.cards().remove(cardObj);
      this.saveCardRank(senderEl, senderObj);
      cardObj.set('list_id', receiverId);
      cardObj.save({});
      receiverObj.cards().add(cardObj);
      this.saveCardRank(receiverEl, receiverObj);
    } else {
      this.saveCardRank(senderEl, senderObj);
    }

    this.render();
  },
  showGlyphicon: function () {
    $(event.target).children('.glyphicon').show();
  },
  hideGlyphicon: function () {
    $(event.target).children('.glyphicon').hide();
  },
})
