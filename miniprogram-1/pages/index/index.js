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
  //发起get数据请求
  getInfo(){
    wx.request({
      url:'https://www.escook.cn/api/get',
      method:'get',
      data:{
        name:'zs',
        age:20
      },
      success:(res)=>{
        console.log(res.data);
      }
    })
  },
  //发起post数据请求
  postInfo(){
    wx.request({
      url:'https://www.escook.cn/api/post',
      method:'post',
      data:{
        name:'ls',
        age:33
      },
      success:(res)=>{
        console.log(res.data);
      }
    })
  },
  //监听页面加载事件
  onLoad() {
    this.getInfo(),
    this.postInfo()
  },
  getUserProfile(e) {

  },
  getUserInfo(e) {

  }
})