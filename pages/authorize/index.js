Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  userInfoHandler: function(res) {
    if (res.detail.errMsg == 'getUserInfo:ok') {
      wx.redirectTo({
        url: '../index/index',
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})