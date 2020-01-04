"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require("../common/component");
var safe_area_1 = require("../mixins/safe-area");
component_1.VantComponent({
    mixins: [safe_area_1.safeArea({ safeAreaInsetTop: true })],
    classes: ['title-class'],
    props: {
        title: String,
        fixed: Boolean,
        leftText: String,
        rightText: String,
        leftArrow: Boolean,
        searchValue: String,
        searchClass: {
          type: String,
          value: 'search-content'
        },
        border: {
            type: Boolean,
            value: true
        },
        zIndex: {
            type: Number,
            value: 120
        }
    },
    methods: {
        onClickLeft: function () {
            this.$emit('click-left');
        },
        onClickRight: function () {
            this.$emit('click-right');
        },
        onSearch: function () {
          this.$emit('click-search');
        },
        onCancel: function () {
          this.$emit('cancel-search');
        },
        onClickSearch: function () {
          this.$emit('click-search-bar')
        },
        onSearchValueChange: function (event) {
          this.set({ searchValue: event.detail });
          this.$emit('on-search-value-change', event.detail)
        }
        
    }
});
