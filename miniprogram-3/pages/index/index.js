// index.js

Page({
  data: {
    query:{}
  },
  
  goBack(){
    
    wx.navigateBack({
      delta: 0,
    })
  },
  bindViewTap() {
    
  },
  onLoad(options) {
    // console.log(options);
    this.setData({
      query:options
    })
  },
  getUserProfile(e) {
    
  },
  getUserInfo(e) {
    
  }
})
