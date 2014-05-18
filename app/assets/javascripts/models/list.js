window.Trellino.Models.List = Backbone.Model.extend({
  initialize: function (options) {
    this.boardId = options["board_id"];
  },
  urlRoot: function () {
    return "/api/boards/" + this.boardId + "/lists";
  },
  cards: function (){
    if(!this._cards) {
      var list = this;
      this._cards = new Trellino.Collections.ListCards([], {list: list});
    }
    return this._cards;
  },
  parse: function (response) {
    if (response.cards) {
      this.cards().set(response.cards, {parse: true});
      delete response.cards;
    }
    return response;
  }
});
