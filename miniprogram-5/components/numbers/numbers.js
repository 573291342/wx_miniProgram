// components/numbers/numbers.js
import {
  storeBindingsBehavior
} from 'mobx-miniprogram-bindings'
import {
  store
} from '../../store/store'

Component({
  behaviors: [storeBindingsBehavior],
  storeBindings: {
    //数据源
    store,
    fields: {
      numA: () => store.numA,
      numB: (store) => store.numB,
      sum: 'sum',
    },
    actions: {
      updateNumB: 'updateNumB'
    }
  },

  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    btnHandler2(e) {
      this.updateNumB(e.target.dataset.step)
    }
  }
})