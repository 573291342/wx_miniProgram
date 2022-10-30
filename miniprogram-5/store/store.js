//在这个.js文件中，专门来创建Store的实例对象

import { observable,action }  from 'mobx-miniprogram'

export const store = observable({
  numA: 1,
  numB: 2,
  //计算属性
  get sum(){
    return this.numA + this.numB
  },
  // action 函数，用来修改store中的数据
  updateNumA: action(function(step){
    this.numA += step
  }),
  updateNumB: action(function(step){
    this.numB += step
  })
})