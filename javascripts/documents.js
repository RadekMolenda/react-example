(function(global, _) {
  "use strict";
  var db="documents",
      documentsAttributes = {
        add: function (item) {
          localStorage.setItem(db, JSON.stringify(this().concat(item)));
        },
        remove: function (item) {
          console.log(this());
          var data = _.reject(this(),
                              function (elem) { return _.isEqual(elem,
                                                                 item);
                                              });
          localStorage.setItem(db, JSON.stringify(data));
        },
        update: function (item, newItem) {
          this.remove(item);
          this.add(newItem);
        },
        _flush: function () {
          localStorage.setItem(db, JSON.stringify([]));
        }
      },
  documents = function () {
    return JSON.parse(localStorage.getItem(db)) || [];
  };
  _.extend(documents, documentsAttributes);
  window.documents = documents;
})(window, window._);
