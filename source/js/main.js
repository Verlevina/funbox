'use strict';
var productList = new Vue({
  el: '#productList',
  data: {
    products: window.data.products,
    list: window.data.list,
    weight: window.data.weight,
    disabled: window.data.disable,
    messages: window.data.messages,

},

methods: {

}
,

computed: {
  message: function () {
    return this.messages[0];
  },
}
})
;
