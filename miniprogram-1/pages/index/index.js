// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    info: 'hello world',
    count: 0,
    msg: '你好',
    type: 1,
    flag: true,
    arr1: [{id: '001',name: '苹果'}, {id: '002',name: '华为'}, {id: '003',name: '小米'}]
  },
  // 定义按钮的事件处理函数
  btnTapHandler(e) {
    console.log(e);
  },
  //加一按钮的事件处理函数
  countChange() {
    this.setData({
      count: this.data.count + 1
    })
  },
  //加二事件处理函数
  btnTap2(e) {
    this.setData({
      count: this.data.count + e.target.dataset.info
    })
  },
  //文本框事件处理函数
  inputHandler(e) {
    this.setData({
      msg: e.detail.value
    })
  },
  onLoad() {

  },
  getUserProfile(e) {

  },
  getUserInfo(e) {

  }
})