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
      topMessages: [window.data.messages[0], window.data.messages[0], window.data.messages[0]],
      checkboxes: []
    },

    methods: {
      changeTopText: function (index) {
        if (+this.checkboxes.indexOf(index) != -1) {
          return this.topMessages[index] = window.data.messages[1];
        }
        return this.topMessages[index] = window.data.messages[0];
      },
      changeTopTextOver: function () {
        this.topMessages = [window.data.messages[0], window.data.messages[0], window.data.messages[0]]
      }
    },

    computed: {}
  });
})();
