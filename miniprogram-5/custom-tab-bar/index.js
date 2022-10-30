// custom-tab-bar/index.js
import {
  storeBindingsBehavior
} from 'mobx-miniprogram-bindings'
import {
  store
} from '../store/store'

Component({
  behaviors: [storeBindingsBehavior],
  storeBindings: {
    //数据源
    store,
    fields: {
      sum: 'sum',
    },
    actions: {
    }
  },
  // observers:{
  // "sum":function(val){
  //   console.log(this);
  //   this.setData({
  //     sum1:val
  //   })
  // }
  // },

  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
  active: 0,
  // sum1:0
  "list": [{
    "pagePath": "/pages/index/index",
    "text": "首页"
  },{
    "pagePath": "/pages/message/message",
    "text": "消息"
  },{
    "pagePath": "/pages/contact/contact",
    "text": "联系我们"
  }]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onChange(event) {
      // event.detail 的值为当前选中项的索引
      this.setData({ active: event.detail });
      wx.switchTab({
        url: this.data.list[event.detail].pagePath,
      })

    },
  }
})
