//app.js
App({
  onLaunch: function() {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    wx.showShareMenu({
      withShareTicket: true
    })
  },

  getUserInfo: function(cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function(res) {
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        },
        fail: function(res) {
          //拒绝授权
          if(res.errMsg == 'getUserInfo:cancel' || res.errMsg == 'getUserInfo:fail auth deny') {
            console.log(res)
            wx.redirectTo({
              url: '../authorize/index'
            })
          }
        }
      })
    }
  },

  globalData: {
    userInfo: null
  }
})
