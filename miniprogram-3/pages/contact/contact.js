// pages/contact/contact.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    colorList:[],
    isLoading:false
  },
  getColors(){
    this.setData({
      isLoading:true
    })
    wx.showLoading({
      title: '数据加载中...',
    })
    wx.request({
      url: 'https://www.escook.cn/api/color',
      method:'GET',
      success:({data:res})=>{
        this.setData({
          colorList:[...this.data.colorList,...res.data]
        })
      },
      complete:()=>{
        wx.hideLoading(),
        this.setData({
          isLoading:false
        })
      }
    })
  },

  //跳转到非tabBar页面
  gotoIndex(){
    wx.navigateTo({
      url: '/pages/index/index',
    })
  },
  gotoIndex2(){
    wx.navigateTo({
      url: '/pages/index/index?username=李四&gender=男',
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
    this.setData({
      colorList:[]
    })
    wx.stopPullDownRefresh({
      success: (res) => {
        console.log(res);
      },
    })
  },
  
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    if (this.data.isLoading) {
      return
    }else{
      this.getColors()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})