//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    userInfo: {},
    animationData: {}
  },
  //事件处理函数
  toNotes: function() {
    this.rotateAndScaleThenTranslate()
    setTimeout(function(){
      wx.navigateTo({
        url: '../subpage/index'
      })
    }, 1500) 
  },
  toTimeline: function() {
    wx.navigateTo({
      url: '../timeline/index',
    })
  },
  toContent: function() {
    wx.navigateTo({
      url: '../content/index'
    })
  },
  onLoad: function () {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo,
        animationData: {}
      })
    })

    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease'
    })

    this.animation = animation
  },
  rotateAndScaleThenTranslate: function(){
    //先旋转同时放大，然后平移
    this.animation.rotate(360).scale(2, 2).step()
    this.animation.translate(200).step({duration: 2000})
    this.animation.scale(1).translate(0).step()
    this.setData({
      animationData: this.animation.export()
    })
  }
})
