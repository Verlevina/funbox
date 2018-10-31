'use strict';
var app = new Vue ({
    el: '#app',
    data: {
        title: 'hello' + '!!!!!!!!!!!!!!!!!!!!!!!!!',
        inputText: '',
        showTitle: true,
        numbers:[],
        delLi:true

    },
    methods: {
        changeText: function () {
            this.title = "new text";
        },
        setMessage: function (evt) {
            this.inputText = evt.target.value;
        },
        addNumber: function () {
           this.numbers.push(Math.random());
        }
    }
});

var second = new Vue ({
    el: '#second',
    data: {
        sum: 0,
        x: 0,
        y: 0
    },
    methods: {
        addNnumber: function (event, add) {
            this.sum+=add;
            event.target.style.color = 'blue';
        },
        onMouseMove: function(evnt) {
            this.x=evnt.clientX;
            this.y=evnt.clientY;
        }
    }
});