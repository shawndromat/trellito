window.Trellino.Models.Board = Backbone.Model.extend({
  urlRoot: "/api/boards",
  url: function () {
    return this.urlRoot + "/" + this.id;
  },
  lists: function (){
    if(!this._lists) {
      var board = this
      this._lists = new Trellino.Collections.BoardLists([], {board: board});
    }
    return this._lists;
  },
  parse: function (response) {
    if (response.lists) {
      this.lists().set(response.lists, {parse: true});
      this.lists().sort();
      delete response.lists;
    }
    return response;
  }

});
