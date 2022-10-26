// pages/shoplist/shoplist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    query: {},
    shopList: [], //商品列表数组
    page: 1, //当前页面号
    pageSize: 10, //每页显示的数据
    total: 0, //总共多少条数据
    isLoading: false //节流阀，true表示正在请求数据，false 表示没有请求数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      query: options
    })
    this.getShopList()
  },
  //以分页的形式得到商品列表
  getShopList(cb) {
    this.setData({
      isLoading: true
    })
    //展示loading效果
    wx.showLoading({
      title: '数据加载中...',
    })
    wx.request({
      url: `https://www.escook.cn/categories/${this.data.query.id}/shops`,
      method: 'get',
      data: {
        _page: this.data.page,
        _limit: this.data.pageSize
      },
      success: (res) => {
        this.setData({
          shopList: [...this.data.shopList, ...res.data],
          total: res.header['X-Total-Count'] - 0
        })
      },
      complete: () => {
        //隐藏loading效果
        wx.hideLoading()
        this.setData({
          isLoading: false
        })
        // wx.stopPullDownRefresh()
        cb && cb()
      }
    })
  },

  call(e){
    // console.log(e.target.dataset.phone);
    wx.makePhoneCall({
      phoneNumber: e.target.dataset.phone,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    wx.setNavigationBarTitle({
      title: this.data.query.title,
    })
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
    //重置关键性数据
    this.setData({
      shopList:[],
      page:1,
      total:0
    })
    //重新发起数据请求
    this.getShopList(()=>{
      wx.stopPullDownRefresh()
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    //证明没有下一页数据
    if (this.data.page * this.data.pageSize >= this.data.total) {
      return wx.showToast({
        title: '数据加载完毕！',
        icon:'none'
      })
    }
    this.setData({
      page: this.data.page + 1
    })
    if (this.data.isLoading) return
    this.getShopList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})