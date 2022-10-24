// pages/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: 1,
    arr: [{
        id:'001',
        value:'苹果'
      },
      {
        id:'002',
        value:'华为'
      },
      {
        id:'003',
        value:'小米'
      }
    ],
    info: 'hello world',
    ran: Math.ceil(Math.random() * 51)
  },

  btnTapHandler(e) {
    this.setData({
      flag: this.data.flag === 1 ? 0 : 1
    })
  },

  inputHandler(e) {
    this.setData({
      info: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
})