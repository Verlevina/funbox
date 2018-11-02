'use strict';
;(function () {
  var productList = new Vue({
    el: '#productList',
    data: {
      products: window.data.products,
      list: window.data.list,
      weight: window.data.weight,
      disabled: window.data.disable,
      messages: window.data.messages,
      checkboxes: [0,1]
    },
    methods: {
      linkClick: function (index) {
        if (this.checkboxes.indexOf( index ) == -1) {
          return this.checkboxes.push(index);
        }
        return;
      }
    }
  });
})();
